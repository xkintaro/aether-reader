'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("[Error]:", error);
    }, [error]);

    return (
        <main className="flex flex-1 items-center justify-center p-6">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon" className="bg-destructive/10 text-destructive">
                        <AlertTriangle />
                    </EmptyMedia>
                    <EmptyTitle>Something went wrong</EmptyTitle>
                    <EmptyDescription>{error.message || "Unknown anomaly detected."}</EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex-row justify-center gap-2">
                    <Button size="lg" onClick={() => reset()}>
                        <RotateCcw />
                        Retry
                    </Button>
                    <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/" />}>
                        <Home />
                        Home
                    </Button>
                </EmptyContent>
            </Empty>
        </main>
    );
}
