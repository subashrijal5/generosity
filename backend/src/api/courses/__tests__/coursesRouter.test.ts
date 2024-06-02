import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { getAuthData } from '@/api/user/__tests__/userRouter.test';
import { app } from '@/server';

import { Course } from '../courseModel';

describe('courseRouter', async () => {
  const { headers } = await getAuthData();
  const coursesResponse = await request(app).get('/courses').set(headers);
  const allCourses = coursesResponse.body.responseObject as Course[];

  describe('GET /courses', () => {
    it('should retrieve all courses', async () => {
      const response = await request(app).get('/courses').set(headers);

      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(response.body.message).toContain('Courses Fetched.');
      expect(response.body.responseObject.length).toEqual(allCourses.length);
      // Add more assertions as needed
    });
  });

  describe('GET /courses/:id', () => {
    it('should retrieve a course by ID', async () => {
      const courseId = allCourses[0].id;

      const response = await request(app).get(`/courses/${courseId}`).set(headers);
      expect(response.statusCode).toEqual(StatusCodes.OK);
      // Add more assertions as needed
    });
  });

  describe('POST /courses/:id/enroll', () => {
    it('should enroll a user in a course', async () => {
      const courseId = allCourses[0].id;
      const response = await request(app).post(`/courses/${courseId}/enroll`).set(headers);
      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
      // Add more assertions as needed
    });
  });

  describe('POST /courses/:id/leave', () => {
    it('should remove a user from a course', async () => {
      const courseId = allCourses[0].id;

      const response = await request(app).post(`/courses/${courseId}/leave`).set(headers);

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
      // Add more assertions as needed
    });
  });

  describe('GET /courses/get-enrolled', () => {
    it('should retrieve courses a user is enrolled in', async () => {
      const response = await request(app).get('/courses/get-enrolled').set(headers);

      expect(response.statusCode).toEqual(StatusCodes.OK);
      // Add more assertions as needed
    });
  });

  describe('PATCH /courses/:id/make-completed', () => {
    it('should mark a course as completed', async () => {
      const courseId = allCourses[0].id;

      await request(app).post(`/courses/${courseId}/enroll`).set(headers);

      const response = await request(app).patch(`/courses/${courseId}/make-completed`).set(headers);

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
  });
});
