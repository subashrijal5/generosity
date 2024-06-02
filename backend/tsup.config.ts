import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src', '!src/**/*.sql'],
  splitting: false,
  sourcemap: true,
  clean: true,
});
