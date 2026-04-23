'use client';

import { useEffect } from 'react';
import { ContentType } from '@/core/types';

interface MemoryTrackerProps {
    type: ContentType;
    seriesId: string;
    chapterId: string;
}

export default function MemoryTracker({ type, seriesId, chapterId }: MemoryTrackerProps) {
    useEffect(() => {
        try {
            localStorage.setItem('aether_last_read', JSON.stringify({
                type,
                seriesId,
                chapterId,
                timestamp: Date.now()
            }));

            const progress = JSON.parse(localStorage.getItem('aether_progress') || '{}');
            progress[seriesId] = chapterId;
            localStorage.setItem('aether_progress', JSON.stringify(progress));

        } catch (error) {
            console.error("[Error] Cognitive memory could not be written to the browser.", error);
        }
    }, [type, seriesId, chapterId]);

    return null;
}