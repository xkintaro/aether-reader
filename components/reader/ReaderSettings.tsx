'use client';

import { useEffect, useState } from 'react';
import { Minus, Plus, Type } from 'lucide-react';

import { READER_FONT_KEY } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type FontFamily = 'sans' | 'mono';

interface ReaderPrefs {
    size: number;
    family: FontFamily;
}

const DEFAULT_PREFS: ReaderPrefs = { size: 19, family: 'sans' };
const MIN_SIZE = 14;
const MAX_SIZE = 30;

function applyPrefs(prefs: ReaderPrefs) {
    const root = document.documentElement;
    root.style.setProperty('--reader-font-size', `${prefs.size}px`);
    root.style.setProperty(
        '--reader-font-family',
        prefs.family === 'mono' ? 'var(--font-jetbrains-mono)' : 'var(--font-geist-sans)',
    );
}

export default function ReaderSettings() {
    const [prefs, setPrefs] = useState<ReaderPrefs>(DEFAULT_PREFS);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(READER_FONT_KEY) || 'null');
            if (stored && typeof stored.size === 'number') {
                setPrefs({
                    size: stored.size,
                    family: stored.family === 'mono' ? 'mono' : 'sans',
                });
            }
        } catch {
            /* ignore */
        }
    }, []);

    useEffect(() => {
        applyPrefs(prefs);
        try {
            localStorage.setItem(READER_FONT_KEY, JSON.stringify(prefs));
        } catch {
            /* ignore */
        }
    }, [prefs]);

    const setSize = (delta: number) =>
        setPrefs(p => ({ ...p, size: Math.min(MAX_SIZE, Math.max(MIN_SIZE, p.size + delta)) }));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon-lg" aria-label="Reading settings" />}>
                <Type />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Text size</DropdownMenuLabel>
                    <div className="flex items-center justify-between gap-2 px-1.5 pt-1 pb-2">
                        <Button variant="outline" size="icon" onClick={() => setSize(-1)} disabled={prefs.size <= MIN_SIZE} aria-label="Smaller text">
                            <Minus />
                        </Button>
                        <span className="font-mono text-sm tabular-nums">{prefs.size}px</span>
                        <Button variant="outline" size="icon" onClick={() => setSize(1)} disabled={prefs.size >= MAX_SIZE} aria-label="Larger text">
                            <Plus />
                        </Button>
                    </div>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuLabel>Typeface</DropdownMenuLabel>
                    <div className="px-1.5 pt-1 pb-1">
                        <ToggleGroup
                            value={[prefs.family]}
                            onValueChange={v => v[0] && setPrefs(p => ({ ...p, family: v[0] as FontFamily }))}
                            variant="outline"
                            spacing={0}
                            className="w-full"
                        >
                            <ToggleGroupItem value="sans" className="flex-1 font-sans aria-pressed:bg-primary/15">Geist</ToggleGroupItem>
                            <ToggleGroupItem value="mono" className="flex-1 font-mono aria-pressed:bg-primary/15">Mono</ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
