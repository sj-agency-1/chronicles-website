import { type TocItem } from '~/components/structures/TableOfContent.astro';

export const generateTableOfContentsFromContent = (content: string): Array<TocItem> => {
  const tocItems: TocItem[] = [];

  // Split content by lines and process each line
  const lines = content.split('\n');

  for (const line of lines) {
    // Look for H2 headings (starting with ##)
    if (line.startsWith('## ')) {
      const headingText = line.substring(3).trim(); // Remove the ## and trim

      // Split on first colon to separate chapter title from description
      const colonIndex = headingText.indexOf(':');

      let chapterTitle: string | undefined;
      let chapterDescription: string;

      if (colonIndex !== -1) {
        chapterTitle = headingText.substring(0, colonIndex).trim();
        chapterDescription = headingText.substring(colonIndex + 1).trim();
      } else {
        // If no colon, use entire heading as description
        chapterDescription = headingText;
      }

      // Generate targetId: lowercase, replace spaces with hyphens, remove punctuation
      const targetId = chapterDescription
        .toLowerCase()
        .replace(/[^\w\sа-яА-Я-]/g, '') // Remove punctuation except hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

      tocItems.push({
        targetId,
        chapterTitle,
        chapterDescription,
      });
    }
  }

  return tocItems;
};
