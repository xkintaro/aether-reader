import { getSeriesDetails } from "@/core/services/contentService";

import ChapterList from "@/components/ui/ChapterList";

import Link from "next/link";

import { notFound } from "next/navigation";

import { ContentType } from "@/core/types";

import { ChevronRight, Home } from "lucide-react";

export default async function UniversalSeriesPage({
    params,
}: {
    params: Promise<{ type: string; series: string }>;
}) {
    const { type, series } = await params;

    if (type !== 'manga' && type !== 'novel') {
        notFound();
    }

    const contentType = type as ContentType;
    const data = await getSeriesDetails(contentType, series);

    const isManga = contentType === 'manga';
    const typeLabel = isManga ? 'Manga' : 'Novel';

    return (
        <main className="global-container">

            <nav className="py-8 overflow-x-auto">

                <ol className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground uppercase">

                    <li>
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 shrink-0 hover:text-primary transition-colors duration-300"
                        >

                            <Home className="w-4 h-4" />

                            <span>
                                Home
                            </span>

                        </Link>
                    </li>

                    <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />

                    <li className="text-foreground truncate max-w-[150px] sm:max-w-[300px] shrink-0" aria-current="page">
                        {data.title}
                    </li>

                </ol>

            </nav>

            <header className="flex flex-col gap-4 mb-6">

                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">

                    <span className="w-fit flex items-center px-3 py-1.5 rounded-lg bg-card border border-border">
                        {typeLabel}
                    </span>

                    <span className="w-fit flex items-center px-3 py-1.5 rounded-lg bg-card border border-border">
                        {data.chapters.length} Chapters
                    </span>

                </div>

                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground leading-tight">
                    {data.title}
                </h1>

            </header>

            <ChapterList type={contentType} seriesId={data.id} chapters={data.chapters} />

        </main>
    );
}