import Link from 'next/link';
import { ArrowLeft, ArrowRight, List } from 'lucide-react';

import { ContentType, NavigationMeta } from '@/core/types';
import { cn } from 'cn';
import { Button } from '@/components/ui/button';
import { formatChapterTitle } from '@/lib/format';

interface ReaderNavProps {
    type: ContentType;
    seriesId: string;
    prev: NavigationMeta | null;
    next: NavigationMeta | null;
}


export default function ReaderNav({ type, seriesId, prev, next }: ReaderNavProps) {
    const base = `/${type}/${seriesId}`;

    return (
        <nav aria-label="Chapter navigation" className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
                <NavCard
                    href={prev ? `${base}/${prev.id}` : null}
                    label="Previous"
                    title={prev ? formatChapterTitle(prev.title) : 'This is the first chapter'}
                    direction="prev"
                />
                <NavCard
                    href={next ? `${base}/${next.id}` : null}
                    label="Next"
                    title={next ? formatChapterTitle(next.title) : "You're all caught up"}
                    direction="next"
                />
            </div>

            <Button
                variant="ghost"
                className="self-center text-muted-foreground"
                nativeButton={false}
                render={<Link href={base} />}
            >
                <List />
                All chapters
            </Button>
        </nav>
    );
}

function NavCard({ href, label, title, direction }: { href: string | null; label: string; title: string; direction: 'prev' | 'next' }) {
    const isNext = direction === 'next';
    const Icon = isNext ? ArrowRight : ArrowLeft;

    const content = (
        <>
            <span className={cn('flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-muted-foreground uppercase', isNext && 'justify-end')}>
                {!isNext && <Icon className="size-3.5" />}
                {label}
                {isNext && <Icon className="size-3.5" />}
            </span>
            <span className="truncate font-heading text-sm font-medium sm:text-base">{title}</span>
        </>
    );

    const className = cn(
        'flex min-w-0 flex-col gap-1.5 rounded-lg bg-card p-4 ring-1 ring-foreground/10 transition-colors sm:p-5',
        isNext && 'text-right',
    );

    if (!href) {
        return <div className={cn(className, 'opacity-50')} aria-disabled>{content}</div>;
    }

    return (
        <Link
            href={href}
            className={cn(
                className,
                'outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50',
            )}
        >
            {content}
        </Link>
    );
}
