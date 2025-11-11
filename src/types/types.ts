export interface Platform {
  id: string;
  name: string;
  color: string;
}

export interface Offer {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'stopped';
  launchDate: string;
  balance: number;
  spent: number;
  platforms: Platform[];
}

export interface Metric {
  title: string,
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  previousValue: number;
  format: string;
}

export interface CurrentMetrics {
  expenses: Metric;
  clicks: Metric;
  cpc: Metric;
  cpa: Metric;
}