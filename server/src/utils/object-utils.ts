function toCamelCase(
  obj: Record<string, string | number | null | string[]>,
): Record<string, string | number | null | string[]> {
  return Object.keys(obj).reduce<
    Record<string, string | number | null | string[]>
  >((acc, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter: string) =>
      letter.toUpperCase(),
    );
    acc[camelKey] = obj[key];
    return acc;
  }, {});
}

export { toCamelCase };
