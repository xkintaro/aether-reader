import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getMangaChapter, getNovelChapter, getSeriesDetails } from "@/core/services/contentService";
import { ChapterMeta, ContentType, MangaChapterData, NovelChapterData } from "@/core/types";

import MemoryTracker from "@/components/reader/MemoryTracker";
import ReaderHeader from "@/components/reader/ReaderHeader";
import ReaderNav from "@/components/reader/ReaderNav";
import { formatChapterTitle } from "@/lib/format";

type Params = Promise<{ type: string; series: string; chapter: string }>;


export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { type, series, chapter } = await params;
  if (type !== 'manga' && type !== 'novel') return {};
  try {
    const data = await getSeriesDetails(type, series);
    const ch = data.chapters.find(c => c.id === chapter);
    return { title: `${formatChapterTitle(ch?.title ?? chapter)} · ${data.title}` };
  } catch {
    return {};
  }
}

export default async function UniversalReaderPage({ params }: { params: Params }) {
  const { type, series, chapter } = await params;

  if (type !== 'manga' && type !== 'novel') notFound();
  const contentType = type as ContentType;

  let data: MangaChapterData | NovelChapterData;
  let seriesTitle: string;
  let chapters: ChapterMeta[];

  try {
    const [chapterData, seriesData] = await Promise.all([
      contentType === 'manga' ? getMangaChapter(series, chapter) : getNovelChapter(series, chapter),
      getSeriesDetails(contentType, series),
    ]);
    data = chapterData;
    seriesTitle = seriesData.title;
    chapters = seriesData.chapters;
  } catch {
    notFound();
  }

  const currentTitle = chapters.find(c => c.id === chapter)?.title ?? chapter;

  return (
    <>
      <MemoryTracker type={contentType} seriesId={series} chapterId={chapter} />

      <ReaderHeader
        type={contentType}
        seriesId={series}
        seriesTitle={seriesTitle}
        chapterId={chapter}
        chapters={chapters}
        prev={data.prev}
        next={data.next}
      />

      <main className="flex-1">
        {'content' in data ? (
          <article className="mx-auto w-full max-w-[68ch] px-5 py-10 sm:py-14">
            <header className="mb-10 border-b pb-6 text-center">
              <p className="font-mono text-xs tracking-widest text-primary-ink uppercase">{seriesTitle}</p>
              <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{formatChapterTitle(currentTitle)}</h1>
            </header>

            <div
              className="text-[length:var(--reader-font-size,19px)] leading-[1.85] whitespace-pre-wrap text-foreground/90 [font-family:var(--reader-font-family,var(--font-geist-sans))]"
            >
              {data.content}
            </div>
          </article>
        ) : (
          <article className="mx-auto flex w-full max-w-3xl flex-col items-center">
            {data.images.length === 0 && (
              <p className="py-24 text-center text-muted-foreground">This chapter has no pages.</p>
            )}
            {data.images.map((src, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={`Page ${index + 1}`}
                loading={index < 2 ? 'eager' : 'lazy'}
                className="block h-auto w-full max-w-full bg-muted object-contain"
              />
            ))}
          </article>
        )}

        <div className="mx-auto w-full max-w-3xl px-4 py-10">
          <ReaderNav type={contentType} seriesId={series} prev={data.prev} next={data.next} />
        </div>
      </main>
    </>
  );
}
