import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { app } from '@/server';
describe('POST /auth/register', () => {
  it('should register a new user successfully', async () => {
    const registerData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'XXXXXXXX',
    };
    // Arrange
    const response = await request(app).post('/auth/register').send(registerData);

    // Assert
    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(response.body.success).toBe(true);
    expect(response.body.responseObject).toMatchObject({
      name: registerData.name,
      email: registerData.email,
      // Add more assertions for the registered user object
    });
  });

  it('should return bad request for invalid registration data', async () => {
    // Arrange
    const invalidData = {
      username: '', // Empty username
      email: 'invalidemail', // Invalid email format
      password: '123', // Weak password
    };

    // Act
    const response = await request(app).post('/auth/register').send(invalidData);

    // Assert
    expect(response.statusCode).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Invalid Input.');
  });

  // Add more test cases for edge cases, duplicate email, etc.
});

describe('POST /auth/login', () => {
  it('should login successfully with valid credentials', async () => {
    // Arrange
    const loginData = {
      email: 'test@example.com',
      password: 'XXXXXXXX',
    };

    // Act
    const response = await request(app).post('/auth/login').send(loginData);

    // Assert
    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(response.body.success).toBe(true);
    expect(response.body.responseObject).toHaveProperty('token');
    expect(response.body.responseObject).toHaveProperty('id');
    expect(response.body.responseObject).toHaveProperty('name');
    // Add more assertions for the user object
  });

  it('should return unauthorized for invalid credentials', async () => {
    // Arrange
    const invalidData = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    // Act
    const response = await request(app).post('/auth/login').send(invalidData);

    // Assert
    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Invalid password');
  });

  // Add more test cases for non-existent email, edge cases, etc.
});
