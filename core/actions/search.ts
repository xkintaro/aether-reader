'use server';

import { getLibrary } from '@/core/services/contentService';

export interface SearchResult {
    id: string;
    type: 'manga' | 'novel';
    title: string;
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
            title: series.title
        }));

    return results;
}