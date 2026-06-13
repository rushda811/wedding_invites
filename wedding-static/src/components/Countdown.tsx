import { useEffect, useState } from "react";

function pad(n: number) { return String(n).padStart(2, "0"); }

export function Countdown({ target }: { target: Date }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  const units = [
    { label: "Days", v: d },
    { label: "Hours", v: pad(h) },
    { label: "Minutes", v: pad(m) },
    { label: "Seconds", v: pad(s) },
  ];
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
      {units.map((u) => (
        <div key={u.label} className="rounded-lg border border-gold/40 bg-card/60 backdrop-blur px-2 py-4 text-center shadow-sm">
          <div className="font-display text-2xl sm:text-4xl font-semibold text-primary">{u.v}</div>
          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">{u.label}</div>
        </div>
      ))}
    </div>
  );
}
