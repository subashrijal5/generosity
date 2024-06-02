import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { authHeaderSchema } from '@/api/user/userModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

import { courseSchema } from './courseModel';
import { courseService } from './courseService';

export const coursesRegistry = new OpenAPIRegistry();

coursesRegistry.register('User', courseSchema);

export const courseRouter: Router = (() => {
  const router = express.Router();

  coursesRegistry.registerPath({
    method: 'get',
    path: '/courses',
    tags: ['Courses'],
    request: {
      headers: authHeaderSchema,
    },
    responses: createApiResponse(z.array(courseSchema), 'Success'),
  });

  router.get('/', async (req: Request, res: Response) => {
    const serviceResponse = await courseService.findAll(req);
    handleServiceResponse(serviceResponse, res);
  });

  coursesRegistry.registerPath({
    method: 'get',
    path: '/courses/{id}',
    tags: ['Courses'],
    request: {
      headers: authHeaderSchema,
    },
    responses: createApiResponse(z.array(courseSchema), 'Success'),
  });

  router.get('/', async (req: Request, res: Response) => {
    const serviceResponse = await courseService.findAll(req);
    handleServiceResponse(serviceResponse, res);
  });

  coursesRegistry.registerPath({
    method: 'post',
    path: '/courses/{id}/enroll',
    tags: ['Courses'],
    request: {
      headers: authHeaderSchema,
      params: z.object({ id: z.number() }),
    },
    responses: createApiResponse(z.object({}), 'Success'),
  });
  router.post('/:id/enroll', async (req, response) => {
    const serviceResponse = await courseService.enroll(req);
    handleServiceResponse(serviceResponse, response);
  });

  coursesRegistry.registerPath({
    method: 'post',
    path: '/courses/{id}/leave',
    tags: ['Courses'],
    request: {
      headers: authHeaderSchema,
      params: z.object({ id: z.number() }),
    },
    responses: createApiResponse(z.object({}), 'Success'),
  });
  router.post('/:id/leave', async (req, response) => {
    const serviceResponse = await courseService.leave(req);
    handleServiceResponse(serviceResponse, response);
  });

  coursesRegistry.registerPath({
    method: 'get',
    path: '/courses/get-enrolled',
    tags: ['Courses'],
    request: {
      headers: authHeaderSchema,
    },
    responses: createApiResponse(z.object({}), 'Success'),
  });

  router.get('/get-enrolled', async (req, response) => {
    const serviceResponse = await courseService.getUserCourses(req);
    handleServiceResponse(serviceResponse, response);
  });

  coursesRegistry.registerPath({
    method: 'get',
    path: '/courses/{id}',
    tags: ['Courses'],
    request: {
      headers: authHeaderSchema,
      params: z.object({ id: z.number() }),
    },
    responses: createApiResponse(z.object({}), 'Success'),
  });
  router.get('/:id', async (req, response) => {
    const serviceResponse = await courseService.findById(req);
    handleServiceResponse(serviceResponse, response);
  });

  coursesRegistry.registerPath({
    method: 'patch',
    path: '/courses/{id}/make-completed',
    tags: ['Courses'],
    request: {
      headers: authHeaderSchema,
      params: z.object({ id: z.number() }),
    },
    responses: createApiResponse(z.object({}), 'Success'),
  });
  router.patch('/:id/make-completed', async (req, response) => {
    const serviceResponse = await courseService.markCompleted(req);
    handleServiceResponse(serviceResponse, response);
  });

  return router;
})();
