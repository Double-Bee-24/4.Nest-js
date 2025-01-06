function extractNumber(stringWithNumber: string): number {
  const match = stringWithNumber.match(/\d+/);
  return match ? parseInt(match[0], 10) : NaN;
}

export { extractNumber };
