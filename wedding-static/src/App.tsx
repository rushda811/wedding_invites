import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import confetti from "canvas-confetti";
import { Envelope } from "@/components/Envelope";
import { Countdown } from "@/components/Countdown";
import { Petals } from "@/components/Petals";
import heroBg from "@/assets/hero.jpg";
import groomImg from "@/assets/groom.jpg";
import brideUpload from "@/assets/bride.jpg";
import venueUpload from "@/assets/venue.jpg";

const WEDDING_DATE = new Date("2027-12-22T18:00:00+05:30");
const VENUE_MAPS = "https://www.google.com/maps/search/?api=1&query=Kohinoor+Auditorium+Padikkal";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function App() {
  const [opened, setOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1]);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    const colors = ["#d4af6a", "#b8860b", "#fff1d6", "#a52a2a", "#8b1a1a", "#f5e1c8"];
    const burst = (origin: { x: number; y: number }, count = 90) =>
      confetti({ particleCount: count, spread: 80, startVelocity: 50, origin, colors, scalar: 1.1, ticks: 220 });
    burst({ x: 0.15, y: 0.65 });
    burst({ x: 0.85, y: 0.65 });
    setTimeout(() => burst({ x: 0.5, y: 0.4 }, 130), 250);
    setTimeout(() => {
      confetti({ particleCount: 200, spread: 140, origin: { x: 0.5, y: 0.5 }, colors, scalar: 1.3, ticks: 260 });
    }, 500);
    setTimeout(() => {
      confetti({ particleCount: 60, spread: 360, startVelocity: 25, origin: { x: 0.5, y: 0.5 }, colors: ["#fff1d6", "#d4af6a"], shapes: ["circle"], scalar: 0.6 });
    }, 900);

    setTimeout(() => setShowContent(true), 1700);
  };

  useEffect(() => {
    if (showContent) {
      setTimeout(() => {
        document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  }, [showContent]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-ivory">
      {opened && (
        <iframe
          src="https://www.youtube.com/embed/dLnJTuWx8AU?autoplay=1&controls=0&loop=1&playlist=dLnJTuWx8AU&modestbranding=1"
          allow="autoplay"
          title="Background music"
          className="fixed bottom-2 right-2 w-1 h-1 opacity-0 pointer-events-none"
          aria-hidden
        />
      )}

      {showContent && !reduce && <Petals />}

      <AnimatePresence>
        {!showContent && (
          <motion.section
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, y: -40 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, oklch(0.97 0.02 80) 0%, oklch(0.92 0.05 50) 60%, oklch(0.78 0.1 30) 100%)",
            }}
          >
            <Sparkles />
            <div className="relative z-10 w-full">
              <motion.div
                className="text-center mb-8 sm:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <div className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-burgundy/70">A Royal Invitation</div>
                <h1 className="mt-3 font-display italic text-4xl sm:text-6xl text-burgundy">
<span
  className="bg-clip-text text-transparent font-display italic text-center block
             text-3xl sm:text-5xl tracking-wide leading-tight"
  style={{
    backgroundImage:
      "linear-gradient(90deg, #2b160f 0%, #6b3f12 35%, #b8892f 60%, #6b3f12 85%, #2b160f 100%)",
  }}
>
  Your Presence is Requested
</span>                </h1>
              </motion.div>
              <Envelope opened={opened} onOpen={handleOpen} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {showContent && (
        <>
          <section
            id="invitation"
            ref={heroRef}
            className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-5 pt-16 pb-24 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{ y: reduce ? 0 : heroY, scale: reduce ? 1 : heroScale, opacity: reduce ? 1 : heroOpacity }}
            >
              <img src={heroBg} alt="" className="w-full h-full object-cover" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.22 0.05 30 / 0.7) 0%, oklch(0.97 0.015 85 / 0.55) 45%, oklch(0.97 0.015 85 / 0.95) 90%, oklch(0.97 0.015 85) 100%)",
                }}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.15 } } }}
              className="relative z-10 max-w-2xl"
            >
          <motion.p
  variants={fadeUp}
  className="font-arabic text-3xl sm:text-5xl leading-relaxed text-center"
  dir="rtl"
  style={{
    color: "#f6e7c7",
    textShadow: "0 2px 10px rgba(212,175,106,0.35)",
  }}
>
  بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
</motion.p>

              <motion.div variants={fadeUp} className="my-8 ornament">
                <span className="ornament-line" />
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-gold"><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z"/></svg>
                <span className="ornament-line" />
              </motion.div>
<motion.h1
  variants={fadeUp}
  className="font-display text-5xl sm:text-7xl leading-[1.05] font-display-tight text-center"
>
  <span
    className="bg-clip-text text-transparent"
    style={{
      backgroundImage:
        "linear-gradient(90deg, #2a160f 0%, #6b3f12 35%, #b8892f 60%, #6b3f12 85%, #2a160f 100%)",
    }}
  >
    Shahansad
  </span>

  <span className="block font-script text-4xl sm:text-6xl text-gold-deep my-2 sm:my-3">
    &
  </span>

  <span
    className="bg-clip-text text-transparent"
    style={{
      backgroundImage:
        "linear-gradient(90deg, #2a160f 0%, #6b3f12 35%, #b8892f 60%, #6b3f12 85%, #2a160f 100%)",
    }}
  >
    Fathima Rushda
  </span>
</motion.h1>

              <motion.p variants={fadeUp} className="mt-8 tracking-[0.4em] uppercase text-[10px] sm:text-xs text-burgundy/70">
                Request the honour of your presence
              </motion.p>
              <motion.p variants={fadeUp} className="mt-3 font-display italic text-2xl sm:text-3xl text-burgundy">
                Wednesday · December 22 · 2027
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-12 inline-flex flex-col items-center text-burgundy/70"
              >
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center">
                  <span className="text-[10px] tracking-[0.5em] uppercase">Scroll</span>
                  <svg className="w-4 h-4 mt-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

    <PersonSection
  kind="The Groom"
  name="Shahansad ck"
  address="S/o Mr. & Mrs. Abdul Rahman"
  location="Kannur, Kerala"
  image={groomImg}
  reverse={false}
/>

<PersonSection
  kind="The Bride"
  name=" Fathima Rushda"
  address="D/o Mr. & Mrs. Mohammed Ali"
  location="Padikkal, Kerala"
  image={brideUpload}
  reverse
/>
          <section className="relative px-5 py-20 sm:py-28 text-center bg-gradient-to-b from-ivory via-secondary/30 to-ivory overflow-hidden">
            <DecorBorder />
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}>
              <div className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-gold">Counting the Moments</div>
              <h2 className="mt-3 font-display italic text-4xl sm:text-5xl text-burgundy">Until We Say "Qubool Hai"</h2>
              <div className="mt-10">
                <Countdown target={WEDDING_DATE} />
              </div>
            </motion.div>
          </section>

          <section className="px-5 py-20 sm:py-28 text-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
              <div className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-gold">Save the Date</div>
              <h2 className="mt-3 font-display italic text-4xl sm:text-5xl text-burgundy">Our Celebrations</h2>
            </motion.div>

            <div className="mt-12 max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl p-[1.5px] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.75 0.13 80) 0%, oklch(0.92 0.06 85) 35%, oklch(0.65 0.15 70) 65%, oklch(0.85 0.1 80) 100%)",
                  boxShadow:
                    "0 25px 60px -20px rgba(140,90,30,0.45), 0 0 40px rgba(212,175,106,0.25)",
                }}
              >
                <motion.div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgba(255,230,170,0.85) 60deg, transparent 120deg, transparent 360deg)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative rounded-2xl bg-card px-6 py-10 sm:px-10 sm:py-12 text-center overflow-hidden">
                  <span className="absolute top-3 left-3 text-gold-deep/60 text-xl">❀</span>
                  <span className="absolute top-3 right-3 text-gold-deep/60 text-xl">❀</span>
                  <span className="absolute bottom-3 left-3 text-gold-deep/60 text-xl">❀</span>
                  <span className="absolute bottom-3 right-3 text-gold-deep/60 text-xl">❀</span>

                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gold-deep">
                      <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
                    </svg>
                    <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
                  </div>

                  <div className="text-[10px] tracking-[0.5em] uppercase text-gold-deep">Wedding Reception</div>

                  <div className="mt-5 font-display italic text-4xl sm:text-5xl text-burgundy leading-tight">
                    <span className="text-shimmer">22</span>
                    <span className="mx-2 text-gold-deep">·</span>
                    <span className="text-shimmer">12</span>
                    <span className="mx-2 text-gold-deep">·</span>
                    <span className="text-shimmer">2027</span>
                  </div>
                  <div className="mt-2 text-xs sm:text-sm tracking-[0.35em] uppercase text-burgundy/70">Wednesday</div>

                  <div className="my-6 flex items-center justify-center gap-3">
                    <span className="h-px w-12 bg-gold/50" />
                    <span className="text-gold-deep text-sm">✦</span>
                    <span className="h-px w-12 bg-gold/50" />
                  </div>

                  <div className="font-display text-2xl text-burgundy">6:00 PM</div>
                  <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mt-1">Onwards</div>

                  <div className="mt-6 font-script text-2xl text-gold-deep">Kohinoor Auditorium</div>
                  <div className="text-xs italic text-foreground/70 mt-1">Padikkal</div>

                  <motion.a
                    href="#venue"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("venue")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-8 inline-flex flex-col items-center text-burgundy/70 hover:text-burgundy transition-colors"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-[10px] tracking-[0.4em] uppercase">Scroll down for location</span>
                    <svg className="w-4 h-4 mt-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1 }}
              className="mt-16 max-w-2xl mx-auto px-2"
            >
              <blockquote className="font-display italic text-xl sm:text-3xl text-burgundy leading-relaxed">
                "And among His signs is that He created for you mates from among yourselves,
                that you may dwell in tranquility with them, and He has put love and mercy between your hearts."
              </blockquote>
              <figcaption className="mt-4 text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold">— Quran 30:21</figcaption>
            </motion.figure>
          </section>

          <section id="venue" className="relative px-5 py-24 sm:py-32 text-center text-ivory overflow-hidden scroll-mt-16">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            >
              <img src={venueUpload} alt="Venue" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(180deg, oklch(0.22 0.08 25 / 0.75) 0%, oklch(0.22 0.08 25 / 0.6) 50%, oklch(0.22 0.08 25 / 0.85) 100%)",
              }} />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ show: { transition: { staggerChildren: 0.15 } } }}
              className="relative z-10 max-w-2xl mx-auto"
            >
              <motion.div variants={fadeUp} className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-gold-soft">The Venue</motion.div>
              <motion.h2 variants={fadeUp} className="mt-3 font-display italic text-4xl sm:text-5xl">Where Love Blooms</motion.h2>
              <motion.div variants={fadeUp} className="mt-8 font-display text-3xl sm:text-5xl text-shimmer">Kohinoor Auditorium</motion.div>
              <motion.div variants={fadeUp} className="mt-2 text-sm tracking-[0.4em] uppercase text-ivory/80">Padikkal</motion.div>

              <motion.a
                variants={fadeUp}
                href={VENUE_MAPS}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold-soft/70 bg-ivory/10 backdrop-blur px-6 py-3 text-xs sm:text-sm tracking-[0.3em] uppercase hover:bg-ivory/20 transition glow-gold"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s8-7.5 8-13a8 8 0 10-16 0c0 5.5 8 13 8 13z" />
                  <circle cx="12" cy="9" r="3" />
                </svg>
                Open in Google Maps
              </motion.a>
            </motion.div>
          </section>

          <section className="px-5 py-20 text-center bg-ivory">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1 }}
              className="max-w-2xl mx-auto"
            >
              <p className="font-arabic text-2xl sm:text-3xl text-burgundy leading-loose" dir="rtl">
                وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
              </p>
              <p className="mt-4 font-display italic text-xl text-muted-foreground">
                "And He placed between you affection and mercy."
              </p>
              <div className="mt-3 text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold">— Quran 30:21</div>
            </motion.div>
          </section>

          <footer className="px-5 py-12 text-center bg-burgundy text-ivory">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold/60" />
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gold">
                <path d="M12 21s-7-4.534-9.5-9.05C.5 8 3 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 6 4 4 7.95C19 16.466 12 21 12 21z" />
              </svg>
              <span className="h-px w-10 bg-gold/60" />
            </div>
            <p className="mt-4 font-script text-3xl text-gold-soft">Made with Love & Faith</p>
            <p className="mt-2 text-[10px] tracking-[0.4em] uppercase text-ivory/60">Shahansad ck & Fathima Rushda · 22 . 12 . 2027</p>

            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="text-[10px] tracking-[0.3em] uppercase text-ivory/50">Made by</span>
              <a
                href="https://instagram.com/aurellevows"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gold-soft hover:text-gold transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-xs tracking-wide font-medium">Aurelle Vows</span>
              </a>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}

function PersonSection({
  kind, name, address, location, image, reverse,
}: { kind: string; name: string; address: string; location: string; image: string; reverse: boolean }) {
  return (
    <section className="px-5 py-20 sm:py-28 relative overflow-hidden">
      <div className={`max-w-5xl mx-auto grid sm:grid-cols-2 gap-12 sm:gap-16 items-center ${reverse ? "sm:[&>*:first-child]:order-2" : ""}`}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 40 : -40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto"
        >
          <motion.div
            className="absolute -inset-6 rounded-full bg-gradient-to-br from-gold/40 via-blush/40 to-burgundy/20 blur-2xl"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative aspect-square rounded-full overflow-hidden border-[3px] border-ivory shadow-2xl max-w-[260px] sm:max-w-sm mx-auto ring-1 ring-gold/40 ring-offset-4 ring-offset-ivory">
            <img src={image} alt={name} className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[2s]" loading="lazy" />
          </div>
          <span className="absolute -top-2 -right-2 text-gold sparkle text-2xl">✦</span>
          <span className="absolute -bottom-1 left-2 text-gold sparkle text-xl" style={{ animationDelay: "1.2s" }}>✦</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-center sm:text-left"
        >
          <div className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-gold">{kind}</div>
          <h2 className="mt-3 font-display italic text-5xl sm:text-6xl text-burgundy leading-tight">
            <span
  className="bg-clip-text text-transparent font-display italic"
  style={{
    backgroundImage:
      "linear-gradient(90deg, #ff2e88 0%, #ff4da6 30%, #ff77c8 60%, #ff2e88 100%)",
  }}
>
  {name}
</span>
          </h2>
          <div className="mt-4 h-px w-16 bg-gold/50 mx-auto sm:mx-0" />
          <p className="mt-4 text-sm text-muted-foreground">{address}</p>
          <p className="mt-1 text-sm italic text-foreground/80">{location}</p>
        </motion.div>
      </div>
    </section>
  );
}

function DecorBorder() {
  return (
    <>
      <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 h-px w-40 sm:w-64 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 h-px w-40 sm:w-64 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </>
  );
}

function Sparkles() {
  const positions = [
    { top: "12%", left: "20%", delay: "0s" },
    { top: "30%", left: "75%", delay: "0.6s" },
    { top: "60%", left: "15%", delay: "1.1s" },
    { top: "75%", left: "82%", delay: "1.6s" },
    { top: "20%", left: "55%", delay: "0.9s" },
  ];
  return (
    <>
      {positions.map((p, i) => (
        <span
          key={i}
          className="absolute text-gold sparkle text-xl sm:text-2xl pointer-events-none"
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        >
          ✦
        </span>
      ))}
    </>
  );
}
