import { getLibrary } from "@/core/services/contentService";

import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import LibraryGrid from "@/components/library/LibraryGrid";
import ResumeCard from "@/components/library/ResumeCard";

export default async function LibraryPage() {
  const library = await getLibrary();
  const chapterTotal = library.reduce((sum, s) => sum + s.chapters.length, 0);

  return (
    <>
      <SiteHeader />

      <main className="container-page flex flex-col gap-12 py-10 sm:py-14">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs text-muted-foreground">
              {library.length} series · {chapterTotal} chapters
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">Your library</h1>
            <p className="max-w-xl text-muted-foreground">
              Continue where you left off or discover something new to read.
            </p>
          </div>

          <ResumeCard />
        </section>

        <LibraryGrid library={library} />
      </main>

      <SiteFooter />
    </>
  );
}
