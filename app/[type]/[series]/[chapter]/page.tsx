import { getMangaChapter, getNovelChapter } from "@/core/services/contentService";

import { notFound } from "next/navigation";

import { ContentType } from "@/core/types";

import MemoryTracker from "@/components/reader/MemoryTracker";

import ReaderNav from "@/components/reader/ReaderNav";

import Link from "next/link";

import { ChevronRight, Home } from "lucide-react";

export default async function UniversalReaderPage({
  params,
}: {
  params: Promise<{ type: string; series: string; chapter: string }>;
}) {
  const { type, series, chapter } = await params;

  if (type !== 'manga' && type !== 'novel') notFound();
  const contentType = type as ContentType;

  let data;
  try {
    if (contentType === 'manga') {
      data = await getMangaChapter(series, chapter);
    } else {
      data = await getNovelChapter(series, chapter);
    }
  } catch (error) {
    notFound();
  }

  const formatTitle = (slug: string) => slug.replace(/-/g, ' ').toUpperCase();

  return (
    <main className="global-container">

      <MemoryTracker type={contentType} seriesId={series} chapterId={chapter} />

      <nav className="py-8 overflow-x-auto sticky top-0 z-50 bg-background">

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

          <li className="hover:text-primary transition-colors duration-300 truncate max-w-[150px] sm:max-w-[300px] shrink-0">

            <Link href={`/${contentType}/${series}`}>

              {formatTitle(series)}

            </Link>

          </li>

          <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />

          <li className="text-foreground truncate max-w-[150px] sm:max-w-[300px] shrink-0" aria-current="page">

            {formatTitle(chapter)}

          </li>

        </ol>

      </nav>

      <article>

        {contentType === 'novel' ? (

          <div className="prose prose-neutral dark:prose-invert max-w-none">

            <div
              className="whitespace-pre-wrap leading-relaxed sm:leading-loose text-lg sm:text-xl text-foreground"
            >

              {/* @ts-ignore - data.content */}
              {data.content}

            </div>

          </div>

        ) : (

          <div className="flex flex-col items-center w-full">

            {/* @ts-ignore - data.images */}
            {data.images.map((src: string, index: number) => (

              <img
                key={index}
                src={src}
                loading="lazy"
                className="w-full h-auto max-w-full object-contain"
              />

            ))}

          </div>

        )}

      </article>

      <div className="mt-8 pt-8 border-t border-border flex items-center justify-center">

        <ReaderNav
          type={contentType}
          seriesId={series}
          prev={data.prev}
          next={data.next}
        />

      </div>

    </main>

  );

}