import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();
export default defineConfig({
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    ssl: true,
  },
  migrations: {
    table: 'migrations',
    schema: 'public',
  },
  verbose: true,
  strict: true,
});
