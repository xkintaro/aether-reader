import Link from 'next/link';

import SearchCommand from '@/components/layout/SearchCommand';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function SiteHeader() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-xl">
            <div className="container-page flex h-16 items-center justify-between gap-4">
                <Link
                    href="/"
                    aria-label="Aether Reader"
                    className="rounded-md font-sans text-xl leading-none font-bold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                    <span className="text-foreground">aether</span>
                    <span className="font-medium text-muted-foreground">reader</span>
                    <span className="text-primary">.</span>
                </Link>

                <div className="flex items-center gap-2">
                    <SearchCommand />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
