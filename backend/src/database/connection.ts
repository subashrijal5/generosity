import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { env } from '@/common/utils/envConfig';

import * as schema from './schema';

const client = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});
client.connect();
export const db = drizzle(client, { schema: schema });
