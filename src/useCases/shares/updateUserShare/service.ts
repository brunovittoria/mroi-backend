import prisma from 'db';
import { updateUserShareValidation } from './validation';

export const updateUserShareService = async (body: Record<string, unknown>) => {
  const bodyParsers = updateUserShareValidation.parse(body);

  await prisma.accessStat.upsert({
    where: {
      user_id: bodyParsers.userId,
      destination: bodyParsers.destination,
    },
    update: {
      click_count: {
        increment: 1
      }
    },
    create: {
        destination: bodyParsers.destination,
        user_id: bodyParsers.userId,
        click_count: 1
    }
  });
};
