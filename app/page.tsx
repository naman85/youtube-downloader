'use client';

import { useState, useRef, useEffect } from 'react';

interface DownloadStatus {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  progress: number;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>({
    status: 'idle',
    message: '',
    progress: 0,
  });
  const [downloadedFiles, setDownloadedFiles] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDownloadedFiles();
  }, []);

  const fetchDownloadedFiles = async () => {
    try {
      const res = await fetch('/api/download');
      const data = await res.json();
      setDownloadedFiles(data.files || []);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setDownloadStatus({
        status: 'error',
        message: 'Please enter a YouTube URL',
        progress: 0,
      });
      return;
    }

    setDownloadStatus({
      status: 'loading',
      message: 'Downloading video...',
      progress: 45,
    });

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setDownloadStatus({
          status: 'error',
          message: data.error || 'Download failed',
          progress: 0,
        });
        return;
      }

      setDownloadStatus({
        status: 'success',
        message: 'Video downloaded successfully!',
        progress: 100,
      });
      setUrl('');
      inputRef.current?.focus();

      // Refresh file list
      setTimeout(fetchDownloadedFiles, 1000);
    } catch (error) {
      setDownloadStatus({
        status: 'error',
        message: 'Connection error. Make sure the server is running.',
        progress: 0,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-2xl flex flex-col gap-12 px-6 py-12 sm:px-8 lg:py-20">
        {/* Header */}
        <header className="flex flex-col gap-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center">
              <span className="text-lg font-bold">▶</span>
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl">YouTube Downloader</h1>
          </div>
          <p className="text-sm text-white/60">
            Download your favorite videos in the best quality
          </p>
        </header>

        {/* Download Form */}
        <form
          onSubmit={handleDownload}
          className="flex flex-col gap-4"
        >
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube URL here..."
              className="w-full rounded-xl border border-white/20 bg-white/5 px-5 py-4 text-white placeholder-white/50 outline-none transition focus:border-red-600/60 focus:bg-white/10"
            />
          </div>

          <button
            type="submit"
            disabled={downloadStatus.status === 'loading'}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed sm:py-4"
          >
            {downloadStatus.status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Downloading...
              </span>
            ) : (
              'Download Video'
            )}
          </button>
        </form>

        {/* Status Message */}
        {downloadStatus.message && (
          <div
            className={`rounded-xl p-4 text-sm sm:p-5 ${
              downloadStatus.status === 'success'
                ? 'bg-green-500/10 border border-green-500/30 text-green-300'
                : downloadStatus.status === 'error'
                ? 'bg-red-500/10 border border-red-500/30 text-red-300'
                : 'bg-blue-500/10 border border-blue-500/30 text-blue-300'
            }`}
          >
            {downloadStatus.message}
          </div>
        )}

        {/* Progress Bar */}
        {downloadStatus.status === 'loading' && (
          <div className="w-full">
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-red-600 transition-all duration-300"
                style={{ width: `${downloadStatus.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Downloaded Files Section */}
        {downloadedFiles.length > 0 && (
          <section className="border-t border-white/10 pt-8">
            <h2 className="mb-4 text-lg font-semibold">Downloaded Videos</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {downloadedFiles.map((file) => (
                <a
                  key={file}
                  href={`/downloads/${encodeURIComponent(file)}`}
                  download
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition hover:bg-white/10 hover:border-white/20"
                >
                  <span className="text-lg">📹</span>
                  <span className="flex-1 truncate text-sm text-white/80">
                    {file}
                  </span>
                  <span className="text-xs text-white/50">⬇</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Info Section */}
        <section className="grid gap-4 sm:grid-cols-2 border-t border-white/10 pt-8">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold mb-2">✨ Features</h3>
            <ul className="space-y-1 text-xs text-white/70">
              <li>• Best quality downloads</li>
              <li>• Fast processing</li>
              <li>• Responsive design</li>
            </ul>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold mb-2">📝 Supported</h3>
            <ul className="space-y-1 text-xs text-white/70">
              <li>• YouTube.com</li>
              <li>• YouTube Shorts</li>
              <li>• Playlists</li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-6 text-center text-xs text-white/50">
          <p>© 2026 YouTube Downloader • For personal use only</p>
        </footer>
      </div>
    </div>
  );
}
