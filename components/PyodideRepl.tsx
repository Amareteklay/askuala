"use client";

import { useRef, useState } from "react";

// ADR-002: Pyodide is ~10MB — only fetched when a lesson page actually
// mounts this component, and only once the user runs code. Loaded from
// the CDN at runtime rather than bundled, since the npm package targets
// Node and pulls in node:fs/node:crypto that webpack can't bundle for the browser.
const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";

type PyodideInterface = {
  runPython: (code: string) => unknown;
  loadPackage: (packages: string | string[]) => Promise<unknown>;
};

declare global {
  interface Window {
    loadPyodide?: () => Promise<PyodideInterface>;
  }
}

let pyodideScriptPromise: Promise<void> | null = null;

function loadPyodideScript(): Promise<void> {
  if (window.loadPyodide) return Promise.resolve();
  if (pyodideScriptPromise) return pyodideScriptPromise;
  pyodideScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = PYODIDE_CDN;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Pyodide"));
    document.body.appendChild(script);
  });
  return pyodideScriptPromise;
}

export default function PyodideRepl({
  initialCode = "",
  packages = [],
}: {
  initialCode?: string;
  /** Extra Pyodide packages (e.g. "pandas") to load before running. */
  packages?: string[];
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "running">("idle");
  const pyodideRef = useRef<PyodideInterface | null>(null);

  async function ensurePyodide() {
    if (pyodideRef.current) return pyodideRef.current;
    setStatus("loading");
    await loadPyodideScript();
    const pyodide = await window.loadPyodide!();
    if (packages.length > 0) {
      await pyodide.loadPackage(packages);
    }
    pyodideRef.current = pyodide;
    setStatus("ready");
    return pyodide;
  }

  async function runCode() {
    const pyodide = await ensurePyodide();
    setStatus("running");
    try {
      let captured = "";
      pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = sys.stdout
`);
      pyodide.runPython(code);
      captured = String(pyodide.runPython("sys.stdout.getvalue()"));
      setOutput(captured);
    } catch (err) {
      setOutput(String(err));
    } finally {
      setStatus("ready");
    }
  }

  return (
    <div className="my-6 rounded-lg border border-neutral-200 bg-neutral-50">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2">
        <span className="text-sm font-medium text-neutral-500">Python</span>
        <button
          onClick={runCode}
          disabled={status === "loading" || status === "running"}
          className="rounded bg-neutral-900 px-3 py-1 text-sm text-white disabled:opacity-50"
        >
          {status === "loading" ? "Loading Python…" : status === "running" ? "Running…" : "Run"}
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        rows={6}
        className="w-full resize-none bg-transparent p-4 font-mono text-sm text-neutral-900 outline-none"
      />
      {output && (
        <pre className="border-t border-neutral-200 bg-white p-4 text-sm whitespace-pre-wrap text-neutral-900">
          {output}
        </pre>
      )}
    </div>
  );
}
