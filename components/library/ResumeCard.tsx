'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { getOriginalNames } from '@/core/actions/resolve';
import { LastReadState, readLastRead } from '@/lib/storage';
import { Skeleton } from '@/components/ui/skeleton';
import { formatChapterTitle } from '@/lib/format';

type Resolved = NonNullable<Awaited<ReturnType<typeof getOriginalNames>>>;


export default function ResumeCard() {
    const [state, setState] = useState<'loading' | 'empty' | 'ready'>('loading');
    const [lastRead, setLastRead] = useState<LastReadState | null>(null);
    const [resolved, setResolved] = useState<Resolved | null>(null);

    useEffect(() => {
        const data = readLastRead();
        if (!data) {
            setState('empty');
            return;
        }
        setLastRead(data);
        getOriginalNames(data.type, data.seriesId, data.chapterId)
            .then(res => {
                // Seri ya da bölüm artık kütüphanede yoksa kartı gösterme.
                if (!res || res.chapterIndex < 0) {
                    setState('empty');
                    return;
                }
                setResolved(res);
                setState('ready');
            })
            .catch(() => setState('empty'));
    }, []);

    if (state === 'loading') return <ResumeSkeleton />;

    // Henüz okunan bir şey yoksa alan hiç gösterilmez.
    if (state === 'empty' || !lastRead) return null;

    const seriesTitle = resolved?.seriesTitle || formatChapterTitle(lastRead.seriesId);
    const chapterTitle = formatChapterTitle(resolved?.chapterTitle || lastRead.chapterId);
    const href = `/${lastRead.type}/${lastRead.seriesId}/${lastRead.chapterId}`;
    const cover = resolved?.cover || '/default-cover.webp';

    const hasProgress = !!resolved && resolved.chapterIndex >= 0 && resolved.chapterCount > 0;
    const percent = hasProgress ? Math.round(((resolved.chapterIndex + 1) / resolved.chapterCount) * 100) : 0;

    return (
        <Link
            href={href}
            className="flex items-center gap-5 rounded-xl bg-card p-4 ring-1 ring-foreground/10 transition-colors outline-none hover:bg-muted/60 hover:ring-foreground/20 focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-5"
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt="" className="hidden h-28 w-[4.75rem] shrink-0 rounded-md object-cover ring-1 ring-foreground/10 sm:block" />

            <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                <p className="font-mono text-xs text-muted-foreground">
                    Continue reading · {lastRead.type}
                </p>

                <div className="min-w-0">
                    <p className="truncate text-lg font-semibold sm:text-xl">{seriesTitle}</p>
                    <p className="truncate text-sm text-muted-foreground">{chapterTitle}</p>
                </div>

                {hasProgress && (
                    <div className="flex max-w-sm items-center gap-3">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground tabular-nums">
                            {resolved.chapterIndex + 1}/{resolved.chapterCount}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
}

function ResumeSkeleton() {
    return (
        <div className="flex items-center gap-5 rounded-xl bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
            <Skeleton className="hidden h-28 w-[4.75rem] rounded-md sm:block" />
            <div className="flex flex-1 flex-col gap-2.5">
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-20" />
            </div>
        </div>
    );
}
