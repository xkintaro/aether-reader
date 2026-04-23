'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChapterMeta, ContentType } from '@/core/types';
import { Search, ChevronLeft, ChevronRight, Hash } from 'lucide-react';

interface ChapterListProps {
    type: ContentType;
    seriesId: string;
    chapters: ChapterMeta[];
}

export default function ChapterList({ type, seriesId, chapters }: ChapterListProps) {
    const [perPage, setPerPage] = useState<number>(100);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const isSmallSeries = chapters.length <= 100;

    const filteredChapters = chapters.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredChapters.length / perPage);

    const startIndex = (currentPage - 1) * perPage;
    const paginatedChapters = filteredChapters.slice(startIndex, startIndex + perPage);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col w-full">

            {chapters.length > 10 && (

                <div className="flex items-center gap-2 sm:gap-4 mb-4">

                    <div className="relative flex-1">

                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                        <input
                            type="number"
                            placeholder="Search chapter..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full pl-12 pr-4 py-3 bg-background border border-border text-foreground rounded-xl focus:outline-none focus:ring-1 focus:ring-ring transition-all placeholder:text-muted-foreground"
                        />

                    </div>

                    {!isSmallSeries && (

                        <div className="relative w-fit shrink-0">

                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                            <select
                                value={perPage}
                                onChange={handlePerPage}
                                className="w-full pl-10 pr-10 py-3 bg-background border border-border text-foreground rounded-xl focus:outline-none focus:ring-1 focus:ring-ring transition-all cursor-pointer appearance-none"
                            >
                                <option value={100}>100</option>
                                <option value={250}>250</option>
                                <option value={1000}>1000</option>
                            </select>

                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>

                        </div>

                    )}

                </div>

            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mb-6">

                {paginatedChapters.length === 0 && (

                    <div className="col-span-full py-16 flex flex-col items-center justify-center border border-dashed border-border rounded-2xl text-muted-foreground">

                        <Search className="w-10 h-10 mb-3" />

                        <p className="text-sm font-bold uppercase tracking-widest">
                            Chapter Not Found
                        </p>

                    </div>

                )}

                {paginatedChapters.map(chapter => (

                    <Link
                        key={chapter.id}
                        href={`/${type}/${seriesId}/${chapter.id}`}
                        className="flex items-center justify-center p-3 sm:p-4 bg-background border border-border rounded-xl hover:bg-card hover:-translate-y-0.5 focus:outline-none focus:ring-1 focus:ring-ring transition-all duration-300"
                    >

                        <span className="text-sm font-bold text-foreground truncate">
                            {chapter.title}
                        </span>

                    </Link>

                ))}

            </div>

            {totalPages > 1 && (

                <div className="flex items-center justify-center gap-2">

                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="flex items-center gap-2 p-2.5 sm:px-4 sm:py-2.5 bg-background border border-border rounded-xl text-sm text-foreground hover:bg-card focus:outline-none focus:ring-1 focus:ring-ring transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                    >

                        <ChevronLeft className="w-4 h-4" />

                        <span className="hidden sm:inline">Previous</span>

                    </button>

                    <div className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm font-bold text-muted-foreground uppercase tracking-widest">
                        <span className="text-foreground">{currentPage}</span> / {totalPages}
                    </div>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="flex items-center gap-2 p-2.5 sm:px-4 sm:py-2.5 bg-background border border-border rounded-xl text-sm text-foreground hover:bg-card focus:outline-none focus:ring-1 focus:ring-ring transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                    >

                        <span className="hidden sm:inline">Next</span>

                        <ChevronRight className="w-4 h-4" />

                    </button>

                </div>

            )}

        </div>
    );
}