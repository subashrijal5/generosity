import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import { userRouter } from '@/api/user/userRouter';
import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
// import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/common/utils/envConfig';

import { authRouter } from './api/auth/authRouter';
import { courseRouter } from './api/courses/courseRouter';
import { lectureRouter } from './api/lectures/lectureRouter';
import authMiddleware from './common/middleware/authMiddleware';

declare module 'express' {
  export interface Request {
    user?: { email: string; iat: number; exp: number };
  }
}
const logger = pino({ name: 'server start' });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

app.use(express.json());

app.use(helmet());
// app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use('/health-check', healthCheckRouter);

app.use('/users', authMiddleware, userRouter);
app.use('/auth', authRouter);
app.use('/courses', authMiddleware, courseRouter);
app.use('/lectures', authMiddleware, lectureRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
