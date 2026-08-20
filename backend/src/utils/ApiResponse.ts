export const ApiResponse = <T>(data: T, meta?: Record<string, unknown>) => ({ data, ...(meta ? { meta } : {}) });
