'use client';

import Link from 'next/link';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { ContentType, NavigationMeta } from '@/core/types';

interface ReaderNavProps {
    type: ContentType;
    seriesId: string;
    prev: NavigationMeta | null;
    next: NavigationMeta | null;
}

export default function ReaderNav({ type, seriesId, prev, next }: ReaderNavProps) {
    return (

        <div className="flex items-center gap-3 w-fit">

            {prev ? (
                <Link
                    href={`/${type}/${seriesId}/${prev.id}`}
                    title={`Previous: ${prev.title}`}
                    className="flex items-center justify-center gap-1 rounded-full text-foreground hover:text-accent transition-all active:scale-95"
                >

                    <ArrowLeft className="w-4 h-4" />

                    Previous

                </Link>
            ) : (
                <div className="flex items-center justify-center gap-1 rounded-full opacity-50 text-muted-foreground cursor-not-allowed">

                    <ArrowLeft className="w-4 h-4" />

                    Previous

                </div>
            )}

            {next ? (
                <Link
                    href={`/${type}/${seriesId}/${next.id}`}
                    title={`Next: ${next.title}`}
                    className="flex items-center justify-center gap-1 rounded-full text-foreground hover:text-accent transition-all active:scale-95"
                >
                    Next

                    <ArrowRight className="w-4 h-4" />

                </Link>
            ) : (
                <div className="flex items-center justify-center gap-1 rounded-full opacity-50 text-muted-foreground cursor-not-allowed">

                    Next

                    <ArrowRight className="w-4 h-4" />

                </div>
            )}

        </div>

    );
}