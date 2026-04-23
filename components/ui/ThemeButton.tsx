'use client';

import { Palette } from 'lucide-react';

export default function ThemeButton() {
    const triggerThemeSwitcher = () => {
        window.dispatchEvent(new Event('open-theme-switcher'));
    };

    return (
        <button
            onClick={triggerThemeSwitcher}
            className="h-10 w-10 flex items-center justify-center bg-card hover:bg-muted/50 border border-border rounded-xl transition-all duration-300 group cursor-pointer active:scale-95"
        >

            <Palette className="size-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />

        </button>
    );
}
