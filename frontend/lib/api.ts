const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
export async function fetchApi<T>(path: string): Promise<T> { const response = await fetch(`${baseUrl}${path}`, { cache: 'no-store' }); if (!response.ok) throw new Error(`API request failed: ${response.status}`); return response.json() as Promise<T>; }
