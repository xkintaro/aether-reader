'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { ChapterMeta, ContentType, NavigationMeta } from '@/core/types';
import { cn } from 'cn';
import ThemeToggle from '@/components/layout/ThemeToggle';
import ReaderSettings from '@/components/reader/ReaderSettings';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatChapterTitle } from '@/lib/format';

interface ReaderHeaderProps {
    type: ContentType;
    seriesId: string;
    seriesTitle: string;
    chapterId: string;
    chapters: ChapterMeta[];
    prev: NavigationMeta | null;
    next: NavigationMeta | null;
}


export default function ReaderHeader({ type, seriesId, seriesTitle, chapterId, chapters, prev, next }: ReaderHeaderProps) {
    const router = useRouter();
    const [hidden, setHidden] = useState(false);
    const [progress, setProgress] = useState(0);

    const base = `/${type}/${seriesId}`;
    const currentIndex = chapters.findIndex(c => c.id === chapterId);
    const current = currentIndex >= 0 ? chapters[currentIndex] : null;
    const chapterItems = chapters.map(c => ({ label: formatChapterTitle(c.title), value: c.id }));

    // Aşağı kaydırırken gizlen, yukarı kaydırırken göster + okuma ilerlemesi
    useEffect(() => {
        let lastY = window.scrollY;
        let ticking = false;

        const update = () => {
            const y = window.scrollY;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);

            if (Math.abs(y - lastY) > 8) {
                setHidden(y > lastY && y > 120);
                lastY = y;
            }
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [chapterId]);

    // Klavye: ← / → bölümler arası geçiş
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            if (target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return;
            if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
            if (document.querySelector('[role="listbox"], [role="menu"], [role="dialog"]')) return;

            if (e.key === 'ArrowLeft' && prev) router.push(`${base}/${prev.id}`);
            if (e.key === 'ArrowRight' && next) router.push(`${base}/${next.id}`);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [base, prev, next, router]);

    return (
        <header
            className={cn(
                'sticky top-0 z-40 w-full border-b bg-background/85 backdrop-blur-xl transition-transform duration-300',
                hidden && '-translate-y-full',
            )}
        >
            <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-2 px-3 sm:gap-3 sm:px-4">
                <Tooltip>
                    <TooltipTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon-lg"
                                aria-label="Back to series"
                                nativeButton={false}
                                render={<Link href={base} />}
                            />
                        }
                    >
                        <ArrowLeft />
                    </TooltipTrigger>
                    <TooltipContent>Back to series</TooltipContent>
                </Tooltip>

                <div className="min-w-0 flex-1">
                    <Link href={base} className="block truncate font-heading text-sm leading-tight font-medium hover:text-primary">
                        {seriesTitle}
                    </Link>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                        {current ? `${currentIndex + 1}/${chapters.length} · ${formatChapterTitle(current.title)}` : formatChapterTitle(chapterId)}
                    </p>
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5">
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon-lg"
                                    disabled={!prev}
                                    aria-label="Previous chapter"
                                    onClick={() => prev && router.push(`${base}/${prev.id}`)}
                                />
                            }
                        >
                            <ChevronLeft />
                        </TooltipTrigger>
                        <TooltipContent>Previous chapter (←)</TooltipContent>
                    </Tooltip>

                    <Select
                        items={chapterItems}
                        value={chapterId}
                        onValueChange={id => id && id !== chapterId && router.push(`${base}/${id}`)}
                    >
                        <SelectTrigger className="hidden h-9! w-56 sm:flex" aria-label="Jump to chapter">
                            <SelectValue className="min-w-0 truncate" />
                        </SelectTrigger>
                        <SelectContent className="max-h-80">
                            {chapterItems.map(item => (
                                <SelectItem key={item.value} value={item.value} >
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon-lg"
                                    disabled={!next}
                                    aria-label="Next chapter"
                                    onClick={() => next && router.push(`${base}/${next.id}`)}
                                />
                            }
                        >
                            <ChevronRight />
                        </TooltipTrigger>
                        <TooltipContent>Next chapter (→)</TooltipContent>
                    </Tooltip>

                    <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

                    {type === 'novel' && <ReaderSettings />}
                    <ThemeToggle />
                </div>
            </div>

            <div className="absolute inset-x-0 -bottom-px h-0.5">
                <div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
            </div>
        </header>
    );
}
