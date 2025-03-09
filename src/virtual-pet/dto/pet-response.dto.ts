export class PetResponseDto {
  id: string;
  name: string;
  level: number;
  hapinessLevel: number;
  lastInteraction: Date;

  constructor(
    id: string,
    name: string,
    level: number,
    hapinessLevel: number,
    lastInteraction: Date,
  ) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.hapinessLevel = hapinessLevel;
    this.lastInteraction = lastInteraction;
  }
}
