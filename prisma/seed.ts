import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@century-security.com' },
    update: {},
    create: {
      email: 'admin@century-security.com',
      name: 'Admin User',
      hashedPassword: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create some test staff users
  const staffPassword = await hash('staff123', 12);
  const staff1 = await prisma.user.upsert({
    where: { email: 'john@century-security.com' },
    update: {},
    create: {
      email: 'john@century-security.com',
      name: 'John Smith',
      hashedPassword: staffPassword,
      role: 'USER',
    },
  });

  const staff2 = await prisma.user.upsert({
    where: { email: 'jane@century-security.com' },
    update: {},
    create: {
      email: 'jane@century-security.com',
      name: 'Jane Doe',
      hashedPassword: staffPassword,
      role: 'USER',
    },
  });

  console.log({ admin, staff1, staff2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 