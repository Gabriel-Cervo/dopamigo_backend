export class UserAchievementSortedDTO {
  id: string;
  achievementId: string;
  unlockedAt: Date | null;
  name: string;
  description: string;

  constructor(partial: Partial<UserAchievementSortedDTO>) {
    Object.assign(this, partial);
  }

  static fromRaw(raw: any): UserAchievementSortedDTO {
    return new UserAchievementSortedDTO({
      id: raw.userAchievements_id,
      achievementId: raw.achievement_id,
      unlockedAt: raw.userAchievements_unlockedAt
        ? new Date(raw.userAchievements_unlockedAt)
        : null,
      name: raw.achievement_name,
      description: raw.achievement_description,
    });
  }
}

export class UserAchievementsSortedResponseDTO {
  unlocked: UserAchievementSortedDTO[];
  blocked: UserAchievementSortedDTO[];

  constructor(
    unlocked: UserAchievementSortedDTO[],
    blocked: UserAchievementSortedDTO[],
  ) {
    this.unlocked = unlocked;
    this.blocked = blocked;
  }
}
