import Link from 'next/link';
import { Home } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';

export default function NotFound() {
    return (
        <main className="flex flex-1 items-center justify-center p-6">
            <Empty>
                <EmptyHeader>
                    <p className="font-mono text-6xl font-semibold tracking-tighter text-primary">404</p>
                    <EmptyTitle>Page not found</EmptyTitle>
                    <EmptyDescription>
                        The series or chapter you&apos;re looking for doesn&apos;t exist or was moved.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button size="lg" nativeButton={false} render={<Link href="/" />}>
                        <Home />
                        Back to library
                    </Button>
                </EmptyContent>
            </Empty>
        </main>
    );
}
