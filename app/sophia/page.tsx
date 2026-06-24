import CountingGame from "@/components/CountingGame";
import ColoringPad from "@/components/ColoringPad";

export default function SophiaHome() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-wide text-neutral-400">
        Summer 2026
      </p>
      <h1 className="mt-2 text-4xl font-bold text-rose-600">
        Hi, Sophia! 🌸
      </h1>
      <p className="mt-3 text-neutral-500">
        This corner is just for you. Play, count, and color.
      </p>

      <div className="mt-10 space-y-8">
        <CountingGame />
        <ColoringPad />
      </div>

      <p className="mt-10 text-sm text-neutral-400">
        More games are coming soon — Baba&apos;s adding new ones all summer.
      </p>
    </main>
  );
}
