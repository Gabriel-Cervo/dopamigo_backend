export class UpdateUserTaskResponseDto {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  difficultLevel: number;
  newScore?: UpdateUserTaskScoreResponseDto | null;
  unlockedAchievement?: UpdateUserTaskAchievementResponseDto | null;

  constructor(
    title: string,
    description: string,
    date: string,
    isCompleted: boolean,
    difficultLevel: number,
  ) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.isCompleted = isCompleted;
    this.difficultLevel = difficultLevel;
  }
}

export class UpdateUserTaskScoreResponseDto {
  id: string;
  points: number;

  constructor(id: string, points: number) {
    this.id = id;
    this.points = points;
  }
}

export class UpdateUserTaskAchievementResponseDto {
  id: string;
  name: string;
  description: string;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
