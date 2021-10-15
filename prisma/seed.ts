/* eslint-disable @typescript-eslint/no-var-requires */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  await prisma.user.upsert({
    where: { id: '' },
    update: {
      email: 'admin@spacebook.com.br',
      username: 'administrador',
      password: 'spacebook',
    },
    create: {
      email: 'admin@spacebook.com.br',
      username: 'administrador',
      password: 'spacebook',
    },
  });

  prisma.$disconnect();
}
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
