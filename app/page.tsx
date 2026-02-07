export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-16">
        <header className="flex flex-col gap-6">
          <p className="text-sm uppercase tracking-[0.35em] text-white/60">
            simple responsive page
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Build fast, look sharp, and stay focused.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            A clean black canvas with a responsive layout that adapts smoothly
            across mobile, tablet, and desktop screens.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
              Get started
            </button>
            <button className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60">
              Learn more
            </button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">Responsive layout</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Uses flexible spacing, grid, and typography scales to keep the
              experience consistent on every screen size.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">Modern look</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Subtle cards and layered contrast keep the UI sharp without
              distracting from the message.
            </p>
          </article>
        </section>

        <footer className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center">
          <span>© 2026 Minimal Black UI</span>
          <div className="flex gap-4">
            <a className="transition hover:text-white" href="#">
              Privacy
            </a>
            <a className="transition hover:text-white" href="#">
              Terms
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
