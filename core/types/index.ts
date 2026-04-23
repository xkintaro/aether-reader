export type ContentType = 'manga' | 'novel';

export interface ChapterMeta {
    id: string;
    title: string;
}

export interface SeriesMeta {
    id: string;
    type: ContentType;
    title: string;
    chapters: ChapterMeta[];
    cover?: string;
}

export interface MangaChapterData {
    seriesId: string;
    chapterId: string;
    images: string[];
    prev: NavigationMeta | null;
    next: NavigationMeta | null;
}

export interface NovelChapterData {
    seriesId: string;
    chapterId: string;
    content: string;
    prev: NavigationMeta | null;
    next: NavigationMeta | null;
}

export interface NavigationMeta {
    id: string;
    title: string;
}