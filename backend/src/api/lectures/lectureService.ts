import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

import { authService } from '../auth/authService';
import { lectureRepository } from './lectureRepository';

export const lectureService = {
  updateStatus: async (request: Request) => {
    try {
      const { status } = request.body;
      const { id: lectureId } = request.params;

      const currentUser = await authService.getCurrentUser(request);

      if (!currentUser) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }
      lectureRepository.updateStatus(parseInt(lectureId), currentUser.id, status);
      return new ServiceResponse<null>(ResponseStatus.Success, 'Status Updated.', null, StatusCodes.NO_CONTENT);
    } catch (ex) {
      const errorMessage = `Error updating lecture status $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
