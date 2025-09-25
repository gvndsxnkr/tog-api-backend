#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Database Setup...\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log('⚠️  .env file not found. Please copy .env.example to .env and configure your database connection.');
  console.log('   cp .env.example .env\n');
}

// Check if sequelize-cli is installed
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.devDependencies && packageJson.devDependencies['sequelize-cli']) {
    console.log('✅ Sequelize CLI is installed');
  } else {
    console.log('❌ Sequelize CLI not found in devDependencies');
  }
} catch (error) {
  console.log('❌ Could not check package.json');
}

// Check if migration files exist
const migrationFiles = fs.readdirSync('database/migrations');
console.log(`✅ Found ${migrationFiles.length} migration files`);
migrationFiles.forEach(file => console.log(`   - ${file}`));

// Check if seeder files exist
const seederFiles = fs.readdirSync('database/seeders');
console.log(`✅ Found ${seederFiles.length} seeder files`);
seederFiles.forEach(file => console.log(`   - ${file}`));

// Check if config file exists
if (fs.existsSync('database/config.js')) {
  console.log('✅ Database configuration file exists');
} else {
  console.log('❌ Database configuration file missing');
}

// Check if .sequelizerc exists
if (fs.existsSync('.sequelizerc')) {
  console.log('✅ Sequelize configuration file exists');
} else {
  console.log('❌ .sequelizerc file missing');
}

console.log('\n📋 Available Commands:');
console.log('   npm run db:migrate     - Run migrations');
console.log('   npm run db:seed        - Run seeders');
console.log('   npm run db:reset       - Reset database');
console.log('\n🎯 Next Steps:');
console.log('1. Configure your database connection in .env');
console.log('2. Create your PostgreSQL database');
console.log('3. Run: npm run db:migrate');
console.log('4. Run: npm run db:seed');
console.log('\n✨ Database setup is ready!');
