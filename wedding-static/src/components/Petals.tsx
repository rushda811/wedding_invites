import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PETALS = 14;

export function Petals() {
  const [items, setItems] = useState<{ x: number; d: number; delay: number; size: number; rot: number }[]>([]);
  useEffect(() => {
    setItems(
      Array.from({ length: PETALS }, () => ({
        x: Math.random() * 100,
        d: 10 + Math.random() * 14,
        delay: Math.random() * -20,
        size: 10 + Math.random() * 14,
        rot: Math.random() * 360,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {items.map((p, i) => (
        <motion.div
          key={i}
          className="absolute top-[-10%]"
          style={{ left: `${p.x}%` }}
          initial={{ y: "-10vh", rotate: p.rot, opacity: 0 }}
          animate={{ y: "110vh", rotate: p.rot + 360, opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: p.d, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" className="drop-shadow-[0_2px_4px_rgba(120,40,60,0.25)]">
            <path
              d="M12 2c3 4 7 6 7 11a7 7 0 11-14 0c0-5 4-7 7-11z"
              fill="url(#pg)"
              opacity="0.85"
            />
            <defs>
              <linearGradient id="pg" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#fbe3d6" />
                <stop offset="100%" stopColor="#e8a8a0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
