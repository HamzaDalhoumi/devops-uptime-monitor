export interface MonitoredService {
  id: number;
  name: string;
  url: string;
  status: 'UP' | 'DOWN' | 'UNKNOWN';
  lastCheckedAt: string | null;
  lastStatusCode?: number | null;
  responseTimeMs?: number | null;
}
