'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const isDark = !mounted || resolvedTheme !== 'light';
    const label = isDark ? 'Light theme' : 'Dark theme';

    return (
        <Tooltip>
            <TooltipTrigger
                render={
                    <Button
                        variant="outline"
                        size="icon-lg"
                        aria-label={label}
                        onClick={() => setTheme(isDark ? 'light' : 'dark')}
                    />
                }
            >
                {isDark ? <Sun /> : <Moon />}
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    );
}
