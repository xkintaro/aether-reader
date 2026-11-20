'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            themes={['light', 'dark']}
            disableTransitionOnChange
        >
            <NormalizeSavedTheme />
            {children}
        </NextThemesProvider>
    );
}

// Eski sürümden kalan temaları (system, ruby, sapphire...) dark'a taşı.
function NormalizeSavedTheme() {
    const { theme, setTheme } = useTheme();

    React.useEffect(() => {
        if (theme && theme !== 'light' && theme !== 'dark') {
            setTheme('dark');
        }
    }, [theme, setTheme]);

    return null;
}
