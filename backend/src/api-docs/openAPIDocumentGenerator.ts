import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { authRegistry } from '@/api/auth/authRouter';
import { coursesRegistry } from '@/api/courses/courseRouter';
import { healthCheckRegistry } from '@/api/healthCheck/healthCheckRouter';
import { lectureRegistry } from '@/api/lectures/lectureRouter';
import { userRegistry } from '@/api/user/userRouter';

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    userRegistry,
    authRegistry,
    coursesRegistry,
    lectureRegistry,
  ]);
  // Use this to add a security scheme to the document
  // registry.registerComponent('securitySchemes', 'Authorization', {
  //   type: 'http',
  //   scheme: 'bearer',
  // });
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Swagger API',
    },
    externalDocs: {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: '/swagger.json',
    },
  });
}
