'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ContentType } from '@/core/types';
import { ArrowRight, Clock } from 'lucide-react';
import { getOriginalNames } from '@/core/actions/resolve';

interface LastReadState {
    type: ContentType;
    seriesId: string;
    chapterId: string;
    timestamp: number;
}

interface ResolvedTitles {
    seriesTitle: string;
    chapterTitle: string;
}

export default function ResumeButton() {
    const [lastRead, setLastRead] = useState<LastReadState | null>(null);
    const [titles, setTitles] = useState<ResolvedTitles | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const data = localStorage.getItem('aether_last_read');
        if (data) {
            try {
                const parsed = JSON.parse(data);
                setLastRead(parsed);

                getOriginalNames(parsed.type, parsed.seriesId, parsed.chapterId)
                    .then(res => {
                        if (res) setTitles(res);
                    });

            } catch (e) {
                localStorage.removeItem('aether_last_read');
            }
        }
    }, []);

    if (!mounted || !lastRead) return null;

    const formatName = (slug: string) => slug.replace(/-/g, ' ');
    const displaySeries = titles?.seriesTitle || formatName(lastRead.seriesId);
    const displayChapter = titles?.chapterTitle || formatName(lastRead.chapterId);

    return (
        <Link
            href={`/${lastRead.type}/${lastRead.seriesId}/${lastRead.chapterId}`}
            className="group relative flex items-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm transition-all duration-500 overflow-hidden hover:shadow-xl hover:-translate-y-1"
        >

            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">

                <Clock className="size-32 rotate-12" />

            </div>

            <div className="relative z-10 flex flex-col gap-2 w-full">

                <div className="flex items-center gap-2">

                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                        {lastRead.type === 'manga' ? 'Manga' : 'Novel'}
                    </span>

                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">

                        <Clock className="size-3" />

                        Last Read

                    </span>

                </div>

                <div className="flex flex-col">

                    <h3 className="font-extrabold text-2xl text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {displaySeries}
                    </h3>

                    <p className="text-sm font-medium text-muted-foreground">
                        {displayChapter}
                    </p>

                </div>

                <div className="mt-2 flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">

                    Continue Reading

                    <ArrowRight className="size-4" />

                </div>

            </div>

        </Link>

    );

}
