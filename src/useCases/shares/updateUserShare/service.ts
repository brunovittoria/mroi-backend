import prisma from 'db';
import { updateUserShareValidation } from './validation';

export const updateUserShareService = async (body: Record<string, unknown>) => {
  const bodyParsers = updateUserShareValidation.parse(body);

  await prisma.accessStat.update({
    where: {
      user_id_destination: {
        user_id: bodyParsers.userId,
        destination: bodyParsers.destination
      }
    },
    data: {
      click_count: {
        increment: 1
      }
    }
  });
};
