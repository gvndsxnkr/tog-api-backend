import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from '../../database/models/user.model';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async findAll() {
    const users = await this.userModel.findAll({
      attributes: { exclude: ['password'] },
      include: { all: true }
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: { all: true }
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getProfile(id: string) {
    return this.findOne(id);
  }

  async changePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User not found');

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid current password');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedNewPassword });
    
    return { message: 'Password changed successfully' };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await user.update(updateUserDto);
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async remove(id: string) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User not found');
    
    await user.destroy();
    return { message: 'User deleted successfully' };
  }
}
