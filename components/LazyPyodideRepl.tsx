"use client";

import dynamic from "next/dynamic";

const PyodideRepl = dynamic(() => import("./PyodideRepl"), {
  ssr: false,
  loading: () => (
    <div className="my-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-500">
      Loading editor…
    </div>
  ),
});

export default PyodideRepl;
