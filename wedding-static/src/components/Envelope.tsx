import { motion } from "framer-motion";

export function Envelope({
  opened,
  onOpen,
}: {
  opened: boolean;
  onOpen: () => void;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Outer halo glow */}
      <motion.div
        aria-hidden
        className="absolute -inset-16 sm:-inset-24 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.85 0.15 70 / 0.55) 0%, oklch(0.85 0.15 70 / 0.15) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: opened ? [1, 1.6, 2] : [1, 1.15, 1],
          opacity: opened ? [0.8, 0.4, 0] : [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: opened ? 1.4 : 4,
          repeat: opened ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating floral ring */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ width: "140%", height: "140%" }}
      >
        {["0deg", "72deg", "144deg", "216deg", "288deg"].map((d, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%,-50%) rotate(${d}) translateY(-180px)`,
            }}
          >
            <svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-10 sm:h-10 text-gold-deep opacity-70">
              <g fill="currentColor">
                <circle cx="20" cy="20" r="4" />
                <ellipse cx="20" cy="10" rx="4" ry="7" opacity="0.6" />
                <ellipse cx="20" cy="30" rx="4" ry="7" opacity="0.6" />
                <ellipse cx="10" cy="20" rx="7" ry="4" opacity="0.6" />
                <ellipse cx="30" cy="20" rx="7" ry="4" opacity="0.6" />
              </g>
            </svg>
          </div>
        ))}
      </motion.div>

      {/* Floating petals */}
      {!opened && (
        <>
          {[
            { x: -120, y: -40, d: 0 },
            { x: 130, y: -20, d: 0.8 },
            { x: -100, y: 80, d: 1.4 },
            { x: 120, y: 90, d: 2 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute text-gold-deep pointer-events-none"
              style={{ left: "50%", top: "50%" }}
              animate={{
                y: [p.y, p.y - 14, p.y],
                x: [p.x, p.x + 6, p.x],
                rotate: [0, 12, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: p.d,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M12 2c2 4 6 6 10 6-4 0-8 2-10 6-2-4-6-6-10-6 4 0 8-2 10-6z" />
              </svg>
            </motion.div>
          ))}
        </>
      )}

      {/* Envelope */}
      <motion.button
        type="button"
        onClick={onOpen}
        disabled={opened}
        aria-label="Open invitation"
        className="relative w-[300px] h-[200px] sm:w-[420px] sm:h-[280px] cursor-pointer focus:outline-none"
        whileHover={!opened ? { scale: 1.04 } : {}}
        animate={
          opened ? { y: -20, scale: 1.02 } : { y: [0, -8, 0] }
        }
        transition={
          opened
            ? { duration: 0.6 }
            : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
        }
        style={{
          filter: opened
            ? "drop-shadow(0 0 30px rgba(212,175,106,0.6))"
            : "drop-shadow(0 20px 40px rgba(120,60,20,0.35)) drop-shadow(0 0 18px rgba(212,175,106,0.45))",
        }}
      >
        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-md overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, oklch(0.97 0.025 80), oklch(0.9 0.05 70))",
            boxShadow:
              "0 30px 60px -20px rgba(120,90,40,0.45), inset 0 0 0 1px rgba(180,140,80,0.45), inset 0 0 30px rgba(212,175,106,0.25)",
          }}
        />

        {/* Letter */}
        <motion.div
          className="absolute left-4 right-4 rounded-sm bg-ivory border border-gold/50 flex items-center justify-center shadow-inner"
          initial={false}
          animate={
            opened
              ? { top: "-180%", height: "280%" }
              : { top: "15%", height: "70%" }
          }
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center px-4">
            <div className="font-display italic text-primary text-lg sm:text-2xl">
              Together with their families
            </div>
            <div className="mt-2 font-display text-2xl sm:text-4xl text-shimmer">
              Shahansad &amp; Rushda
            </div>
            <div className="mt-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground">
              22 . 12 . 2027
            </div>
          </div>
        </motion.div>

        {/* Back flap */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-md"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.92 0.03 75), oklch(0.84 0.06 60))",
          }}
        />

        {/* Side flaps */}
        <div
          className="absolute inset-y-0 left-0 w-1/2"
          style={{
            clipPath: "polygon(0 0, 100% 50%, 0 100%)",
            background: "oklch(0.9 0.04 70)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2"
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
            background: "oklch(0.9 0.04 70)",
          }}
        />

        {/* Top flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 origin-top"
          initial={false}
          animate={opened ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transformStyle: "preserve-3d",
            background:
              "linear-gradient(180deg, oklch(0.95 0.03 75), oklch(0.86 0.06 65))",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          }}
        />

        {/* HEART SEAL — SHINING GOLD */}
<motion.div
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
  animate={opened ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
  transition={{ duration: 0.45 }}
>
  <svg viewBox="0 0 24 24" className="w-14 h-14 sm:w-16 sm:h-16">
    <defs>
      {/* gold gradient */}
      <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff6c7" />
        <stop offset="25%" stopColor="#f7d774" />
        <stop offset="55%" stopColor="#d4af37" />
        <stop offset="80%" stopColor="#b8860b" />
        <stop offset="100%" stopColor="#fff1a8" />
      </linearGradient>

      {/* soft highlight */}
      <radialGradient id="goldHighlight" cx="30%" cy="25%" r="60%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
        <stop offset="60%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>

    {/* base gold heart */}
    <path
      d="M12 21s-7-4.534-9.5-9.05C.5 8 3 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 6 4 4 7.95C19 16.466 12 21 12 21z"
      fill="url(#goldShine)"
    />

    {/* shine overlay */}
    <path
      d="M12 21s-7-4.534-9.5-9.05C.5 8 3 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 6 4 4 7.95C19 16.466 12 21 12 21z"
      fill="url(#goldHighlight)"
    />
  </svg>
</motion.div>
      </motion.button>

      {!opened && (
        <motion.p
          className="mt-10 font-display italic text-primary/85 text-base sm:text-lg tracking-wide flex items-center gap-3"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-gold">❀</span>
          click to open
          <span className="text-gold">❀</span>
        </motion.p>
      )}
    </div>
  );
}