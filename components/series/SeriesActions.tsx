'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, History, SkipForward, Undo2 } from 'lucide-react';

import { ChapterMeta, ContentType } from '@/core/types';
import { readProgress } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { formatChapterTitle } from '@/lib/format';

interface SeriesActionsProps {
    type: ContentType;
    seriesId: string;
    chapters: ChapterMeta[];
}


export default function SeriesActions({ type, seriesId, chapters }: SeriesActionsProps) {
    const [lastReadId, setLastReadId] = useState<string | null>(null);

    useEffect(() => {
        setLastReadId(readProgress()[seriesId] ?? null);
    }, [seriesId]);

    if (chapters.length === 0) return null;

    const base = `/${type}/${seriesId}`;
    const first = chapters[0];
    const latest = chapters[chapters.length - 1];
    const lastRead = lastReadId ? chapters.find(c => c.id === lastReadId) : null;

    return (
        <div className="flex flex-wrap items-center gap-2">
            {lastRead ? (
                <Button size="lg" className="h-10 px-4" nativeButton={false} render={<Link href={`${base}/${lastRead.id}`} />}>
                    <History />
                    Continue · <span>{formatChapterTitle(lastRead.title)}</span>
                </Button>
            ) : (
                <Button size="lg" className="h-10 px-4" nativeButton={false} render={<Link href={`${base}/${first.id}`} />}>
                    <BookOpen />
                    Start reading
                </Button>
            )}

            {lastRead && lastRead.id !== first.id && (
                <Button size="lg" variant="outline" className="h-10 px-4" nativeButton={false} render={<Link href={`${base}/${first.id}`} />}>
                    <Undo2 />
                    From the start
                </Button>
            )}

            {!lastRead && chapters.length > 1 && (
                <Button size="lg" variant="outline" className="h-10 px-4" nativeButton={false} render={<Link href={`${base}/${latest.id}`} />}>
                    <SkipForward />
                    Latest chapter
                </Button>
            )}
        </div>
    );
}
