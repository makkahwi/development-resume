type Entry = { count: number; expiresAt: number };
const requests = new Map<string, Entry>();
export function allowRequest(client: string, limit: number, windowSeconds: number, now = Date.now()): boolean {
  if (requests.size > 10000) for (const [key, value] of requests) if (value.expiresAt <= now) requests.delete(key);
  const current = requests.get(client);
  if (!current || current.expiresAt <= now) {
    requests.set(client, { count: 1, expiresAt: now + windowSeconds * 1000 });
    return true;
  }
  if (current.count >= limit) return false;
  current.count++;
  return true;
}
