'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowDownAZ, BookImage, BookText, Inbox, LayoutGrid, Search, X } from 'lucide-react';

import { SeriesMeta } from '@/core/types';
import { readProgress } from '@/lib/storage';
import SeriesCard from '@/components/library/SeriesCard';
import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type Filter = 'all' | 'manga' | 'novel';
type Sort = 'title' | 'chapters' | 'progress';

const SORT_ITEMS: { label: string; value: Sort }[] = [
    { label: 'Title (A–Z)', value: 'title' },
    { label: 'Most chapters', value: 'chapters' },
    { label: 'In progress first', value: 'progress' },
];

export default function LibraryGrid({ library }: { library: SeriesMeta[] }) {
    const [filter, setFilter] = useState<Filter>('all');
    const [sort, setSort] = useState<Sort>('title');
    const [query, setQuery] = useState('');
    const [progress, setProgress] = useState<Record<string, string>>({});

    useEffect(() => {
        setProgress(readProgress());
    }, []);

    const counts = {
        all: library.length,
        manga: library.filter(s => s.type === 'manga').length,
        novel: library.filter(s => s.type === 'novel').length,
    };

    const readIndexOf = (series: SeriesMeta) => {
        const id = progress[series.id];
        return id ? series.chapters.findIndex(c => c.id === id) : -1;
    };

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        const list = library
            .filter(s => filter === 'all' || s.type === filter)
            .filter(s => !q || s.title.toLowerCase().includes(q));

        return [...list].sort((a, b) => {
            if (sort === 'chapters') return b.chapters.length - a.chapters.length;
            if (sort === 'progress') {
                const pa = progress[a.id] ? 1 : 0;
                const pb = progress[b.id] ? 1 : 0;
                if (pa !== pb) return pb - pa;
            }
            return a.title.localeCompare(b.title);
        });
    }, [library, filter, query, sort, progress]);

    const filters: { value: Filter; label: string; icon: typeof LayoutGrid }[] = [
        { value: 'all', label: 'All', icon: LayoutGrid },
        { value: 'manga', label: 'Manga', icon: BookImage },
        { value: 'novel', label: 'Novel', icon: BookText },
    ];

    return (
        <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <ToggleGroup
                    value={[filter]}
                    onValueChange={value => value[0] && setFilter(value[0] as Filter)}
                    variant="outline"
                    size="lg"
                    spacing={0}
                    className="w-full sm:w-fit"
                >
                    {filters.map(({ value, label, icon: Icon }) => (
                        <ToggleGroupItem key={value} value={value} aria-label={label} className="flex-1 gap-2 px-3 sm:flex-none aria-pressed:bg-primary/15 aria-pressed:text-foreground">
                            <Icon />
                            {label}
                            <span className="text-xs text-muted-foreground tabular-nums">{counts[value]}</span>
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>

                <div className="flex items-center gap-2">
                    <InputGroup className="h-9 flex-1 lg:w-64 lg:flex-none">
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupInput
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Filter by title..."
                            aria-label="Filter by title"
                        />
                        {query && (
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton size="icon-xs" aria-label="Clear" onClick={() => setQuery('')}>
                                    <X />
                                </InputGroupButton>
                            </InputGroupAddon>
                        )}
                    </InputGroup>

                    <Select items={SORT_ITEMS} value={sort} onValueChange={v => v && setSort(v as Sort)}>
                        <SelectTrigger className="h-9! w-auto gap-2" aria-label="Sort">
                            <ArrowDownAZ className="text-muted-foreground" />
                            <SelectValue className="hidden sm:flex" />
                        </SelectTrigger>
                        <SelectContent align="end" alignItemWithTrigger={false}>
                            {SORT_ITEMS.map(item => (
                                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {visible.length === 0 ? (
                <Empty className="border py-16">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Inbox />
                        </EmptyMedia>
                        <EmptyTitle>{library.length === 0 ? 'Your library is empty' : 'Nothing matches'}</EmptyTitle>
                        <EmptyDescription>
                            {library.length === 0
                                ? <>Add series folders under <code className="font-mono text-xs">contents/manga</code> or <code className="font-mono text-xs">contents/novel</code>.</>
                                : 'Try another title or switch the filter.'}
                        </EmptyDescription>
                    </EmptyHeader>
                    {library.length > 0 && (
                        <EmptyContent>
                            <Button variant="outline" onClick={() => { setQuery(''); setFilter('all'); }}>
                                Reset filters
                            </Button>
                        </EmptyContent>
                    )}
                </Empty>
            ) : (
                <ul className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {visible.map(series => (
                        <li key={`${series.type}-${series.id}`}>
                            <SeriesCard series={series} readIndex={readIndexOf(series)} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
