import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import {
  authHeaderSchema,
  authUserResponseSchema,
  changePasswordSchema,
  loginUserSchema,
  registerUserSchema,
  userResponseSchema,
} from '@/api/user/userModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import authMiddleware from '@/common/middleware/authMiddleware';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

import { authService } from './authService';

export const authRegistry = new OpenAPIRegistry();

authRegistry.register('Auth', authUserResponseSchema);

export const authRouter: Router = (() => {
  const router = express.Router();
  /******* Register api start *******/
  // Openapi Generator
  authRegistry.registerPath({
    method: 'post',
    path: '/auth/register',
    tags: ['Auth'],
    request: {
      body: {
        required: true,
        content: {
          'application/json': {
            schema: registerUserSchema.shape.body,
          },
        },
      },
    },
    responses: createApiResponse(userResponseSchema, 'Success'),
  });

  //  route to register user
  router.post('/register', validateRequest(registerUserSchema), async (_req, res) => {
    const serviceResponse = await authService.register(_req.body);
    handleServiceResponse(serviceResponse, res);
  });
  /****** Register api end *******/

  /****** Login api start *****/
  authRegistry.registerPath({
    method: 'post',
    path: '/auth/login',
    tags: ['Auth'],
    request: {
      body: {
        required: true,
        content: {
          'application/json': {
            schema: loginUserSchema.shape.body,
          },
        },
      },
    },
    responses: createApiResponse(userResponseSchema, 'Success'),
  });
  //  route to register user
  router.post('/login', validateRequest(loginUserSchema), async (_req, res) => {
    const serviceResponse = await authService.login(_req.body);
    handleServiceResponse(serviceResponse, res);
  });
  /******** Login api end *******/

  /****** Refresh token api start *****/
  authRegistry.registerPath({
    method: 'post',
    path: '/auth/refresh-token',
    tags: ['Auth'],
    request: {
      headers: authHeaderSchema,
    },
    responses: createApiResponse(userResponseSchema, 'Success'),
  });

  //  route to refresh user access token
  router.post('/refresh-token', async (_req, res) => {
    const serviceResponse = await authService.refreshToken(_req.header('x-refresh-token')!);
    handleServiceResponse(serviceResponse, res);
  });
  /******** Refresh token api end *******/

  /****** Refresh token api start *****/
  authRegistry.registerPath({
    method: 'post',
    path: '/auth/logout',
    tags: ['Auth'],
    request: {
      headers: authHeaderSchema,
    },
    responses: createApiResponse(z.object({}), 'Success', StatusCodes.NO_CONTENT),
  });

  //  route to refresh user access token
  router.post('/logout', async (_req, res) => {
    const serviceResponse = await authService.logout(_req);
    handleServiceResponse(serviceResponse, res);
  });
  /******** Refresh token api end *******/

  /****** Refresh token api start *****/
  authRegistry.registerPath({
    method: 'post',
    path: '/auth/change-password',
    tags: ['Auth'],
    request: {
      headers: authHeaderSchema,
      body: {
        required: true,
        content: {
          'application/json': {
            schema: changePasswordSchema.shape.body,
          },
        },
      },
    },
    responses: createApiResponse(z.object({}), 'Success', StatusCodes.NO_CONTENT),
  });

  //  route to refresh user access token
  router.post('/change-password', authMiddleware, validateRequest(changePasswordSchema), async (_req: Request, res) => {
    const serviceResponse = await authService.changePassword(_req.body, _req.user?.email as string);
    handleServiceResponse(serviceResponse, res);
  });
  /******** Refresh token api end *******/

  return router;
})();
