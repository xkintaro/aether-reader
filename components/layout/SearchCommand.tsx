'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookImage, BookText, Search } from 'lucide-react';

import { searchContent, SearchResult } from '@/core/actions/search';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { Spinner } from '@/components/ui/spinner';

export default function SearchCommand() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            setIsSearching(false);
            return;
        }

        let cancelled = false;
        setIsSearching(true);

        const timeoutId = setTimeout(async () => {
            const res = await searchContent(query);
            if (!cancelled) {
                setResults(res);
                setIsSearching(false);
            }
        }, 300);

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    }, [query]);

    const handleOpenChange = (value: boolean) => {
        setOpen(value);
        if (!value) setQuery('');
    };

    const handleSelect = (item: SearchResult) => {
        handleOpenChange(false);
        router.push(`/${item.type}/${item.id}`);
    };

    const groups = [
        { label: 'Manga', items: results.filter(r => r.type === 'manga') },
        { label: 'Novel', items: results.filter(r => r.type === 'novel') },
    ];

    const hasQuery = query.trim().length >= 2;

    return (
        <>
            <Button
                variant="outline"
                size="lg"
                onClick={() => setOpen(true)}
                aria-label="Search"
                className="w-9 justify-center px-0 text-muted-foreground sm:w-64 sm:justify-start sm:px-3"
            >
                <Search />
                <span className="hidden flex-1 text-left font-sans font-normal sm:inline">Search the library...</span>
                <KbdGroup className="hidden sm:inline-flex">
                    <Kbd>Ctrl</Kbd>
                    <Kbd>K</Kbd>
                </KbdGroup>
            </Button>

            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent
                    showCloseButton={false}
                    className="top-[14vh] translate-y-0 overflow-hidden rounded-xl! p-0 sm:max-w-xl"
                >
                    <DialogTitle className="sr-only">Search</DialogTitle>
                    <DialogDescription className="sr-only">Search manga and novel series</DialogDescription>

                    <Command shouldFilter={false} className="p-1.5">
                        <div className="relative">
                            <CommandInput
                                value={query}
                                onValueChange={setQuery}
                                placeholder="Search manga or novel..."
                            />
                            {isSearching && (
                                <Spinner className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground" />
                            )}
                        </div>

                        <CommandList className="max-h-[60vh] pt-1">
                            {!hasQuery && (
                                <div className="flex flex-col items-center gap-1 px-6 py-10 text-center">
                                    <p className="font-heading text-sm font-medium">Find your next read</p>
                                    <p className="text-xs text-muted-foreground">Type at least 2 characters.</p>
                                </div>
                            )}

                            {hasQuery && !isSearching && (
                                <CommandEmpty className="py-10 text-muted-foreground">
                                    No results for &ldquo;{query}&rdquo;.
                                </CommandEmpty>
                            )}

                            {groups.map(group => group.items.length > 0 && (
                                <CommandGroup key={group.label} heading={group.label}>
                                    {group.items.map(item => (
                                        <CommandItem
                                            key={`${item.type}-${item.id}`}
                                            value={`${item.type}-${item.id}`}
                                            onSelect={() => handleSelect(item)}
                                            className="gap-3"
                                        >
                                            <div className="h-12 w-9 shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-foreground/10">
                                                {item.cover && (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={item.cover} alt="" className="size-full object-cover" />
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium">{item.title}</p>
                                                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    {item.type === 'manga'
                                                        ? <BookImage className="size-3!" />
                                                        : <BookText className="size-3!" />}
                                                    {item.chapterCount} chapters
                                                </p>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
                        </CommandList>

                        <div className="mt-1 hidden items-center gap-4 border-t px-2 pt-2 pb-1 text-xs text-muted-foreground sm:flex">
                            <span className="flex items-center gap-1.5"><Kbd>↵</Kbd> open</span>
                            <span className="flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd> navigate</span>
                            <span className="ml-auto flex items-center gap-1.5"><Kbd>Esc</Kbd> close</span>
                        </div>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    );
}
