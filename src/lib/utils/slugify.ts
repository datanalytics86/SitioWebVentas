/**
 * Convert a string to a URL-friendly slug
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

/**
 * Generate a unique slug by appending a number if necessary
 */
export const generateUniqueSlug = async (
  baseText: string,
  checkExists: (slug: string) => Promise<boolean>
): Promise<string> => {
  let slug = slugify(baseText);
  let counter = 1;

  while (await checkExists(slug)) {
    slug = `${slugify(baseText)}-${counter}`;
    counter++;
  }

  return slug;
};
