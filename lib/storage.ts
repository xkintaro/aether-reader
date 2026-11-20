import { ContentType } from '@/core/types';

export const LAST_READ_KEY = 'aether_last_read';
export const PROGRESS_KEY = 'aether_progress';
export const READER_FONT_KEY = 'aether_reader_font';

export interface LastReadState {
    type: ContentType;
    seriesId: string;
    chapterId: string;
    timestamp: number;
}

export function readLastRead(): LastReadState | null {
    try {
        const raw = localStorage.getItem(LAST_READ_KEY);
        return raw ? (JSON.parse(raw) as LastReadState) : null;
    } catch {
        localStorage.removeItem(LAST_READ_KEY);
        return null;
    }
}

export function readProgress(): Record<string, string> {
    try {
        return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
    } catch {
        return {};
    }
}
