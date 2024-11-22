import { Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('reset-problems')
  async resetProblems() {
    return this.usersService.resetProblemsAndCount();
  }

  @Post('seed')
  async seedDatabase() {
    await this.usersService.seedDatabase();
    return { message: 'Database seeded successfully' };
  }
}