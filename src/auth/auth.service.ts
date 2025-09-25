import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from '../../database/models/user.model';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private blacklistedTokens = new Set<string>();

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const { name, email, password } = registerDto;
      // Check if user already exists
      const existingUser = await this.userModel.findOne({ where: { email } });
      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }
      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // Create user
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role: 'user',
        isActive: true,
      });
      // Generate tokens
      const tokens = await this.generateTokens(user);
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user.toJSON();
      return {
        user: userWithoutPassword,
        ...tokens,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      // Find user by email
      const user = await this.userModel.findOne({
        where: { email, isActive: true },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(
        password,
        user.dataValues?.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Update last login
      await user.update({ lastLoginAt: new Date() });

      // Generate tokens
      const tokens = await this.generateTokens(user);

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user.toJSON();

      return {
        user: userWithoutPassword,
        ...tokens,
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async logout(token: string) {
    // Add token to blacklist
    this.blacklistedTokens.add(token);

    return { message: 'Logged out successfully' };
  }

  async refresh(refreshToken: string) {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Check if it's a refresh token
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Find user
      const user = await this.userModel.findByPk(payload.sub, { raw: true });
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      const tokens = await this.generateTokens(user);

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(userId: string) {
    const user = await this.userModel.findByPk(userId);
    if (!user || !user.isActive) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    try {
      const user = await this.userModel.findByPk(userId, { raw: true });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      // Verify old password
      const isOldPasswordValid = await bcrypt.compare(
        oldPassword,
        user.password,
      );
      if (!isOldPasswordValid) {
        throw new UnauthorizedException('Invalid current password');
      }

      // Hash new password
      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      // await user.update({ password: hashedNewPassword });
      await this.userModel.update(
        { password: hashedNewPassword },
        { where: { id: userId } },
      );

      return { message: 'Password changed successfully' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      // Don't reveal if email exists
      return { message: 'If email exists, reset link has been sent' };
    }

    // Generate reset token
    const resetToken = this.jwtService.sign(
      { sub: user.id, type: 'password-reset' },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1h',
      },
    );

    // In production, send email with reset link
    // For now, return token (remove in production)
    return {
      message: 'If email exists, reset link has been sent',
      resetToken, // Remove this in production
    };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token);

      if (payload.type !== 'password-reset') {
        throw new UnauthorizedException('Invalid reset token');
      }

      const user = await this.userModel.findByPk(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Invalid reset token');
      }

      // Hash new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      await user.update({ password: hashedPassword });

      return { message: 'Password reset successfully' };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }

  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const accessTokenExpiry =
      this.configService.get<string>('JWT_EXPIRES_IN') || '24h';
    const refreshTokenExpiry =
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtSecret,
        expiresIn: accessTokenExpiry,
      }),
      this.jwtService.signAsync(
        { ...payload, type: 'refresh' },
        {
          secret: jwtSecret,
          expiresIn: refreshTokenExpiry,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 24 * 60 * 60, // 24 hours in seconds
    };
  }
}
