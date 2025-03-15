export class UserTaskFetchResponseDto {
  id: string;
  title: string;
  description: string;
  date: Date;
  isCompleted: boolean;
  difficultLevel: number;

  constructor(props: {
    id: string;
    title: string;
    description: string;
    time: Date;
    isCompleted: boolean;
    difficultLevel: number;
  }) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.date = props.time;
    this.isCompleted = props.isCompleted;
    this.difficultLevel = props.difficultLevel;
  }
}
