
export enum PeriodUnit {
  Months = 'meses',
  Years = 'anos',
}

export enum RatePeriod {
  Monthly = 'mensal',
  Annual = 'anual',
}

export interface PeriodData {
  month: number;
  label: string;
  interest: number;
  totalInvested: number;
  totalInterest: number;
  totalAccumulated: number;
}

export interface CalculationResult {
  finalAmount: number;
  totalInvested: number;
  totalInterest: number;
  data: PeriodData[];
}
