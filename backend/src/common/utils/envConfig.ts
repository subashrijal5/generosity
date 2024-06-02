import dotenv from 'dotenv';
import { cleanEnv, host, num, port, str, testOnly } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly('test'), choices: ['development', 'production', 'test'] }),
  HOST: host({ devDefault: testOnly('localhost') }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN: str({ devDefault: testOnly('http://localhost:3000') }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),

  // Database Connecton
  DB_HOST: str({ devDefault: testOnly('localhost') }),
  DB_PORT: num({ default: 5432 }),
  DB_USER: str({ devDefault: testOnly('root') }),
  DB_PASSWORD: str({ devDefault: testOnly('root') }),
  DB_NAME: str({ devDefault: testOnly('generosity') }),

  // JWT
  JWT_SECRET: str(),
  JWT_EXPIRES_IN_HOURS: num({ default: 1 }),
  JWT_REFRESH_EXPIRES_IN_DAYS: num({ default: 7 }),
});
