import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function SiteFooter() {
    return (
        <footer className="mt-auto border-t">
            <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted-foreground sm:flex-row">
                <Link href="/" className="font-sans text-base leading-none font-bold tracking-tight">
                    <span className="text-foreground">aether</span>
                    <span className="font-medium text-muted-foreground">reader</span>
                    <span className="text-primary">.</span>
                </Link>

                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon-lg"
                        nativeButton={false}
                        render={<Link href="https://github.com/xkintaro/aether-reader" target="_blank" rel="noopener noreferrer" aria-label="GitHub" />}
                    >
                        <svg className="size-4.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.470-1.33-5.470-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.230 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" />
                        </svg>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon-lg"
                        nativeButton={false}
                        render={<Link href="https://discord.gg/NSQk27Zdkv" target="_blank" rel="noopener noreferrer" aria-label="Discord" />}
                    >
                        <svg className="size-4.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="currentColor" d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.45.87-.61 1.25a18.27 18.27 0 0 0-5.49 0 12.64 12.64 0 0 0-.62-1.25.08.08 0 0 0-.08-.04 19.74 19.74 0 0 0-4.88 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.22-2a.08.08 0 0 0-.04-.1 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1 0-.13l.37-.29a.07.07 0 0 1 .08-.01 14.2 14.2 0 0 0 12.06 0 .07.07 0 0 1 .08.01l.37.29a.08.08 0 0 1 0 .13 12.3 12.3 0 0 1-1.88.9.08.08 0 0 0-.04.1c.36.7.77 1.37 1.220 2a.08.08 0 0 0 .09.03 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .03-.06c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03zM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.15-1.09-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42z" />
                        </svg>
                    </Button>
                </div>
            </div>
        </footer>
    );
}
