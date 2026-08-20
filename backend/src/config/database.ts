export interface DatabaseHealth { connected: boolean; provider: string; }
export const databaseHealth = (): DatabaseHealth => ({ connected: false, provider: 'postgresql (configure Prisma)' });
