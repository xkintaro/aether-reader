import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookImage, BookText, Layers } from "lucide-react";

import { getSeriesDetails } from "@/core/services/contentService";
import { ContentType } from "@/core/types";

import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ChapterList from "@/components/series/ChapterList";
import SeriesActions from "@/components/series/SeriesActions";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Params = Promise<{ type: string; series: string }>;

async function loadSeries(type: string, series: string) {
    if (type !== 'manga' && type !== 'novel') notFound();
    try {
        return await getSeriesDetails(type as ContentType, series);
    } catch {
        notFound();
    }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { type, series } = await params;
    if (type !== 'manga' && type !== 'novel') return {};
    try {
        const data = await getSeriesDetails(type, series);
        return { title: data.title };
    } catch {
        return {};
    }
}

export default async function UniversalSeriesPage({ params }: { params: Params }) {
    const { type, series } = await params;
    const data = await loadSeries(type, series);

    const contentType = data.type;
    const isManga = contentType === 'manga';
    const TypeIcon = isManga ? BookImage : BookText;
    const cover = data.cover || '/default-cover.webp';

    return (
        <>
            <SiteHeader />

            <main className="flex flex-col">
                <section className="border-b">
                    <div className="container-page flex flex-col gap-8 py-8 sm:py-10">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink render={<Link href="/">Library</Link>} />
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="max-w-60 truncate sm:max-w-md">{data.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
                            <div className="w-36 shrink-0 overflow-hidden rounded-lg ring-1 ring-foreground/10 sm:w-44">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={cover} alt={data.title} className="aspect-2/3 size-full object-cover" />
                            </div>

                            <div className="flex min-w-0 flex-col gap-4 pb-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge>
                                        <TypeIcon />
                                        {isManga ? 'manga' : 'novel'}
                                    </Badge>
                                    <Badge variant="outline">
                                        <Layers />
                                        {data.chapters.length} chapters
                                    </Badge>
                                </div>

                                <h1 className="text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                                    {data.title}
                                </h1>

                                <SeriesActions type={contentType} seriesId={data.id} chapters={data.chapters} />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container-page py-10">
                    <ChapterList type={contentType} seriesId={data.id} chapters={data.chapters} />
                </div>
            </main>

            <SiteFooter />
        </>
    );
}
