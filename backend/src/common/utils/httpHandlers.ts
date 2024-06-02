import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodSchema } from 'zod';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    const messages = (err as ZodError).errors.map((e) => ({
      field: e.path[0],
      message: e.message,
    }));
    const statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    res
      .status(statusCode)
      .send(new ServiceResponse<typeof messages>(ResponseStatus.Failed, 'Invalid Input.', messages, statusCode));
  }
};
