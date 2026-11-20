/**
 * Turns a chapter folder/file name into a display title.
 * - "07 - A Mad Tea-Party"  -> "A Mad Tea-Party"   (ordering prefix removed)
 * - "chapter-1"             -> "chapter 1"         (slug-style names get spaces)
 */
export function formatChapterTitle(raw: string): string {
    const withoutPrefix = raw.replace(/^\d+\s*[-–.]\s+/, '').trim() || raw;
    return withoutPrefix.includes(' ') ? withoutPrefix : withoutPrefix.replace(/-/g, ' ');
}
