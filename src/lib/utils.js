// Minimal utility helpers used by the members app.
// Implemented as simple JS to avoid TypeScript conversion here.
export function cn(...inputs) {
  return inputs
    .flatMap(i => (Array.isArray(i) ? i : [i]))
    .filter(Boolean)
    .join(' ');
}

export default cn;
