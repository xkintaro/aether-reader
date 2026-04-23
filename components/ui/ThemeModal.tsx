'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor, Palette, X } from 'lucide-react';

export default function ThemeModal() {
    const { theme: activeTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        const handleCustomOpen = () => setIsOpen(true);

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        window.addEventListener('open-theme-switcher', handleCustomOpen);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-theme-switcher', handleCustomOpen);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted) return null;

    const baseThemes = [
        {
            id: 'system',
            label: 'System',
            icon: Monitor,
            color: 'text-indigo-400',
            bg: 'bg-indigo-400/10'
        },
        {
            id: 'dark',
            label: 'Dark',
            icon: Moon,
            color: 'text-indigo-400',
            bg: 'bg-indigo-400/10'
        },
        {
            id: 'light',
            label: 'Light',
            icon: Sun,
            color: 'text-indigo-400',
            bg: 'bg-indigo-400/10'
        },
    ];

    const colorThemes = [
        { id: 'ruby', label: 'Ruby', color: 'text-red-500', bg: 'bg-red-500/10' },
        { id: 'sapphire', label: 'Sapphire', color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { id: 'amethyst', label: 'Amethyst', color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { id: 'emerald', label: 'Emerald', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { id: 'amber', label: 'Amber', color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { id: 'rose', label: 'Rose', color: 'text-pink-500', bg: 'bg-pink-500/10' },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-start justify-center p-4 sm:p-6 sm:pt-[15vh]">

            <div
                className="fixed inset-0 bg-background/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
                onClick={() => setIsOpen(false)}
            />

            <div className="relative w-full max-w-lg bg-card border border-border shadow-2xl rounded-3xl overflow-hidden animate-in zoom-in-95 duration-200">

                <div className="flex items-center justify-between p-6 border-b border-border">

                    <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                        <Palette className="w-6 h-6 text-accent" />
                        Theme
                    </h2>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-muted cursor-pointer rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>

                </div>

                <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">

                    <div className="p-6">

                        <div className="grid grid-cols-3 gap-3">

                            {baseThemes.map((option) => {

                                const Icon = option.icon;
                                const isActive = activeTheme === option.id;

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => setTheme(option.id)}
                                        className={`
                                            flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 group cursor-pointer
                                            ${isActive ? 'border-accent bg-accent/5' : 'border-border hover:bg-muted/50'}
                                        `}
                                    >

                                        <div className={`
                                            p-2.5 rounded-xl transition-colors
                                            ${isActive ? option.bg : 'bg-muted'}
                                            ${isActive ? option.color : 'text-muted-foreground'}
                                        `}>

                                            <Icon className="w-6 h-6" />

                                        </div>

                                        <span className={`text-xs font-bold ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                            {option.label}
                                        </span>
                                    </button>

                                );
                            })}
                        </div>
                    </div>

                    <div className="px-6 h-px bg-border/50 mx-6" />

                    <div className="p-6">

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                            {colorThemes.map((option) => {

                                const isActive = activeTheme === option.id;

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => setTheme(option.id)}
                                        className={`
                                            flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 group cursor-pointer
                                            ${isActive ? 'border-accent bg-accent/5 ring-1 ring-accent/20' : 'hover:bg-muted/50'}
                                        `}
                                    >

                                        <Palette className={`w-6 h-6 opacity-80 ${option.color}`} />

                                        <span className={`text-xs font-bold tracking-tight ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            {option.label}
                                        </span>

                                    </button>

                                );

                            })}

                        </div>

                    </div>

                </div>

            </div>

        </div>


    );

}
