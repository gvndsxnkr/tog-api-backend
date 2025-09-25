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

async function updateAdmin() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Hash password
    const hashedPassword = await bcrypt.hash('Admin@1232', 10);

    // Update or create admin user
    const [admin, created] = await User.upsert({
      name: 'Admin User',
      email: 'admin@tog.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });

    if (created) {
      console.log('Admin user created successfully!');
    } else {
      console.log('Admin user updated successfully!');
    }
    console.log('Email: admin@tog.com');
    console.log('Password: Admin@1232');
    console.log('Role: admin');
    
  } catch (error) {
    console.error('Error updating admin:', error);
  } finally {
    await sequelize.close();
  }
}

updateAdmin();
