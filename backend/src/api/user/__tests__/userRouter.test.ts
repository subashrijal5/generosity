import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { User } from '@/api/user/userModel';
import { userRepository } from '@/api/user/userRepository';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

export const getAuthData = async () => {
  // create new user
  const mockUser = await request(app).post('/auth/register').send({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'XXXXXXXX',
  });
  const responseData = mockUser.body.responseObject;
  //  login with user to get access token
  const response = await request(app).post('/auth/login').send({ email: responseData.email, password: 'XXXXXXXX' });
  const accessToken = response.body.responseObject.token;
  const refreshToken = response.body.responseObject.refreshToken;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-auth-token': accessToken,
    'x-refresh-token': refreshToken,
  };
  return { headers, user: mockUser };
};
describe('User API Endpoints', async () => {
  const { headers } = await getAuthData();
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const users = await userRepository.findAllAsync();
      // Act
      const response = await request(app).get('/users').set(headers);
      const responseBody: ServiceResponse<User[]> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('Users found');
      expect(responseBody.responseObject.length).toEqual(users.length);
      responseBody.responseObject.forEach((user, index) => compareUsers(users[index] as User, user));
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user for a valid ID', async () => {
      const users = await userRepository.findAllAsync();
      // Arrange
      const testId = users[0].id;
      const expectedUser = users.find((user) => user.id === testId) as User;

      // Act
      const response = await request(app).get(`/users/${testId}`).set(headers);
      const responseBody: ServiceResponse<User> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('User found');
      if (!expectedUser) throw new Error('Invalid test data: expectedUser is undefined');
      compareUsers(expectedUser, responseBody.responseObject);
    });

    it('should return a not found error for non-existent ID', async () => {
      // Arrange
      const testId = faker.number.int({ min: 1000, max: 2500 });

      // Act
      const response = await request(app).get(`/users/${testId}`).set(headers);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain('User not found');
      expect(responseBody.responseObject).toBeNull();
    });

    it('should return a bad request for invalid ID format', async () => {
      // Act
      const invalidInput = 'abc';
      const response = await request(app).get(`/users/${invalidInput}`).set(headers);
      const responseBody: ServiceResponse = response.body;
      // Assert
      expect(response.statusCode).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain('Invalid Input.');
    });
  });
});

function compareUsers(mockUser: User, responseUser: User) {
  if (!mockUser || !responseUser) {
    throw new Error('Invalid test data: mockUser or responseUser is undefined');
  }

  expect(responseUser.id).toEqual(mockUser.id);
  expect(responseUser.name).toEqual(mockUser.name);
  expect(responseUser.email).toEqual(mockUser.email);
  expect(new Date(responseUser.createdAt)).toEqual(mockUser.createdAt);
  expect(new Date(responseUser.updatedAt)).toEqual(mockUser.updatedAt);
}

describe('POST /auth/change-password', () => {
  it('should change the password successfully with valid inputs', async () => {
    const { headers } = await getAuthData();

    const changePasswordData = {
      oldPassword: 'XXXXXXXX',
      newPassword: 'newPassword456',
      confirmPassword: 'newPassword456',
    };

    // Act
    const response = await request(app).post('/auth/change-password').set(headers).send(changePasswordData);

    // Assert
    expect(response.statusCode).toEqual(StatusCodes.OK);
  });

  it('should return unauthorized for an invalid access token', async () => {
    const changePasswordData = {
      currentPassword: 'XXXXXXXX',
      newPassword: 'newPassword456',
    };

    // Act
    const response = await request(app).post('/auth/change-password').send(changePasswordData);

    // Assert
    expect(response.statusCode).toEqual(StatusCodes.FORBIDDEN);
    expect(response.body.message).toContain('Invalid authorization header');
  });

  // Add more test cases for incorrect current password, weak new password, edge cases, etc.
});
