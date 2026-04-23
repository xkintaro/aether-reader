'use client';

import { useState, useEffect, useRef } from 'react';

import Link from 'next/link';

import { Search, X, CornerDownLeft, Loader2, ArrowUpDown, BookImage, BookText } from 'lucide-react';

import { searchContent, SearchResult } from '@/core/actions/search';

export default function SearchModal() {

    const [isOpen, setIsOpen] = useState(false);

    const [query, setQuery] = useState('');

    const [results, setResults] = useState<SearchResult[]>([]);

    const [isSearching, setIsSearching] = useState(false);

    const [activeIndex, setActiveIndex] = useState(-1);


    const inputRef = useRef<HTMLInputElement>(null);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {

            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }

            if (e.key === 'Escape') {
                setIsOpen(false);
            }

            if (isOpen && results.length > 0) {

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));

                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));

                } else if (e.key === 'Enter' && activeIndex >= 0) {
                    const selected = results[activeIndex];
                    window.location.href = `/${selected.type}/${selected.id}`;
                    setIsOpen(false);
                }

            }
        };

        const handleCustomOpen = () => setIsOpen(true);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open-search', handleCustomOpen);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-search', handleCustomOpen);
        };
    }, [isOpen, results, activeIndex]);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim().length >= 2) {
                setIsSearching(true);
                const res = await searchContent(query);
                setResults(res);
                setIsSearching(false);
                setActiveIndex(-1);
            } else {
                setResults([]);
            }
        };

        const timeoutId = setTimeout(fetchResults, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-9999 flex items-start justify-center p-4 sm:p-6 sm:pt-[15vh]"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="fixed inset-0 bg-background/60 backdrop-blur-md transition-opacity duration-300"
                onClick={() => setIsOpen(false)}
            />

            <div
                ref={modalRef}
                className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
            >
                <div className="flex items-center px-4 py-4 border-b border-border">

                    <Search className="w-5 h-5 text-muted-foreground mr-3" />

                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search, Manga or Novel..."
                        className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <div className="flex items-center gap-2">

                        {isSearching ? (
                            <Loader2 className="w-5 h-5 animate-spin text-accent" />
                        ) : query && (
                            <button
                                onClick={() => setQuery('')}
                                className="p-1 hover:bg-muted cursor-pointer rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                        )}

                        <kbd className="hidden sm:flex h-7 items-center gap-1 rounded border border-border bg-card px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
                            ESC
                        </kbd>

                    </div>

                </div>

                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
                    {query.length < 2 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">

                            <Search className="w-12 h-12 text-muted-foreground mb-4" />

                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                Ready to Explore?
                            </h3>

                            <p className="text-muted-foreground max-w-[320px]">
                                Just search to find your favorite series.
                            </p>

                        </div>
                    ) : results.length > 0 ? (

                        <ul className="space-y-1">

                            {results.map((item, index) => (

                                <li key={item.id}>

                                    <Link
                                        href={`/${item.type}/${item.id}`}
                                        onClick={() => setIsOpen(false)}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        className={`
                                            flex items-center gap-4 p-3 rounded-xl transition-all duration-300
                                            ${activeIndex === index ? 'bg-accent/10' : ''}
                                        `}
                                    >
                                        <div className={`
                                            w-10 h-10 rounded-lg flex items-center justify-center
                                            ${item.type === 'manga' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500'}
                                        `}>

                                            {item.type === 'manga' ? <BookImage className="w-5 h-5" /> : <BookText className="w-5 h-5" />}

                                        </div>

                                        <div className="flex-1 min-w-0">

                                            <h4 className="font-medium text-foreground truncate">
                                                {item.title}
                                            </h4>

                                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                                {item.type === 'manga' ? 'Manga' : 'Novel'}
                                            </p>

                                        </div>

                                        {activeIndex === index && (
                                            <CornerDownLeft className="w-4 h-4 text-accent" />
                                        )}

                                    </Link>

                                </li>

                            ))}

                        </ul>

                    ) : !isSearching && (

                        <div className="flex flex-col items-center justify-center py-12 text-center">

                            <p className="text-muted-foreground">
                                No results found. Try another keyword.
                            </p>

                        </div>

                    )}

                </div>

                <div className="max-sm:hidden px-4 py-4 bg-card border-t border-border flex items-center justify-between text-sm text-muted-foreground">

                    <div className="flex gap-4">

                        <span className="flex items-center gap-1">

                            <kbd className="py-1 px-2 border border-border rounded bg-card flex items-center">
                                <CornerDownLeft className="w-4 h-4" />
                            </kbd>

                            Select
                        </span>

                        <span className="flex items-center gap-1">

                            <kbd className="py-1 px-2 border border-border rounded bg-card flex items-center">
                                <ArrowUpDown className="w-4 h-4" />
                            </kbd>

                            Navigate
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}
