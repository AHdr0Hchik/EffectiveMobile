// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async resetProblemsAndCount(): Promise<{ updatedCount: number }> {
    // Подсчитываем количество пользователей с проблемами
    const problemsCount = await this.userModel.count({
      where: { hasProblems: true },
    });

    // Сбрасываем флаг problems в false для всех пользователей
    await this.userModel.update(
      { hasProblems: false },
      { where: { hasProblems: true } },
    );

    return { updatedCount: problemsCount };
  }

  // Метод для заполнения базы данных
  async seedDatabase(): Promise<void> {
    const batchSize = 1000;
    const totalRecords = 1000000;
    
    for (let i = 0; i < totalRecords; i += batchSize) {
      const users = Array(batchSize)
        .fill(null)
        .map(() => ({
          firstName: ['John', 'Jane', 'Mike', 'Sarah'][
            Math.floor(Math.random() * 4)
          ],
          lastName: ['Smith', 'Johnson', 'Williams', 'Brown'][
            Math.floor(Math.random() * 4)
          ],
          age: Math.floor(Math.random() * 50) + 18,
          gender: Math.random() > 0.5 ? 'male' : 'female',
          hasProblems: Math.random() > 0.5,
        }));

      await this.userModel.bulkCreate(users);
    }
  }
}