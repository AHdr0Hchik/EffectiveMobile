// src/scripts/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  try {
    console.log('Starting database seeding...');
    await usersService.seedDatabase();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error during database seeding:', error);
  } finally {
    await app.close();
  }
}

bootstrap();