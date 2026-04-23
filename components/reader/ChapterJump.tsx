'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ChapterJumpProps {
    type: 'manga' | 'novel';
    seriesId: string;
}

export default function ChapterJump({ type, seriesId }: ChapterJumpProps) {
    const [target, setTarget] = useState('');
    const router = useRouter();

    const handleJump = (e: React.FormEvent) => {
        e.preventDefault();
        if (!target.trim()) return;

        const jumpSlug = target.toLowerCase().replace(/\s+/g, '-');

        const finalSlug = jumpSlug.includes('chapter') ? jumpSlug : `chapter-${jumpSlug}`;

        router.push(`/${type}/${seriesId}/${finalSlug}`);
    };

    return (
        <form onSubmit={handleJump}>
            <input
                type="text"
                placeholder="Chapter Number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            />

            <button type="submit">
                Go
            </button>

        </form>
    );
}