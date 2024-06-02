import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Role } from '@/common/enums/enum';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

import { authService } from '../auth/authService';
import { Course } from './courseModel';
import { courseRepository } from './courseRepository';

export const courseService = {
  // Retrieves all courses from the database
  findAll: async (request: Request): Promise<ServiceResponse<Course[] | null>> => {
    try {
      const currentUser = await authService.getCurrentUser(request);

      if (!currentUser) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }
      const courses = await courseRepository.findAllAsync(currentUser.id);

      if (!courses) {
        return new ServiceResponse(ResponseStatus.Failed, 'No courses found', null, StatusCodes.NOT_FOUND);
      }

      return new ServiceResponse<Course[]>(ResponseStatus.Success, 'Courses Fetched.', courses, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error fetching course $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves a single course by their ID
  findById: async (request: Request): Promise<ServiceResponse<Course | null>> => {
    const id = parseInt(request.params.id, 10);
    try {
      const currentUser = await authService.getCurrentUser(request);

      if (!currentUser) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }
      const course = await courseRepository.find(id, currentUser.id);
      if (!course) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Course>(ResponseStatus.Success, 'course found', course, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  enroll: async (request: Request) => {
    try {
      const courseId = parseInt(request.params.id, 10);

      const currentUser = await authService.getCurrentUser(request);
      if (!currentUser) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }

      if (currentUser.role === Role.Admin) {
        return new ServiceResponse(ResponseStatus.Failed, 'User is an admin', null, StatusCodes.FORBIDDEN);
      }

      const isAlreadyEnrolled = await courseRepository.isUserEnroll(courseId, currentUser.id);
      if (isAlreadyEnrolled) {
        return new ServiceResponse(ResponseStatus.Failed, 'User is already enrolled', null, StatusCodes.FORBIDDEN);
      }
      await courseRepository.enroll(courseId, currentUser.id);

      return new ServiceResponse(ResponseStatus.Success, 'User enrolled successfully', null, StatusCodes.NO_CONTENT);
    } catch (error) {
      const errorMessage = `Error on enrollment for course ${request.body.courseId}: ${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(
        ResponseStatus.Failed,
        'Error leaving project',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  leave: async (request: Request) => {
    try {
      const courseId = parseInt(request.params.id, 10);

      const currentUser = await authService.getCurrentUser(request);
      if (!currentUser) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }

      if (currentUser.role === Role.Admin) {
        return new ServiceResponse(ResponseStatus.Failed, 'User is an admin', null, StatusCodes.FORBIDDEN);
      }

      const isAlreadyEnrolled = await courseRepository.isUserEnroll(courseId, currentUser.id);
      if (!isAlreadyEnrolled) {
        return new ServiceResponse(ResponseStatus.Failed, 'User is not enrolled', null, StatusCodes.FORBIDDEN);
      }

      await courseRepository.leave(courseId, currentUser.id);

      return new ServiceResponse(ResponseStatus.Success, 'You leaved successfully', null, StatusCodes.NO_CONTENT);
    } catch (error) {
      const errorMessage = `Error on leaving for course ${request.body.courseId}: ${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(
        ResponseStatus.Failed,
        'Error leaving course',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  getUserCourses: async (request: Request) => {
    try {
      const currentUser = await authService.getCurrentUser(request);
      if (!currentUser) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }
      const courses = await courseRepository.getUserCourses(currentUser.id);

      return new ServiceResponse(ResponseStatus.Success, 'Courses fetched', courses, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `Error on leaving for course ${request.body.courseId}: ${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(
        ResponseStatus.Failed,
        'Error leaving course',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  markCompleted: async (request: Request) => {
    try {
      const { id } = request.params;
      const currentUser = await authService.getCurrentUser(request);
      if (!currentUser) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }
      // check if user is enrolled in course
      const isEnrolled = await courseRepository.isUserEnroll(parseInt(id), currentUser.id);
      if (!isEnrolled) {
        return new ServiceResponse(ResponseStatus.Failed, 'User is not enrolled', null, StatusCodes.FORBIDDEN);
      }
      await courseRepository.markCompleted(parseInt(id), currentUser.id);

      return new ServiceResponse(ResponseStatus.Success, 'Course marked as completed', null, StatusCodes.NO_CONTENT);
    } catch (error) {
      const errorMessage = `Error on marking Course as completed: ${(error as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(
        ResponseStatus.Failed,
        'Error marking course as completed',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};
