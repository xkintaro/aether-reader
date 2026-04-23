import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENTS_DIR = path.join(process.cwd(), 'contents');

const MIME_TYPES: Record<string, string> = {
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const filePathParam = searchParams.get('path');

    if (!filePathParam) {
        return new NextResponse('Path parameter missing', { status: 400 });
    }

    const requestedPath = path.normalize(path.join(CONTENTS_DIR, filePathParam));
    if (!requestedPath.startsWith(CONTENTS_DIR)) {
        return new NextResponse('Access denied', { status: 403 });
    }

    try {
        const fileBuffer = await fs.promises.readFile(requestedPath);
        const ext = path.extname(requestedPath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400',
            },
        });
    } catch (error) {
        return new NextResponse('File not found', { status: 404 });
    }
}