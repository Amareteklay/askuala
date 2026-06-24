"use client";

import { useRef, useState } from "react";

const COLORS = ["#e0668c", "#e8a33d", "#3d8b82", "#4a7fd6", "#7b5fc4", "#2b2b2b"];

export default function ColoringPad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [color, setColor] = useState(COLORS[0]);

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const point = "touches" in e ? e.touches[0] : e;
    return {
      x: (point.clientX - rect.left) * (canvas.width / rect.width),
      y: (point.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    drawing.current = true;
    draw(e);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = getPos(e);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 9, 0, Math.PI * 2);
    ctx.fill();
  }

  function stopDraw() {
    drawing.current = false;
  }

  function clear() {
    const canvas = canvasRef.current!;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="rounded-2xl border-4 border-rose-300 bg-white p-6 text-center shadow-sm">
      <p className="font-[var(--font-caveat)] text-3xl font-bold text-rose-600">
        Coloring corner
      </p>

      <canvas
        ref={canvasRef}
        width={480}
        height={320}
        className="mt-4 w-full touch-none rounded-xl border-2 border-dashed border-neutral-200 bg-white"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />

      <div className="mt-4 flex items-center justify-center gap-3">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            aria-label={`pick color ${c}`}
            className="h-9 w-9 rounded-full border-2 transition"
            style={{
              backgroundColor: c,
              borderColor: color === c ? "#2b2b2b" : "transparent",
            }}
          />
        ))}
        <button
          onClick={clear}
          className="ml-2 rounded-full bg-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
