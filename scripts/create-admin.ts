const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const adminPassword = 'Denton17';
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@centurysecurity.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN',
        profile: {
          create: {
            phoneNumber: '',
            address: '',
            siaBadgeNo: 'ADMIN',
          },
        },
      },
    });

    console.log('Admin user created successfully:', admin.email);
    console.log('You can now log in with:');
    console.log('Email: admin@centurysecurity.com');
    console.log('Password:', adminPassword);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin(); 