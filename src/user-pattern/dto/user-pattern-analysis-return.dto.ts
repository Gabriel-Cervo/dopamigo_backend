export class UserPatternAnalysisReturnDto {
  mostFrequentCompletionHour: string;
  mostProductiveDays: string[];
  commonTaskTitles: string[];
  averageCompletionTime: number;
  completionPercentage: number;

  constructor(
    mostFrequentCompletionHour: string,
    mostProductiveDays: string[],
    commonTaskTitles: string[],
    averageCompletionTime: number,
    completionPercentage: number,
  ) {
    this.mostFrequentCompletionHour = mostFrequentCompletionHour;
    this.mostProductiveDays = mostProductiveDays;
    this.commonTaskTitles = commonTaskTitles;
    this.averageCompletionTime = averageCompletionTime;
    this.completionPercentage = completionPercentage;
  }
}
