'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { SeriesMeta } from '@/core/types';

interface SeriesSliderProps {
    items: SeriesMeta[];
}

export default function SeriesSlider({ items }: SeriesSliderProps) {
    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: 'start',
        dragFree: true
    });

    if (items.length === 0) {
        return <p className="text-muted-foreground">No content added yet.</p>;
    }

    return (
        <div className="relative group">

            <div className="overflow-hidden" ref={emblaRef}>

                <div className="flex -ml-5 touch-pan-y">

                    {items.map((series) => {
                        const coverSrc = series.cover;

                        return (

                            <div key={series.id} className="pl-5 min-w-0 shrink-0 grow-0 basis-1/2 sm:basis-1/3">

                                <Link href={`/${series.type}/${series.id}`} className="kintaro-content-box block">

                                    <img
                                        src={coverSrc}
                                        alt={series.title}
                                        className="cover-image"
                                    />

                                    <div className="overlay">

                                        <div className="overlay-blur" />

                                        <img
                                            src={coverSrc}
                                            alt={series.title}
                                            className="overlay-image"
                                        />

                                    </div>

                                    <div className="content">

                                        <p className="primary">
                                            {series.title}
                                        </p>

                                        <span className="secondary">
                                            {series.chapters.length} Chapters
                                        </span>

                                    </div>

                                </Link>

                            </div>
                        );

                    })}

                </div>

            </div>

        </div>

    );
}