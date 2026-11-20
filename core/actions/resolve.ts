'use server';

import { getSeriesDetails } from '@/core/services/contentService';
import { ContentType } from '@/core/types';

export async function getOriginalNames(type: ContentType, seriesSlug: string, chapterSlug: string) {
    try {
        const data = await getSeriesDetails(type, seriesSlug);
        const index = data.chapters.findIndex(c => c.id === chapterSlug);
        const chapter = index >= 0 ? data.chapters[index] : null;

        return {
            seriesTitle: data.title,
            chapterTitle: chapter ? chapter.title : chapterSlug,
            cover: data.cover,
            chapterIndex: index,
            chapterCount: data.chapters.length,
        };
    } catch (error) {
        return null;
    }
}
