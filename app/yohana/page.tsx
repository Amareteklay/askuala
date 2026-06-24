import Link from "next/link";

export default function YohanaHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-semibold">Welcome back, Yohana</h1>
      <Link
        href="/yohana/python"
        className="mt-6 rounded-md bg-neutral-900 px-4 py-2 text-sm text-white"
      >
        Continue the Python course →
      </Link>
      <p className="mt-3 text-sm text-neutral-500">
        School subjects open up in September.
      </p>
    </main>
  );
}
