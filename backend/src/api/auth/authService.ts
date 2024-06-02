import bcrypt from 'bcrypt';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { TAuthUserResponse, TChangePasswordRequest, TCreateUser, User } from '@/api/user/userModel';
import { userRepository } from '@/api/user/userRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { getDateAfterHours } from '@/common/utils/date';
import { env } from '@/common/utils/envConfig';
import { generateToken, verifyToken } from '@/common/utils/jwtTokens';
import { logger } from '@/server';

export const authService = {
  // Retrieves all users from the database
  register: async (request: TCreateUser['body']): Promise<ServiceResponse<User | null>> => {
    try {
      const checkExistingUser = await userRepository.findByEmail(request.email);

      if (checkExistingUser) {
        logger.error('User Already exists.', {
          email: request.email,
        });
        return new ServiceResponse(
          ResponseStatus.Failed,
          'User Already exists.',
          null,
          StatusCodes.UNPROCESSABLE_ENTITY
        );
      }
      const password = await bcrypt.hash(request.password, 10);
      const user = await userRepository.create({ ...request, password: password });

      return new ServiceResponse<User>(ResponseStatus.Success, 'Users found', user!, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  login: async (request: TCreateUser['body']): Promise<ServiceResponse<TAuthUserResponse | null>> => {
    try {
      const user = await userRepository.findByEmail(request.email, true);
      if (!user) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.UNPROCESSABLE_ENTITY);
      }
      const isPasswordValid = await bcrypt.compare(request.password, user.password);
      if (!isPasswordValid) {
        return new ServiceResponse(ResponseStatus.Failed, 'Invalid password', null, StatusCodes.UNAUTHORIZED);
      }
      const accessToken = generateToken({ email: user.email }, 'access');
      const refreshToken = generateToken({ email: user.email }, 'refresh');

      // insert refresh token in database
      await userRepository.storeRefreshToken(user.id, refreshToken);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, role, ...rest } = user;
      return new ServiceResponse<TAuthUserResponse>(
        ResponseStatus.Success,
        'User found',
        {
          ...rest,
          token: accessToken,
          refreshToken,
          tokenExpiration: getDateAfterHours(env.JWT_EXPIRES_IN_HOURS),
          maxAge: env.JWT_EXPIRES_IN_HOURS * 60 * 60,
        },
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding user with email ${request.email}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  refreshToken: async (token: string): Promise<ServiceResponse<TAuthUserResponse | null>> => {
    try {
      const user = await userRepository.findByRefreshToken(token);
      if (!user) {
        logger.error('Invalid token', {
          token,
        });
        // TODO:: logout
        return new ServiceResponse(ResponseStatus.Failed, 'Invalid token', null, StatusCodes.UNAUTHORIZED);
      }
      //  verify token
      verifyToken(token);

      // generate new tokens
      const accessToken = generateToken({ email: user.email }, 'access');
      const refreshToken = generateToken({ email: user.email }, 'refresh');

      // insert refresh token in database
      await userRepository.storeRefreshToken(user.id, refreshToken);

      return new ServiceResponse<TAuthUserResponse>(
        ResponseStatus.Success,
        'User found',
        {
          ...user,
          token: accessToken,
          refreshToken,
          tokenExpiration: getDateAfterHours(env.JWT_EXPIRES_IN_HOURS),
          maxAge: env.JWT_EXPIRES_IN_HOURS * 60 * 60,
        },
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding user with token ${token}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  logout: async (req: Request) => {
    try {
      const user = await userRepository.findByRefreshToken(req.header('x-refresh-token')!);
      if (!user) {
        logger.error('Invalid token', {
          token: req.body.token,
        });
        return new ServiceResponse(ResponseStatus.Failed, 'Invalid token', null, StatusCodes.UNAUTHORIZED);
      }
      await userRepository.deleteRefreshToken(req.header('x-refresh-token')!);
      return new ServiceResponse(ResponseStatus.Success, 'User logged out successfully', null, StatusCodes.OK);
    } catch (error) {
      const errorMessage = 'Error logging out: ' + (error as Error).message + ' ' + (error as Error).stack;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, 'Error logging out', null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  changePassword: async (req: TChangePasswordRequest['body'], email: string) => {
    try {
      const user = await userRepository.findByEmail(email, true);

      if (!user) {
        logger.error('User not found', {
          email: email,
        });
        return new ServiceResponse(ResponseStatus.Failed, 'Invalid token', null, StatusCodes.UNAUTHORIZED);
      }
      const isValidConfirmPassword = req.newPassword === req.confirmPassword;
      if (!isValidConfirmPassword) {
        return new ServiceResponse(ResponseStatus.Failed, 'Passwords do not match', null, StatusCodes.BAD_REQUEST);
      }
      const isPasswordValid = await bcrypt.compare(req.oldPassword, user.password);

      if (!isPasswordValid) {
        return new ServiceResponse(ResponseStatus.Failed, 'Invalid old password', null, StatusCodes.UNAUTHORIZED);
      }
      await userRepository.update(user.id, { password: await bcrypt.hash(req.newPassword, 10) });

      return new ServiceResponse(ResponseStatus.Success, 'Password changed successfully.', null, StatusCodes.OK);
    } catch (error) {
      logger.error('Error changing password', {
        error: (error as Error).message,
      });
      return new ServiceResponse(
        ResponseStatus.Failed,
        'Error changing password',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  getCurrentUser: (req: Request) => {
    return userRepository.findByEmail(req.user?.email as string);
  },
};
