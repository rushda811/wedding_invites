'use client'

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion'

import {
  useEffect,
  useRef,
  useState,
} from 'react'


export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [openEnvelope, setOpenEnvelope] =
    useState(false)
  const [openModal, setOpenModal] =
    useState(false)
const ease = [0.22, 1, 0.36, 1] as const


  const audioRef =
    useRef<HTMLAudioElement | null>(null)

  const weddingDate = new Date(
    '2026-05-30T11:00:00'
  ).getTime()

  const [timeLeft, setTimeLeft] = useState({
    days: '000',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  const { scrollY } = useScroll()

  const bgY = useTransform(
    scrollY,
    [0, 1000],
    [0, 250]
  )

  const glowY = useTransform(
    scrollY,
    [0, 1000],
    [0, -180]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      )

      const hours = Math.floor(
        (distance %
          (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      )

      const minutes = Math.floor(
        (distance %
          (1000 * 60 * 60)) /
          (1000 * 60)
      )

      const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
      )

      setTimeLeft({
        days: String(days).padStart(3, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(
          2,
          '0'
        ),
        seconds: String(seconds).padStart(
          2,
          '0'
        ),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [weddingDate])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

 useEffect(() => {
  const body = document.body

  if (openModal) {
    body.style.overflow = 'hidden'
    body.style.touchAction = 'none'
  } else {
    body.style.overflow = ''
    body.style.touchAction = ''
  }

  return () => {
    body.style.overflow = ''
    body.style.touchAction = ''
  }
}, [openModal])
useEffect(() => {
  setMounted(true)
}, [])
const [mounted, setMounted] = useState(false)
  const startMusic = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0

        await audioRef.current.play()

        let volume = 0

        const fade = setInterval(() => {
          volume += 0.02

          if (volume >= 1) {
            volume = 1
            clearInterval(fade)
          }

          if (audioRef.current) {
            audioRef.current.volume = volume
          }
        }, 120)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const Divider = () => (
    
    <div className="flex items-center justify-center gap-4 my-16">
      <div className="w-24 h-[1px] bg-[#d6b48a]/30" />

      <div className="text-[#c6a27f] text-xl">
        ✦
      </div>

      <div className="w-24 h-[1px] bg-[#d6b48a]/30" />
    </div>
  )
const [isMobile, setIsMobile] = useState(false)

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768)
  }

  checkMobile()

  window.addEventListener('resize', checkMobile)

  return () =>
    window.removeEventListener(
      'resize',
      checkMobile
    )
}, [])
if (!mounted) return null
return (
<main className="relative min-h-screen md:min-h-dvh overflow-x-hidden bg-[#f4ede5] text-[#2c1f1a] scroll-smooth">

    <audio ref={audioRef} loop>
      <source
        src="/audio.mp3"
        type="audio/mp3"
      />
    </audio>

      {/* BACKGROUND */}
      <motion.div
        style={mounted ? { y: bgY } : {}}
        className="
          fixed inset-0 -z-20
          transform-gpu
          will-change-transform
          backface-hidden
        "
      >
        <div className="absolute inset-0 bg-[#f4ede5]" />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 16,
            repeat: isMobile ? 0 : Infinity,
            ease,
          }}
          className="
            absolute
            top-[-10%]
            left-[-10%]
            w-[800px]
            h-[800px]
            rounded-full
            blur-[80px] md:blur-[180px]
            bg-[#efe2d0]

            transform-gpu
            will-change-transform
            backface-hidden
          "
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: isMobile ? 0 : Infinity,
            ease,
          }}
          className="
            absolute
            top-[20%]
            left-1/2
            -translate-x-1/2
            w-[900px]
            h-[900px]
            rounded-full
            bg-[#d6b48a]
            md:blur-[180px] blur-[80px]

            transform-gpu
            will-change-transform
            backface-hidden
          "
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 18,
            repeat: isMobile ? 0 : Infinity,
            ease,
          }}
          className="
            absolute
            bottom-[-20%]
            right-[-10%]
            w-[850px]
            h-[850px]
            rounded-full
            md:blur-[180px] blur-[80px]
            bg-[#ead7c5]

            transform-gpu
            will-change-transform
            backface-hidden
          "
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        />
      </motion.div>

      {/* GRAIN */}
      <div
        className="
          fixed
          inset-0
          opacity-[0.03]
          mix-blend-overlay
          pointer-events-none
          z-50
        "
        style={{
          backgroundImage:
            'url(https://www.transparenttextures.com/patterns/black-paper.png)',
        }}
      />

      {/* INTRO */}
      <AnimatePresence>
        {showIntro && (
          <motion.section
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2,
              ease,
            }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-[#f4ede5]
              overflow-hidden

              transform-gpu
              will-change-transform
              backface-hidden
            "
            style={{
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: isMobile ? 0 : Infinity,
                ease,
              }}
              className="
                absolute
                w-[900px]
                h-[900px]
                rounded-full
                bg-[#d6b48a]
blur-[180px] md:blur-[180px] sm:blur-[80px]                opacity-30

                transform-gpu
                will-change-transform
                backface-hidden
              "
              style={{
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            />

            <div className="text-center relative z-10">
              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.5,
                  ease,
                }}
                className="
                  uppercase
                  tracking-[0.8em]
                  text-[11px]
                  text-[#8f735f]
                "
                style={{
                  fontFamily: 'var(--font-inter)',
                }}
              >
                Luxury Wedding Experiences
              </motion.p>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 40,
                  filter: 'blur(10px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 2.5,
                  ease,
                }}
                className="
                  mt-10
                  text-6xl
                  md:text-8xl
                  uppercase
                  tracking-[0.18em]
                "
                style={{
                  fontFamily:
                    'var(--font-cormorant)',
                }}
              >
                Aurelle Vows
              </motion.h1>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ENVELOPE */}
     {!showIntro && (
<section className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center px-6">
          {/* VIDEO BACKGROUND */}

<div className="absolute inset-0 -z-10 overflow-hidden bg-black">
<video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  className="
    absolute inset-0
    w-full h-full
    object-contain
    bg-black
  "
>
  <source src="/hero-video.mp4" type="video/mp4" />
</video>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/20" />
</div>

          <motion.div
            initial={{
              opacity: 0,
              y: 80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 2,
              ease,
            }}
            className="
              relative
              transform-gpu
              will-change-transform
              backface-hidden
            "
            style={{
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          >
            
            <motion.div
  animate={{
    y: [0, -10, 0],
  }}
  transition={{
    duration: 8,
    repeat: isMobile ? 0 : Infinity,
    ease,
  }}
  className="
    relative
   w-[300px] sm:w-[340px] md:w-[360px]
h-[200px] sm:h-[220px] md:h-[240px]
    cursor-pointer

    transform-gpu
    will-change-transform
    backface-hidden
  "
  style={{
    perspective: '2000px',

    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)',
  }}
  onClick={() => {
    setOpenEnvelope(true)
    startMusic()
  }}
>

              {/* MAIN ENVELOPE */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-[18px]
                  overflow-hidden

                  bg-gradient-to-br
                  from-[#fdf7f1]
                  via-[#f2e4d4]
                  to-[#dcc2a5]

                  border border-white/40

                  shadow-[0_40px_120px_rgba(0,0,0,0.22)]

                  backdrop-blur-xl

                  transform-gpu
                  will-change-transform
                  backface-hidden
                "
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              >

                {/* GLOSS */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-br
                    from-white/40
                    via-transparent
                    to-black/10
                  "
                />

                {/* SHINE */}
                <motion.div
                  animate={{
                    x: ['-120%', '220%'],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: isMobile ? 0 : Infinity,
                    ease: 'linear',
                  }}
                  className="
                    absolute
                    inset-y-0

                    w-[30%]

                    bg-gradient-to-r
                    from-transparent
                    via-white/50
                    to-transparent

                    skew-x-[-20deg]

                    transform-gpu
                    will-change-transform
                    backface-hidden
                  "
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                />
              </div>

              {/* LUXURY FLAP */}
              <motion.div
                initial={false}
              animate={{
  rotateX: openEnvelope ? -160 : 0,
}}
                transition={{
                  duration: 1.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: 'top',
                 
                  clipPath:
                    'polygon(0 0,100% 0,50% 100%)',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
                className="
                  absolute
                  top-0
                  left-0
                  right-0

                  h-[140px] sm:h-[160px]

                  bg-gradient-to-b
                  from-[#f8ebdc]
                  via-[#ead5bf]
                  to-[#d9b999]

                  shadow-[0_20px_60px_rgba(0,0,0,0.15)]

                  z-20

                  transform-gpu
                  will-change-transform
                  backface-hidden
                "
              >

                {/* flap gloss */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-b
                    from-white/40
                    via-transparent
                    to-black/10
                  "
                />
              </motion.div>

              {/* SEAL */}
              <motion.div
                whileTap={{
                  scale: 0.94,
                }}
                animate={{
                  opacity: openEnvelope ? 0 : 1,
                  scale: openEnvelope ? 0.7 : 1,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2

                  w-24
                  h-24

                  rounded-full

                  bg-gradient-to-br
                  from-[#7c5132]
                  via-[#b28761]
                  to-[#6f4528]

                  flex
                  items-center
                  justify-center

                  text-white

                  border border-[#f5d8b8]/40

                  shadow-[0_15px_50px_rgba(0,0,0,0.35)]

                  z-30

                  transform-gpu
                  will-change-transform
                  backface-hidden
                "
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              >

                {/* glow */}
                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    bg-white/10
                  "
                />

                {/* highlight */}
                <div
                  className="
                    absolute
                    top-3
                    left-4

                    w-5
                    h-5

                    rounded-full
                    bg-white/40
                    blur-sm
                  "
                />

                <span
                  className="
                    text-2xl
                    tracking-[0.18em]
                  "
                  style={{
                    fontFamily:
                      'var(--font-cormorant)',
                  }}
                >
                  HJ
                </span>
              </motion.div>
            </motion.div>

            <p
              className="
                mt-8
                text-center
                uppercase
                tracking-[0.6em]
                text-[10px]
                text-[#8f735f]
              "
              style={{
                fontFamily: 'var(--font-inter)',
              }}
            >
              Open The Letter
            </p>
          </motion.div>
        </section>
      )}

{/* MAIN */}
<AnimatePresence>
  {openEnvelope && (
    <motion.div
      initial={{
        opacity: 0,
        y: 120,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.9,
        duration: 1.4,
        ease,
      }}
  className="
  fixed
  inset-0
  z-40
  overflow-y-auto
  overflow-x-hidden
  bg-[#f4ede5]
  overscroll-y-contain
"
    >
      {/* HERO */}
      <section
        className="
          relative
          min-h-[75vh] md:min-h-dvh
          flex
          items-center
          justify-center
          overflow-x-hidden
        "
      >
  <motion.div
    style={mounted ? { y: glowY } : {}}
    className="
    absolute
    w-[700px]
    h-[700px]
    rounded-full
    bg-[#d6b48a]
blur-[180px] md:blur-[180px] sm:blur-[80px]    opacity-40
    "
  />

  <div className="relative z-10 text-center">

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="relative"
    >

      {/* TOP LABEL */}
      <div className="flex flex-col items-center overflow-hidden">

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{
            staggerChildren: 0.4,
          }}
          className="
            flex
            items-center
            gap-3
            uppercase
            text-[10px] md:text-[11px]
            tracking-[0.9em]
            text-[#6f5443]
            font-bold
          "
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          {["The", "Wedding", "Of"].map(
            (word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 40,
                    filter: "blur(10px)",
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  },
                }}
                transition={{
                  duration: 2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            )
          )}
        </motion.div>

      </div>

      {/* MONOGRAM AREA */}
      <div className="relative flex justify-center items-center mt-6">

        {/* MAIN GOLD AURA */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.18, 0.3, 0.18],
          }}
          transition={{
            duration: 8,
            repeat: isMobile ? 0 : Infinity,
            ease,
          }}
          className="
            absolute
            w-[65%]
            h-[65%]
            bg-[#d4af37]
            blur-[140px]
            rounded-full
          "
        />

        {/* SECONDARY LIGHT */}
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: isMobile ? 0 : Infinity,
            ease,
          }}
          className="
            absolute
            w-[40%]
            h-[40%]
            bg-white
            blur-[90px]
            rounded-full
          "
        />

        {/* SHIMMER */}
        <motion.div
          animate={{
            x: ["-120%", "120%"],
            opacity: [0, 0.35, 0],
          }}
          transition={{
            duration: 5,
            repeat: isMobile ? 0 : Infinity,
            ease: "linear",
          }}
          className="
            absolute
            w-[220px]
            h-[420px]
            rotate-[25deg]
            bg-white/20
            blur-3xl
          "
        />

        {/* MONOGRAM */}
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{
            staggerChildren: 0.45,
            delayChildren: 1.1,
          }}
          className="
            relative
            flex
            items-center
            justify-center
            text-center
            leading-none
          "
          style={{
            fontFamily: "var(--font-cormorant)",
            textShadow:
              "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >

          {[
            {
              letter: "H",
              color: "text-[#2c1f1a]",
            },
            {
              letter: "&",
              color: "text-[#b89a82]",
            },
            {
              letter: "J",
              color: "text-[#2c1f1a]",
            },
          ].map((item, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 80,
                  scale: 0.82,
                  filter: "blur(14px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                },
              }}
              transition={{
                duration: 2.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`
                ${item.color}
               text-[90px] sm:text-[120px] md:text-[280px]
                font-semibold
                inline-block
              `}
            >
              {item.letter}
            </motion.span>
          ))}

        </motion.div>

      </div>

      {/* BOTTOM LINE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 2.2,
          duration: 2,
        }}
        className="mt-8"
      >
        <div className="w-32 h-[1px] bg-[#d6b48a] mx-auto" />
      </motion.div>

    </motion.div>

  </div>

</section>
<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
  className="
    absolute
    bottom-10
    left-1/2
    -translate-x-1/2
    text-[#8f735f]
    uppercase
    tracking-[0.4em]
    text-[10px]
  "
>
  Scroll Down
</motion.div>
{/* INVITATION */}
<section className="px-6 py-14 md:py-28 flex justify-center">
  <motion.div
    initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true }}
    transition={{ duration: 1.6, ease }}
    className="
      relative
      w-full
      max-w-4xl
      rounded-[48px]
      border border-[#e7d3bf]/40
      bg-[rgba(255,250,244,0.6)]
      backdrop-blur-2xl
      p-10 md:p-16
      shadow-[0_30px_120px_rgba(0,0,0,0.12)]
      overflow-hidden
    "
  >

              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

              <Divider />
{/* ISLAMIC OPENING */}
<div className="text-center">

<motion.p
      dir="rtl"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="
        text-2xl sm:text-3xl md:text-6xl
        font-bold
        leading-loose
        tracking-wide
        text-center
        relative
        gold-text
      "
      style={{
        fontFamily: "var(--font-cormorant)",
      }}
    >
      بسم الله الرحمن الرحيم
    </motion.p>

<motion.p
  className="
    mt-5 text-center
    text-[#7a5c3e]
    text-2xl md:text-3xl
    leading-relaxed
  "
  style={{
    fontFamily: "var(--font-great-vibes)",
    WebkitTextStroke: "0.3px rgba(122, 92, 62, 0.25)",
    textShadow: "0 1px 1px rgba(0,0,0,0.08)",
  }}
>
  In the name of Allah,<br />
  The Most Beneficent and The Most Merciful
</motion.p>
</div>

<Divider />
<p
  className="
    text-center
    uppercase
    tracking-[0.55em]
    text-[11px]
    text-[#9f7f66]
    font-bold
  "
  style={{
    fontFamily: "var(--font-inter)",
  }}
>
  Together with their families
</p>

              <h2
              className="
  mt-14
  text-center
  text-6xl
  md:text-8xl
"
               style={{
    fontFamily: 'var(--font-great-vibes)',
    WebkitTextStroke:
      '0.3px rgba(122,92,62,0.18)',
    textShadow:
      '0 2px 8px rgba(0,0,0,0.06)',
  }}
             
              >
                Hashir
              </h2>

              <p className="text-center text-3xl my-2 text-[#b89a82]">
                &
              </p>

              <h2
                className="
                text-center
                text-6xl
                md:text-8xl
                "
            style={{
    fontFamily: 'var(--font-great-vibes)',
    WebkitTextStroke:
      '0.3px rgba(122,92,62,0.18)',
    textShadow:
      '0 2px 8px rgba(0,0,0,0.06)',
  }}
              >
                Jaseela
              </h2>

              <Divider />
<h2
  className="
    mt-8
    text-[34px]
    md:text-7xl
    font-semibold
    text-center
    whitespace-nowrap
  "
  style={{
    fontFamily: "var(--font-cormorant)",
    color: "#7a5c3e",
  }}
>
  May 30th, 2026
</h2>
              {/* COUNTDOWN */}
              <div className="mt-12 md:mt-24">

                <p
                  className="
                  text-center
                  uppercase
                  tracking-[0.5em]
                  text-[10px]
                  text-[#aa8d79]
                  "
                  style={{
                    fontFamily:
                      'var(--font-inter)',
                  }}
                >
                  Counting Down To Forever
                </p>

                <div
  className="
    flex
    items-center
    justify-center
    gap-1 sm:gap-3 md:gap-5
    mt-12
    overflow-x-visible
    scrollbar-hide
    pb-2
  "
>
  {[
    {
      value: timeLeft.days,
      label: 'Days',
    },
    {
      value: timeLeft.hours,
      label: 'Hours',
    },
    {
      value: timeLeft.minutes,
      label: 'Min',
    },
    {
      value: timeLeft.seconds,
      label: 'Sec',
    },
  ].map((item, i) => (

    <motion.div
      key={i}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        flex-shrink-0
        rounded-[30px]
        border border-white/30
        bg-white/40
        backdrop-blur-xl
w-[68px]
sm:w-[90px]
md:w-[140px]

        py-3 md:py-7
        text-center

        shadow-[0_10px_40px_rgba(0,0,0,0.05)]
      "
    >

      <motion.h3
        key={item.value}
        initial={{
          opacity: 0.4,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
         text-2xl sm:text-3xl md:text-6xl
          leading-none
          text-[#2c1f1a]
        "
        style={{
          fontFamily:
            'var(--font-cormorant)',
        }}
      >
        {item.value}
      </motion.h3>

      <p
        className="
          mt-3
          uppercase
          tracking-[0.25em]
          text-[8px]
          md:text-[10px]
          text-[#9d8470]
        "
        style={{
          fontFamily:
            'var(--font-inter)',
        }}
      >
        {item.label}
      </p>

    </motion.div>

  ))}
</div>
</div>
              {/* BUTTON */}
              <div className="mt-14 md:mt-28 text-center">

          <button
  onClick={() => setOpenModal(true)}
  className="
    group
    relative
    overflow-hidden

    px-14
    py-5
    rounded-full

    bg-[#2c1f1a]
    text-white

    uppercase
    tracking-[0.45em]
    text-[10px]

    hover:scale-105
    transition-all
    duration-700

    shadow-[0_10px_40px_rgba(0,0,0,0.2)]
  "
  style={{
    fontFamily: 'var(--font-inter)',
  }}
>
  {/* GOLD SWEEP */}
  <span
    className="
      absolute
      inset-y-0
      left-[-30%]
      w-[30%]
      bg-gradient-to-r
      from-transparent
      via-white/40
      to-transparent
      skew-x-[-25deg]

      group-hover:left-[130%]
      transition-all
      duration-1000
    "
  />

  <span className="relative z-10">
    Open Location
  </span>
</button>

              </div>

            
{/* ELEGANCE SECTION */}
<motion.div
  initial={{
    opacity: 0,
    y: 80,
    filter: 'blur(10px)',
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  }}
  viewport={{ once: true,amount: 0.15 }}
  transition={{
    duration: 1.8,
    ease,
  }}
  className="relative mt-16 pt-10"
>

  {/* GLOW */}
  <div className="absolute inset-0 flex justify-center pointer-events-none">
    <div
      className="
        w-[500px]
        h-[500px]
        rounded-full
        bg-[#d6b48a]
        blur-[160px]
        opacity-10
      "
    />
  </div>

  <div className="relative z-10 text-center">

    {/* TOP LABEL */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay: 0.2,
        duration: 1,
        ease,
      }}
      className="
        uppercase
        tracking-[0.75em]
        text-[10px]
        text-[#b89a82]
      "
      style={{
        fontFamily: 'var(--font-inter)',
      }}
    >
      A Celebration Of Elegance
    </motion.p>

    {/* DATE */}
    <motion.h2
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        delay: 0.4,
        duration: 1.4,
        ease,
      }}
      className="
        mt-6
      text-2xl sm:text-3xl md:text-6xl
        text-[#2c1f1a]
        tracking-wide
      "
      style={{
        fontFamily: 'var(--font-cormorant)',
      }}
    >
    May 30th, 2026
    </motion.h2>

    {/* DIVIDER */}
    <motion.div
      initial={{ opacity: 0, scaleX: 0.6 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.6,
        duration: 1.2,
        ease,
      }}
      className="
        flex
        items-center
        justify-center
        my-10
        gap-4
      "
    >
      <div className="w-20 h-[1px] bg-[#d6b48a]/40" />
      <div className="text-[#c6a27f] text-sm">
        ✦
      </div>
      <div className="w-20 h-[1px] bg-[#d6b48a]/40" />
    </motion.div>

    {/* MAIN BLOCK */}
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        delay: 0.8,
        duration: 1.4,
        ease,
      }}
      className="space-y-5"
    >

      <p
        className="
          uppercase
          tracking-[0.6em]
          text-[10px]
          text-[#aa8d79]
        "
        style={{
          fontFamily: 'var(--font-inter)',
        }}
      >
        With Best Compliments From
      </p>

      <h3
        className="
          text-2xl md:text-4xl
          text-[#2c1f1a]
          font-medium
        "
        style={{
          fontFamily: 'var(--font-cormorant)',
        }}
      >
        Family and Friends
      </h3>

      <p
        className="
          text-[12px] md:text-sm
          text-[#8f735f]
          tracking-[0.2em]
          leading-relaxed
          max-w-md
          mx-auto
        "
        style={{
          fontFamily: 'var(--font-inter)',
        }}
      >
        We can&apos;t wait to celebrate with you!
      </p>

    </motion.div>

    {/* MINI LINE */}
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      whileInView={{ opacity: 1, width: 40 }}
      viewport={{ once: true }}
      transition={{
        delay: 1,
        duration: 1,
        ease,
      }}
      className="
        h-[1px]
        bg-[#d6b48a]/40
        mx-auto
        mt-12
      "
    />
  </div>

</motion.div>
</motion.div>
</section>
<section className="relative py-14 md:py-32 overflow-hidden">

  {/* GLOW */}
  <motion.div
    animate={{
      opacity: [0.15, 0.35, 0.15],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 10,
      repeat: isMobile ? 0 : Infinity,
      ease,
    }}
    className="
      absolute
      left-1/2
      top-1/2
      -translate-x-1/2
      -translate-y-1/2

      w-[700px]
      h-[700px]

      rounded-full
      bg-[#d6b48a]
      blur-[80px] md:blur-[180px]
    "
  />

  <div className="relative z-10 text-center">

<p
  className="
    text-5xl
    md:text-7xl
    text-[#7a5c3e]
    leading-none
  "
  style={{
    fontFamily: 'var(--font-great-vibes)',
    WebkitTextStroke:
      '0.3px rgba(122,92,62,0.18)',
    textShadow:
      '0 2px 8px rgba(0,0,0,0.06)',
  }}
>
  Thank You
</p>

    <h2
      className="
        mt-8
        text-5xl
        md:text-7xl
        leading-tight
      "
      style={{
        fontFamily: 'var(--font-cormorant)',
      }}
    >
      Your Presence <br />
      Will Be Our Greatest Blessing
    </h2>

  </div>

</section>
<section className="pb-32 px-6 text-center">

  <motion.p
    initial={{
      opacity: 0,
      y: 30,
    }}
    whileInView={{
      opacity: 1,
      y: 0,
    }}
    viewport={{ once: true }}
    transition={{
      duration: 1.5,
      ease,
    }}
    dir="rtl"
    className="
      text-4xl
      md:text-6xl
      leading-loose
      text-[#7a5c3e]
    "
    style={{
      fontFamily: 'var(--font-cormorant)',
    }}
  >
    بارك الله لكما وبارك عليكما وجمع بينكما في خير
  </motion.p>

</section>
{/* FOOTER */}
<footer className="pb-16 text-center relative">

  <p
    className="
      uppercase
      tracking-[0.7em]
      text-[10px]
      text-[#9c8574]
    "
    style={{ fontFamily: 'var(--font-inter)' }}
  >
    Crafted with love by Aurelle Vows
  </p>

</footer>
     {/* MODAL */}
<AnimatePresence>
  {openModal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
className="
  fixed inset-0 z-50
  overflow-y-auto
  overscroll-contain
  flex items-center justify-center
  px-3 py-6 md:p-8
  bg-black/30 backdrop-blur-md
"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.6, ease }}
 className="
  relative w-full
  max-w-[700px]
max-h-[78svh]  overflow-y-auto
  overflow-x-hidden
  rounded-[36px]
  border border-[#f3e7d8]/60

  bg-gradient-to-br
  from-[#fffaf3]/95
  via-[#f6e7d8]/85
  to-[#ecd2c1]/80

  shadow-[0_30px_120px_rgba(0,0,0,0.25)]

  backdrop-blur-2xl
"
      >
        {/* soft gradient overlay (correct place) */}
<div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />
<div
  className="absolute inset-0 opacity-[0.04] pointer-events-none"
  style={{
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
  }}
/>
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpenModal(false)}
  className="
  absolute top-5 right-5 z-50
  w-10 h-10 rounded-full
  bg-white/60 hover:bg-white/80
  border border-[#e7d3bf]/50
  backdrop-blur-md
  flex items-center justify-center
  text-[#5a4636]
  shadow-md
"
        >
          ✕
        </button>

        {/* CONTENT */}
<div className="p-3 md:p-5 space-y-4 relative z-10">   <p className="
  uppercase tracking-[0.7em]
  text-[12px] md:text-[13px]
  font-medium

  text-transparent
  bg-clip-text
  bg-gradient-to-r
  from-[#b08968]
  via-[#7a5c3e]
  to-[#b08968]

  text-center
">
  Wedding Celebration
</p>

          <h2 className="text-center text-5xl md:text-6xl font-serif">
           Emerald Palace
          </h2>

          <Divider />

          {/* MAP */}
          <div className="overflow-hidden rounded-[32px] border border-white/30 shadow-[0_10px_50px_rgba(0,0,0,0.08)]">
            <iframe
src="https://www.google.com/maps?q=Emerald+Palace+KuruKkol+Kunnu&output=embed"              className="w-full h-[220px] sm:h-[280px] md:h-[320px] border-0"
              loading="lazy"
            />
          </div>

          <a
href="https://maps.app.goo.gl/27o3FaPVd9LYJSm17"            target="_blank"
            className="
              mt-6 flex items-center justify-center gap-3
              rounded-full bg-white/70 py-5
              uppercase tracking-[0.35em]
              text-[10px]
              transition-all duration-500
              hover:scale-[1.02]
            "
          >
            📍 Click To Get Location
          </a>

          {/* TIMINGS */}
          <div className="grid grid-cols-2 gap-5 mt-10">
            {[
  { title: "Nikah", time: "11:00 AM" },
  { title: "Lunch", time: "2:00 PM" },
].map((item, i) => (
              <div
                key={i}
                className="
                  rounded-[28px]
                  bg-white/50
                  border border-white/30
                  py-6 text-center
                  shadow-[0_10px_40px_rgba(0,0,0,0.05)]
                "
              >
             <p
  className="
    uppercase
    tracking-[0.28em]
    text-[10px]
    text-[#5f4635]
    font-bold
  "
  style={{
    fontFamily: 'var(--font-inter)',
  }}
>
  {item.title}
</p>
                <h3 className="mt-5 text-4xl">
                  {item.time}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
</motion.div>
)}
</AnimatePresence>
</main>
)
}