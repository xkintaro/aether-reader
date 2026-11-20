'use server';

import { getLibrary } from '@/core/services/contentService';

export interface SearchResult {
    id: string;
    type: 'manga' | 'novel';
    title: string;
    cover?: string;
    chapterCount: number;
}

export async function searchContent(query: string): Promise<SearchResult[]> {
    if (!query || query.trim().length < 2) return [];

    const library = await getLibrary();
    const lowerQuery = query.toLowerCase();

    const results = library
        .filter(series => series.title.toLowerCase().includes(lowerQuery))
        .map(series => ({
            id: series.id,
            type: series.type,
            title: series.title,
            cover: series.cover,
            chapterCount: series.chapters.length,
        }));

    return results;
}
