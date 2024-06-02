import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { authHeaderSchema } from '@/api/user/userModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

import { lectureService } from './lectureService';
import { updateLectureStatusSchema } from './lecturesModel';

export const lectureRegistry = new OpenAPIRegistry();

export const lectureRouter: Router = (() => {
  const router = express.Router();

  lectureRegistry.registerPath({
    method: 'put',
    path: '/lectures/{id}/update-status',
    tags: ['Lectures'],
    request: {
      headers: authHeaderSchema,
      body: {
        content: {
          'application/json': {
            schema: updateLectureStatusSchema.shape.body,
          },
        },
      },
      params: z.object({ id: z.number() }),
    },
    responses: createApiResponse(z.object({}), 'Success'),
  });

  router.put('/:id/update-status', validateRequest(updateLectureStatusSchema), async (req: Request, res: Response) => {
    const serviceResponse = await lectureService.updateStatus(req);

    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
