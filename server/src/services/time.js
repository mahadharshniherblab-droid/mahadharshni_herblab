// India uses UTC+05:30 year-round. Keep the offset so timestamps remain unambiguous
// and parse to the same instant regardless of the backend machine's timezone.
export function indiaTimestamp(date = new Date()) {
  return new Date(date.getTime() + 330 * 60 * 1000).toISOString().replace('Z', '+05:30');
}
