export interface AnalyticsSummary { requests: number; errors: number; rateLimited: number; }
export const emptyAnalytics = (): AnalyticsSummary => ({ requests: 0, errors: 0, rateLimited: 0 });
