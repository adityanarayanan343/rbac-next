import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const permissions = await prisma.permission.createMany({
    data: [{ name: 'Read' }, { name: 'Write' }, { name: 'Delete' }],
  });

  const adminRole = await prisma.role.create({
    data: { name: 'Admin', permissions: { create: [{ permissionId: 1 }, { permissionId: 2 }] } },
  });

  const user = await prisma.user.create({
    data: { name: 'John Doe', email: 'john@example.com', roles: { create: { roleId: adminRole.id } } },
  });

  console.log('Database seeded.');
}

main().catch((e) => console.error(e));
