export class UserAchievementDTO {
  id: string;
  unlockedAt: Date;
  achievementId: string;
  name: string;
  description: string;

  constructor(partial: Partial<UserAchievementDTO>) {
    Object.assign(this, partial);
  }

  static fromRaw(raw: any): UserAchievementDTO {
    return new UserAchievementDTO({
      id: raw.userAchievements_id,
      unlockedAt: new Date(raw.userAchievements_unlockedAt),
      name: raw.achievement_name,
      description: raw.achievement_description,
      achievementId: raw.achievement_id,
    });
  }
}
