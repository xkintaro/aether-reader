import Link from 'next/link';

export default function NotFound() {
    return (

        <main>

            <h1>404</h1>

            <Link
                href="/"
            >
                Home
            </Link>

        </main>

    );
}