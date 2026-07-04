export function stripHtmlAndEntities(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}
