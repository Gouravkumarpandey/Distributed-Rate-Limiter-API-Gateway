export function validateBearerToken(header: string | undefined) { return Boolean(header?.startsWith('Bearer ')); }
