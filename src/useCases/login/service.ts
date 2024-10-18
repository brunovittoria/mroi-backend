import { compare } from 'bcryptjs';
import prisma from 'db';
import { HttpError } from 'errors/httpError';
import { getSignedToken } from 'useCases/shared/getSignedToken';
import { validateLoginUserBody } from './validation';

export const authenticateUserService = async (body: Record<string, unknown>) => {
  const bodyParsed = validateLoginUserBody.parse(body);

  const user = await prisma.user.findUnique({ where: { email: bodyParsed.email } });

  if (!user) {
    throw new HttpError(401, 'Invalid credentials');
  }

  const passwordMatch = await compare(bodyParsed.password, user.password);

  if (!passwordMatch) {
    throw new HttpError(401, 'Invalid credentials');
  }

  return getSignedToken(user.id);
};
