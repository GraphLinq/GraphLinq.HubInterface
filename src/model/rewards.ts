export enum ChallengeStatus {
  IN_PROGRESS = "IN_PROGRESS",
  CLAIMABLE = "CLAIMABLE",
  COMPLETED = "COMPLETED",
}

export interface Challenge {
  id: string;
  label: string;
  reward: number;
  progression: number;
  status: ChallengeStatus;
  available: boolean;
}

export interface ChallengeInformation {
  challenges: Challenge[];
  points: number;
}

export interface ChallengeLadderUser {
  address: string;
  points: number;
  position: number;
}
