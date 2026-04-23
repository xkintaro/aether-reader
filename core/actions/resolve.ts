'use server';

import { getSeriesDetails } from '@/core/services/contentService';
import { ContentType } from '@/core/types';

export async function getOriginalNames(type: ContentType, seriesSlug: string, chapterSlug: string) {
    try {
        const data = await getSeriesDetails(type, seriesSlug);
        const chapter = data.chapters.find(c => c.id === chapterSlug);

        return {
            seriesTitle: data.title,
            chapterTitle: chapter ? chapter.title : chapterSlug
        };
    } catch (error) {
        return null;
    }
}