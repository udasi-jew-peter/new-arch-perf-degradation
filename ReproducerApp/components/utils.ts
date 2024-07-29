import {
  backgroundColor,
  border,
  composeRestyleFunctions,
  shadow,
  spacing,
  spacingShorthand,
} from '@shopify/restyle';

export const restyleFunctions = composeRestyleFunctions([
  spacing,
  spacingShorthand,
  border,
  backgroundColor,
  shadow,
]);

export const findNeedleInTheHaystack = (
  needle: string,
  haystack: string,
  caseSensitiveSearch: boolean,
) => {
  if (!caseSensitiveSearch) {
    needle = needle.toLowerCase();
    haystack = haystack.toLowerCase();
  }

  const highlightStartIndex = haystack.indexOf(needle);
  const highlightEndIndex = highlightStartIndex + needle.length;

  return {highlightStartIndex, highlightEndIndex};
};
