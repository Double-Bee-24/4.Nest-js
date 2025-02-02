/**
 * Converts a camelCase string into a human-readable string.
 * - Capitalizes the first letter of the string.
 * - Adds spaces before uppercase letters.
 * - Converts the rest of the string to lowercase.
 *
 * @param {string} string - The camelCase string to convert.
 * @returns {string} - The converted human-readable string.
 *
 * @example
 * fromCamelToHumanCase('camelCaseString'); // "Camel case string"
 * fromCamelToHumanCase('anotherExampleHere'); // "Another example here"
 */
const fromCamelToHumanCase = (string: string) => {
  return (
    string[0].toUpperCase() +
    string
      .slice(1)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .toLowerCase()
  );
};

export { fromCamelToHumanCase };
