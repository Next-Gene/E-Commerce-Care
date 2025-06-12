export interface UsageStatus {
  allowed: boolean;
  dailyLimit: number;
  currentCount: number;
  message: string;
} 