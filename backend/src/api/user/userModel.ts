import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { Role } from '@/common/enums/enum';
import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export const UserSchema = z.object({
  id: z.number(),
  name: commonValidations.name,
  email: commonValidations.email,
  role: z.nativeEnum(Role),
  password: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});
export type User = z.infer<typeof UserSchema>;

// Input Validation for 'GET users/:id' endpoint
export const getUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const userResponseSchema = UserSchema.omit({
  role: true,
  password: true,
});

/**
 *   Authentication section start
 */

export const registerUserSchema = z.object({
  body: UserSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    role: true,
  }).extend({
    password: commonValidations.password,
  }),
});

export type TCreateUser = z.infer<typeof registerUserSchema>;

export const authUserResponseSchema = UserSchema.omit({
  role: true,
  password: true,
}).extend({
  token: z.string(),
  refreshToken: z.string(),
  tokenExpiration: z.date(),
  maxAge: z.number(),
});

export type TAuthUserResponse = z.infer<typeof authUserResponseSchema>;

export const loginUserSchema = z.object({
  body: z.object({
    email: commonValidations.email,
    password: commonValidations.password,
  }),
});

export const authHeaderSchema = z.object({
  'x-access-token': z.string(),
  'x-refresh-token': z.string(),
});

export const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: commonValidations.password,
    newPassword: commonValidations.password,
    confirmPassword: commonValidations.password,
  }),
});

export type TChangePasswordRequest = z.infer<typeof changePasswordSchema>;
