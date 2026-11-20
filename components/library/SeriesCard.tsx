import Link from 'next/link';

import { SeriesMeta } from '@/core/types';
import { cn } from 'cn';

interface SeriesCardProps {
    series: SeriesMeta;
    /** Son okunan bölümün 0 tabanlı indeksi (yoksa -1) */
    readIndex?: number;
    className?: string;
}

export default function SeriesCard({ series, readIndex = -1, className }: SeriesCardProps) {
    const total = series.chapters.length;
    const inProgress = readIndex >= 0 && total > 0;
    const percent = inProgress ? Math.round(((readIndex + 1) / total) * 100) : 0;

    return (
        <Link
            href={`/${series.type}/${series.id}`}
            className={cn(
                'group flex flex-col gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                className,
            )}
        >
            <div className="overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10 transition-shadow group-hover:ring-foreground/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={series.cover || '/default-cover.webp'}
                    alt={series.title}
                    loading="lazy"
                    className="aspect-2/3 w-full object-cover"
                />
                {inProgress && (
                    <div className="h-1 bg-muted">
                        <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-0.5 px-0.5">
                <p className="line-clamp-2 text-sm leading-snug font-medium group-hover:underline">
                    {series.title}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                    {series.type} · {inProgress ? `${readIndex + 1}/${total}` : `${total} ch.`}
                </p>
            </div>
        </Link>
    );
}
