import prisma from 'db';

export const getUserSharesService = async (userId: number) => {
  return prisma.accessStat.findMany({
    where: {
      user_id: userId
    },
  });
};
