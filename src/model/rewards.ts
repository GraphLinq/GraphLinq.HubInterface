export enum ChallengeStatus {
  IN_PROGRESS,
  CLAIMABLE,
  COMPLETED,
}

export interface Challenge {
  label: string;
  reward: number;
  progression: number;
  status: ChallengeStatus;
}
