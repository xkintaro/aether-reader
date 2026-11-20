import { Skeleton } from '@/components/ui/skeleton';

export default function GlobalLoading() {
    return (
        <>
            <div className="h-16 w-full border-b" />

            <main className="container-page flex flex-col gap-10 py-8 sm:py-10" aria-busy="true" aria-label="Loading">
                <div className="flex flex-col gap-3">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-4 w-72" />
                </div>

                <Skeleton className="h-36 w-full rounded-xl" />

                <div className="flex flex-col gap-5">
                    <Skeleton className="h-9 w-48" />
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-2.5">
                                <Skeleton className="aspect-[2/3] w-full rounded-xl" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
