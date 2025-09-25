const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Database connection
const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres',
  logging: false,
});

// User model definition
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'vendor'),
    defaultValue: 'user',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'Users',
  paranoid: true,
  timestamps: true,
});

async function createAdmin() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@tog.com' } });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('Admin@1232', 10);

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@tog.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@tog.com');
    console.log('Password: Admin@1232');
    console.log('Role: admin');
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await sequelize.close();
  }
}

createAdmin();
