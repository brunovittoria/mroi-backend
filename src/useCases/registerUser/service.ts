import { hash } from 'bcryptjs';
import prisma from 'db';
import { HttpError } from 'errors/httpError';
import { getSignedToken } from 'useCases/shared/getSignedToken';
import { validateRegisterUserBody } from './validation';

export const registerUserService = async (body: Record<string, unknown>) => {
  const bodyParsed = validateRegisterUserBody.parse(body);

  const user = await prisma.user.findUnique({
    where: { email: bodyParsed.email }
  });

  if (user) {
    throw new HttpError(400, 'User already exists');
  }

  const hashedPassword = await hash(bodyParsed.password, 10);

  const userCreated = await prisma.user.create({
    data: {
      name: bodyParsed.name,
      email: bodyParsed.email,
      password: hashedPassword,
      phone: bodyParsed.phone
    }
  });

  await prisma.accessStat.createMany({
    data: [
      { destination: 'Github', user_id: userCreated.id, click_count: 0 },
      { destination: 'Youtube', user_id: userCreated.id, click_count: 0 },
      { destination: 'Google', user_id: userCreated.id, click_count: 0 },
      { destination: 'Facebook', user_id: userCreated.id, click_count: 0 },
      { destination: 'Twitter', user_id: userCreated.id, click_count: 0 },
      { destination: 'Instagram', user_id: userCreated.id, click_count: 0 },
      { destination: 'Linkedin', user_id: userCreated.id, click_count: 0 }
    ]
  });

  return getSignedToken(userCreated.id);
};
