'use client';

import { Search } from 'lucide-react';

export default function SearchButton() {
    const triggerSearch = () => {
        window.dispatchEvent(new Event('open-search'));
    };

    return (
        <button
            onClick={triggerSearch}
            className="h-10 w-10 sm:w-fit sm:px-4 sm:gap-2 flex items-center justify-center bg-card hover:bg-muted/50 border border-border rounded-xl transition-all duration-300 group cursor-pointer active:scale-95"
        >

            <Search className="size-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />

            <span className="max-sm:hidden text-sm font-medium text-foreground">
                Search
            </span>

            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
            </kbd>

        </button>
    );
}
