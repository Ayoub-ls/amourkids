// Keep this splitting logic identical everywhere it's used (rendering AND
// counting), so a block's word count always matches its slice of timings.json.
export function splitWords(text) {
  return text.trim().split(/\s+/).filter(Boolean);
}
