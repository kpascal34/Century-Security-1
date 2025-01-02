import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function resetAdminPassword() {
  const newPassword = 'Admin@123' // You can change this to your desired password
  const hashedPassword = await bcrypt.hash(newPassword, 10)

  try {
    const updatedUser = await prisma.user.upsert({
      where: {
        email: 'admin@century-security.com',
      },
      update: {
        hashedPassword: hashedPassword,
      },
      create: {
        email: 'admin@century-security.com',
        name: 'Admin',
        hashedPassword: hashedPassword,
        role: Role.ADMIN,
      },
    })

    console.log('Admin password has been reset successfully')
    console.log('Email:', updatedUser.email)
    console.log('New password:', newPassword)
  } catch (error) {
    console.error('Error resetting admin password:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetAdminPassword() 