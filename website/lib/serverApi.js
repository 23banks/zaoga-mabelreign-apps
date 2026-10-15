const API_URL = process.env.INTERNAL_API_URL || 'http://localhost:5400/api/v1';

export async function getJSON(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
