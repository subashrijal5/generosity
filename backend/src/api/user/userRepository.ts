import { sql } from 'drizzle-orm';

import { TCreateUser, User } from '@/api/user/userModel';
import { Role } from '@/common/enums/enum';
import { env } from '@/common/utils/envConfig';
import { db } from '@/database/connection';
import { refreshTokens, users } from '@/database/schema';

export const userRepository = {
  findAllAsync: async (): Promise<User[]> => {
    return (await db.query.users.findMany({
      columns: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })) as User[];
  },

  findByEmail: async (email: string, withPassword: boolean = false): Promise<User | null> => {
    return (await db.query.users.findFirst({
      where: sql`email = ${email}`,
      columns: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        ...(withPassword && { password: true }),
      },
    })) as User;
  },

  find: async (id: number): Promise<User | null> => {
    return (await db.query.users.findFirst({
      where: sql`id = ${id}`,
      columns: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })) as User;
  },

  create: async (request: TCreateUser['body']): Promise<User> => {
    const newUser = await db
      .insert(users)
      .values({
        ...request,
        role: Role.Student,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning({ id: users.id });

    return (await userRepository.find(newUser[0].id)) as User;
  },

  update: async (id: number, request: Partial<TCreateUser['body']>): Promise<User> => {
    const updatedUser = await db
      .update(users)
      .set({
        ...request,
        updatedAt: new Date(),
      })
      .where(sql`id = ${id}`)
      .returning({ id: users.id });
    return (await userRepository.find(updatedUser[0].id)) as User;
  },

  storeRefreshToken: async (userId: number, refreshToken: string): Promise<void> => {
    // store new token
    await db.insert(refreshTokens).values({
      userId,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * env.JWT_REFRESH_EXPIRES_IN_DAYS),
    });
  },

  findByRefreshToken: async (refreshToken: string): Promise<User | null> => {
    const user = await db.query.refreshTokens.findFirst({
      where: (refreshTokens, { eq, and }) => {
        return and(eq(refreshTokens.token, refreshToken));
      },
      columns: {
        userId: true,
      },
    });

    return user ? await userRepository.find(user.userId) : null;
  },

  deleteRefreshToken: async (refreshToken: string): Promise<void> => {
    await db.delete(refreshTokens).where(sql`token = ${refreshToken}`);
  },

  deleteAllRefreshTokens: async (userId: number): Promise<void> => {
    await db.delete(refreshTokens).where(sql`user_id = ${userId}`);
  },
};
