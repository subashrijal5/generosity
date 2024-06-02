import { Request } from 'express';
import { rateLimit } from 'express-rate-limit';
import { StatusCodes } from 'http-status-codes';

import { env } from '@/common/utils/envConfig';

const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: { message: 'Too many requests, please try again later.', status: StatusCodes.TOO_MANY_REQUESTS },
  standardHeaders: true,
  windowMs: 15 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS,
  keyGenerator: (req: Request) => req.ip as string,
});

export default rateLimiter;
