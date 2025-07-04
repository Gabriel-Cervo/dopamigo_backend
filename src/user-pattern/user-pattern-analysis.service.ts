import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { IException } from 'src/infra/exceptions/exceptions.interface';
import { UserTask } from 'src/domain/entities/userTask.entity';
import { User } from 'src/domain/entities/user.entity';
import { UserPatternAnalysisReturnDto } from './dto/user-pattern-analysis-return.dto';

@Injectable()
export class UserPatternAnalysisService {
  constructor(
    @InjectRepository(UserTask)
    private readonly userTaskRepository: Repository<UserTask>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(ExceptionsService)
    private readonly exceptionService: IException,
  ) {}

  async getUserPatterns(userId: string): Promise<UserPatternAnalysisReturnDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw this.exceptionService.badRequestException({
        message: 'Usuário não encontrado',
      });
    }

    const allTasks = await this.userTaskRepository.find({
      where: { user: { id: userId } },
    });
    const completedTasks = allTasks.filter((task) => task.isCompleted);

    if (completedTasks.length === 0) {
      throw this.exceptionService.badRequestException({
        message: 'Nenhuma tarefa concluída encontrada para análise.',
      });
    }

    const completionPercentage =
      (completedTasks.length / allTasks.length) * 100;

    return new UserPatternAnalysisReturnDto(
      this.getMostFrequentCompletionHour(completedTasks),
      this.getMostProductiveDays(completedTasks),
      this.getCommonTaskTitles(completedTasks),
      this.getAverageCompletionTime(completedTasks),
      completionPercentage,
    );
  }

  private getMostFrequentCompletionHour(tasks: UserTask[]): string {
    const hoursMap = new Map<number, number>();

    tasks.forEach((task) => {
      const hour = moment(task.time).hour();
      hoursMap.set(hour, (hoursMap.get(hour) || 0) + 1);
    });

    const mostFrequentHour = [...hoursMap.entries()].reduce((a, b) =>
      b[1] > a[1] ? b : a,
    )[0];

    return `${mostFrequentHour}:00`;
  }

  private getMostProductiveDays(tasks: UserTask[]): string[] {
    const daysMap = new Map<number, number>();

    tasks.forEach((task) => {
      const day = moment(task.time).isoWeekday();
      daysMap.set(day, (daysMap.get(day) || 0) + 1);
    });

    const sortedDays = [...daysMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0]);

    const daysOfWeek = [
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
      'Domingo',
    ];
    return sortedDays.map((day) => daysOfWeek[day - 1]);
  }

  private getCommonTaskTitles(tasks: UserTask[]): string[] {
    const taskFrequencyMap = new Map<string, number>();

    tasks.forEach((task) => {
      const title = task.title.toLowerCase();
      taskFrequencyMap.set(title, (taskFrequencyMap.get(title) || 0) + 1);
    });

    return [...taskFrequencyMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map((entry) => entry[0]);
  }

  private getAverageCompletionTime(tasks: UserTask[]): number {
    let totalTime = 0;
    let count = 0;

    tasks.forEach((task) => {
      if (task.notificationTime) {
        totalTime += task.notificationTime;
        count++;
      }
    });

    return count > 0 ? Math.round(totalTime / count) : 0;
  }
}
