'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Check, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

import { ChapterMeta, ContentType } from '@/core/types';
import { readProgress } from '@/lib/storage';
import { cn } from 'cn';
import { Button } from '@/components/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatChapterTitle } from '@/lib/format';

interface ChapterListProps {
    type: ContentType;
    seriesId: string;
    chapters: ChapterMeta[];
}

const PAGE_SIZES = [100, 250, 1000].map(n => ({ label: `${n} / page`, value: String(n) }));

export default function ChapterList({ type, seriesId, chapters }: ChapterListProps) {
    const [perPage, setPerPage] = useState<number>(100);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [descending, setDescending] = useState(false);
    const [lastReadId, setLastReadId] = useState<string | null>(null);

    useEffect(() => {
        setLastReadId(readProgress()[seriesId] ?? null);
    }, [seriesId]);

    const lastReadIndex = lastReadId ? chapters.findIndex(c => c.id === lastReadId) : -1;
    const isSmallSeries = chapters.length <= 100;
    const query = searchQuery.trim().toLowerCase();

    const filteredChapters = useMemo(() => {
        const list = chapters
            .map((chapter, index) => ({ ...chapter, index }))
            .filter(c => !query || c.title.toLowerCase().includes(query) || c.id.includes(query));
        return descending ? list.reverse() : list;
    }, [chapters, query, descending]);

    const totalPages = Math.max(1, Math.ceil(filteredChapters.length / perPage));
    const startIndex = (currentPage - 1) * perPage;
    const paginatedChapters = filteredChapters.slice(startIndex, startIndex + perPage);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Chapters</h2>
                    <p className="font-mono text-xs text-muted-foreground">
                        {query
                            ? `${filteredChapters.length} of ${chapters.length} match`
                            : lastReadIndex >= 0
                                ? `${lastReadIndex + 1} of ${chapters.length} read`
                                : `${chapters.length} available`}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <InputGroup className="h-9 flex-1 sm:w-60 sm:flex-none">
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupInput
                            value={searchQuery}
                            onChange={e => handleSearch(e.target.value)}
                            placeholder="Find chapter..."
                            aria-label="Find chapter"
                        />
                        {searchQuery && (
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton size="icon-xs" aria-label="Clear" onClick={() => handleSearch('')}>
                                    <X />
                                </InputGroupButton>
                            </InputGroupAddon>
                        )}
                    </InputGroup>

                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="outline"
                                    size="icon-lg"
                                    aria-label={descending ? 'Oldest first' : 'Newest first'}
                                    onClick={() => {
                                        setDescending(d => !d);
                                        setCurrentPage(1);
                                    }}
                                />
                            }
                        >
                            {descending ? <ArrowDownWideNarrow /> : <ArrowUpNarrowWide />}
                        </TooltipTrigger>
                        <TooltipContent>{descending ? 'Newest first' : 'Oldest first'}</TooltipContent>
                    </Tooltip>

                    {!isSmallSeries && (
                        <Select
                            items={PAGE_SIZES}
                            value={String(perPage)}
                            onValueChange={v => {
                                if (!v) return;
                                setPerPage(Number(v));
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="h-9! w-32" aria-label="Chapters per page">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent align="end">
                                {PAGE_SIZES.map(size => (
                                    <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>
            </div>

            {paginatedChapters.length === 0 ? (
                <Empty className="border py-14">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Search />
                        </EmptyMedia>
                        <EmptyTitle>{chapters.length === 0 ? 'No chapters yet' : 'Chapter not found'}</EmptyTitle>
                        <EmptyDescription>
                            {chapters.length === 0
                                ? 'This series has no chapters in its folder.'
                                : <>No chapter matches &ldquo;{searchQuery}&rdquo;.</>}
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            ) : (
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedChapters.map(chapter => {
                        const isCurrent = chapter.index === lastReadIndex;
                        const isRead = lastReadIndex >= 0 && chapter.index < lastReadIndex;

                        return (
                            <li key={chapter.id}>
                                <Link
                                    href={`/${type}/${seriesId}/${chapter.id}`}
                                    className={cn(
                                        'flex h-12 items-center gap-3 rounded-lg bg-card px-3 ring-1 ring-foreground/10 transition-colors outline-none',
                                        'hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50',
                                        isCurrent && 'bg-primary/10 ring-primary/50 hover:bg-primary/15',
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'flex h-6 min-w-9 shrink-0 items-center justify-center rounded-md bg-muted px-1.5 font-mono text-xs text-muted-foreground tabular-nums',
                                            isCurrent && 'bg-primary text-primary-foreground',
                                        )}
                                    >
                                        {String(chapter.index + 1).padStart(2, '0')}
                                    </span>
                                    <span className={cn('min-w-0 flex-1 truncate text-sm font-medium', isRead && 'text-muted-foreground')}>
                                        {formatChapterTitle(chapter.title)}
                                    </span>
                                    {isCurrent && (
                                        <span className="shrink-0 font-mono text-[10px] tracking-wider text-primary-ink uppercase">reading</span>
                                    )}
                                    {isRead && <Check className="size-4 shrink-0 text-muted-foreground" aria-label="Read" />}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}

            {totalPages > 1 && (
                <div className="flex items-center justify-between gap-2 pt-2">
                    <Button variant="outline" size="lg" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                        <ChevronLeft />
                        <span className="hidden sm:inline">Previous</span>
                    </Button>

                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        page <span className="text-foreground">{currentPage}</span> / {totalPages}
                    </span>

                    <Button variant="outline" size="lg" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight />
                    </Button>
                </div>
            )}
        </section>
    );
}
