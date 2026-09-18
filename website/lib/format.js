export function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value).slice(0, 10);
  return d.toISOString().slice(0, 10);
}

export function sermonEmoji(type) {
  return type === 'video' ? '🎥' : '🎙️';
}

export function mediaEmoji(type) {
  return type === 'video' ? '🎬' : '📸';
}
