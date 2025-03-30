import { Injectable } from '@nestjs/common';
import { Achievements } from 'src/domain/entities/achievements.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FetchAchievementsUseCase {
  constructor(
    @InjectRepository(Achievements)
    private readonly achievementRepo: Repository<Achievements>,
  ) {}

  async execute() {
    let achievements = await this.achievementRepo.find();

    if (achievements.length == 0) {
      achievements = await this.saveDefaultAchievements();
    }

    return achievements;
  }

  private async saveDefaultAchievements(): Promise<Achievements[]> {
    const defaultAchievements = this.getDefaultAchievements();

    for (const achievement of defaultAchievements) {
      await this.achievementRepo.save(achievement);
    }

    return defaultAchievements;
  }

  private getDefaultAchievements(): Achievements[] {
    return [
      new Achievements({
        name: 'Primeira Tarefa!',
        description: 'Concluiu sua primeira tarefa',
        criteria: `{ "tasks":{ "finishedNumber":1 }}`,
      }),
      new Achievements({
        name: 'Cinco Tarefas!',
        description: 'Concluiu suas primeiras cinco tarefas',
        criteria: `{ "tasks":{ "finishedNumber":5 }}`,
      }),
      new Achievements({
        name: 'Dez Tarefas!',
        description: 'Concluiu suas primeiras dez tarefas',
        criteria: `{ "tasks":{ "finishedNumber":10 }}`,
      }),
    ];
  }
}
