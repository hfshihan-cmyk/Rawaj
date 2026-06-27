"use client";

import { useMemo } from "react";

const COLORS = ["#4fdbc8", "#ffb95f", "#71f8e4", "#d4e4fa", "#04b4a2"];

/** Lightweight CSS confetti burst — no library, fires once on mount. */
export default function Confetti({ count = 80 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Deterministic-ish pseudo-random from index (no Math.random in render path concerns).
        const r = (n: number) => ((Math.sin(i * 9301 + n * 49297) + 1) / 2);
        return {
          left: r(1) * 100,
          delay: r(2) * 0.6,
          duration: 2.2 + r(3) * 1.8,
          color: COLORS[i % COLORS.length],
          rotate: r(4) * 360,
          drift: (r(5) - 0.5) * 40,
        };
      }),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg) translateX(${p.drift}px)`,
          }}
        />
      ))}
    </div>
  );
}
