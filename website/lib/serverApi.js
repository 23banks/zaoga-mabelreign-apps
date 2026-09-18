const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getJSON(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
