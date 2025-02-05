export class UpdateUserTaskResponseDto {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  difficultLevel: number;
  newScore?: UpdateUserTaskScoreResponseDto | null;

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
