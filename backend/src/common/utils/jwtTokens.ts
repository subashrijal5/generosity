import jwt from 'jsonwebtoken';

import { env } from './envConfig';
export const generateToken = (payload: string | Record<string, string>, type: 'access' | 'refresh') => {
  const expiresIn = type === 'access' ? `${env.JWT_EXPIRES_IN_HOURS}h` : `${env.JWT_REFRESH_EXPIRES_IN_DAYS}d`;
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn,
  });
};

export const verifyToken = (token: string) =>
  jwt.verify(token, env.JWT_SECRET) as { email: string; iat: number; exp: number };
