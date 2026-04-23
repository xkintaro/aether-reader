'use client';

import { useEffect } from 'react';
import Link from 'next/link';

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

        <main>

            <h1>
                Error
            </h1>

            <p>
                {error.message || "Unknown anomaly detected."}
            </p>

            <div>

                <button
                    onClick={() => reset()}
                >
                    Retry
                </button>

                <Link
                    href="/"
                >
                    Home
                </Link>

            </div>

        </main>
    );
}