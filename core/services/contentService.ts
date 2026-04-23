import fs from 'fs/promises';

import path from 'path';

import { MangaChapterData, NovelChapterData, SeriesMeta, ContentType } from '../types';

import { generateSlug } from '../utils/slugify';

const CONTENTS_DIR = path.join(process.cwd(), 'contents');
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

async function resolveRealFolderFromSlug(type: ContentType, slug: string): Promise<string> {
    const typeDir = path.join(CONTENTS_DIR, type);
    const dirs = await fs.readdir(typeDir, { withFileTypes: true });

    for (const d of dirs) {
        if (d.isDirectory() && generateSlug(d.name) === slug) {
            return d.name;
        }
    }
    throw new Error(`[Error] '${slug}' slug's real folder not found.`);
}

export async function getLibrary(): Promise<SeriesMeta[]> {
    const library: SeriesMeta[] = [];
    const types: ContentType[] = ['manga', 'novel'];

    for (const type of types) {
        const typeDir = path.join(CONTENTS_DIR, type);
        try {
            const seriesDirs = await fs.readdir(typeDir, { withFileTypes: true });

            for (const dirent of seriesDirs) {
                if (!dirent.isDirectory()) continue;

                const realFolderName = dirent.name;
                const seriesPath = path.join(typeDir, realFolderName);

                const allItems = await fs.readdir(seriesPath, { withFileTypes: true });

                let chapters = allItems.filter(c =>
                    (type === 'manga' ? c.isDirectory() : (c.isFile() && c.name.endsWith('.txt')))
                    && !c.name.startsWith('.')
                ).sort((a, b) => collator.compare(a.name, b.name));

                const coverFile = allItems.find(item =>
                    item.isFile() && item.name.match(/\.(webp|jpg|jpeg|png)$/i)
                );

                const coverUrl = coverFile
                    ? `/api/media?path=${type}/${encodeURIComponent(realFolderName)}/${encodeURIComponent(coverFile.name)}`
                    : '/default-cover.webp';

                library.push({
                    id: generateSlug(realFolderName),
                    type,
                    title: realFolderName,
                    cover: coverUrl,
                    chapters: chapters.map(c => {
                        const cleanName = type === 'novel' ? c.name.replace('.txt', '') : c.name;
                        return { id: generateSlug(cleanName), title: cleanName };
                    })
                });
            }
        } catch (error) {
            console.warn(`[Error] ${type} folder could not be read.`);
        }
    }
    return library;
}

export async function getMangaChapter(seriesSlug: string, chapterSlug: string): Promise<MangaChapterData> {
    const realSeriesFolder = await resolveRealFolderFromSlug('manga', seriesSlug);
    const seriesDir = path.join(CONTENTS_DIR, 'manga', realSeriesFolder);
    const chapterDirs = await fs.readdir(seriesDir, { withFileTypes: true });

    const validChapters = chapterDirs
        .filter(c => c.isDirectory() && !c.name.startsWith('.'))
        .sort((a, b) => collator.compare(a.name, b.name))
        .map(c => ({
            original: c.name,
            slug: generateSlug(c.name)
        }));

    const currentIndex = validChapters.findIndex(c => c.slug === chapterSlug);

    if (currentIndex === -1) throw new Error("Manga chapter folder not found.");

    const realChapterFolder = validChapters[currentIndex].original;
    const chapterDir = path.join(seriesDir, realChapterFolder);

    try {
        const files = await fs.readdir(chapterDir);
        const images = files
            .filter(file => file.match(/\.(webp|jpg|jpeg|png)$/i))
            .sort(collator.compare)
            .map(file => `/api/media?path=manga/${encodeURIComponent(realSeriesFolder)}/${encodeURIComponent(realChapterFolder)}/${encodeURIComponent(file)}`);

        const prevChapter = currentIndex > 0 ? validChapters[currentIndex - 1] : null;
        const nextChapter = currentIndex < validChapters.length - 1 ? validChapters[currentIndex + 1] : null;

        return {
            seriesId: seriesSlug,
            chapterId: chapterSlug,
            images,
            prev: prevChapter ? { id: prevChapter.slug, title: prevChapter.original } : null,
            next: nextChapter ? { id: nextChapter.slug, title: nextChapter.original } : null
        };
    } catch (error) {
        throw new Error(`Manga could not be read.`);
    }
}

export async function getNovelChapter(seriesSlug: string, chapterSlug: string): Promise<NovelChapterData> {
    const realSeriesFolder = await resolveRealFolderFromSlug('novel', seriesSlug);
    const seriesDir = path.join(CONTENTS_DIR, 'novel', realSeriesFolder);
    const chapterFiles = await fs.readdir(seriesDir, { withFileTypes: true });

    const validChapters = chapterFiles
        .filter(f => f.isFile() && f.name.endsWith('.txt') && !f.name.startsWith('.'))
        .sort((a, b) => collator.compare(a.name, b.name))
        .map(f => {
            const cleanName = f.name.replace('.txt', '');
            return {
                original: cleanName,
                slug: generateSlug(cleanName)
            };
        });

    const currentIndex = validChapters.findIndex(c => c.slug === chapterSlug);

    if (currentIndex === -1) throw new Error("Novel file not found.");

    const realChapterFile = `${validChapters[currentIndex].original}.txt`;
    const filePath = path.join(seriesDir, realChapterFile);

    try {
        const content = await fs.readFile(filePath, 'utf-8');

        const prevChapter = currentIndex > 0 ? validChapters[currentIndex - 1] : null;
        const nextChapter = currentIndex < validChapters.length - 1 ? validChapters[currentIndex + 1] : null;

        return {
            seriesId: seriesSlug,
            chapterId: chapterSlug,
            content,
            prev: prevChapter ? { id: prevChapter.slug, title: prevChapter.original } : null,
            next: nextChapter ? { id: nextChapter.slug, title: nextChapter.original } : null
        };
    } catch (error) {
        throw new Error(`Novel could not be read.`);
    }
}

export async function getSeriesDetails(type: ContentType, seriesSlug: string): Promise<SeriesMeta> {
    const realSeriesFolder = await resolveRealFolderFromSlug(type, seriesSlug);
    const seriesPath = path.join(CONTENTS_DIR, type, realSeriesFolder);

    const items = await fs.readdir(seriesPath, { withFileTypes: true });

    const chapters = items
        .filter(c => (type === 'manga' ? c.isDirectory() : (c.isFile() && c.name.endsWith('.txt'))) && !c.name.startsWith('.'))
        .map(c => c.name)
        .sort(collator.compare)
        .map(name => {
            const cleanName = type === 'novel' ? name.replace('.txt', '') : name;
            return { id: generateSlug(cleanName), title: cleanName };
        });

    const coverFile = items.find(item => item.isFile() && item.name.match(/\.(webp|jpg|jpeg|png)$/i));
    const coverUrl = coverFile
        ? `/api/media?path=${type}/${encodeURIComponent(realSeriesFolder)}/${encodeURIComponent(coverFile.name)}`
        : '/default-cover.webp';

    return {
        id: seriesSlug,
        type,
        title: realSeriesFolder,
        cover: coverUrl,
        chapters
    };
}