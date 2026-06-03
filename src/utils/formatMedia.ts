export function formatMediaUrl(url: string | undefined | null, type: 'audio' | 'video' = 'video'): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('drive.google.com')) {
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `/api/proxy-media?id=${match[1]}&ext=${type === 'audio' ? '.mp3' : '.mp4'}`;
      }
    }
  } catch (e) {
    //
  }
  return url;
}
