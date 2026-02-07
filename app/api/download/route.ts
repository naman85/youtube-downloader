import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

const downloadDir = path.join(process.cwd(), 'public', 'downloads');

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\//;
    if (!youtubeRegex.test(url)) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    // Create downloads directory if it doesn't exist
    if (!existsSync(downloadDir)) {
      mkdirSync(downloadDir, { recursive: true });
    }

    // Download video using yt-dlp (if available) or youtube-dl
    const outputPath = path.join(downloadDir, '%(title)s.%(ext)s');
    
    try {
      // Try using yt-dlp first (better, more maintained)
      execSync(`yt-dlp -f best -o "${outputPath}" "${url}"`, {
        stdio: 'pipe',
        timeout: 300000, // 5 minutes timeout
      });
    } catch {
      // Fallback to youtube-dl
      try {
        execSync(`youtube-dl -f best -o "${outputPath}" "${url}"`, {
          stdio: 'pipe',
          timeout: 300000,
        });
      } catch (error) {
        return NextResponse.json(
          { error: 'Failed to download. Make sure yt-dlp or youtube-dl is installed.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      message: 'Download started successfully',
      downloadDir: '/downloads',
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Download failed', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return list of downloaded files
    const fs = require('fs').promises;
    
    if (!existsSync(downloadDir)) {
      return NextResponse.json({ files: [] });
    }

    const files = await fs.readdir(downloadDir);
    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500 }
    );
  }
}
