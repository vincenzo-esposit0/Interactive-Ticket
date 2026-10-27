import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MapPin, Calendar } from "lucide-react";
import IntroScreen from "./components/IntroScreen";
import TicketScreen from "./components/TicketScreen";
import Gallery from "./components/Gallery";
import LoveLetter from "./components/LoveLetter";
import AudioPlayer from "./components/AudioPlayer";
import Countdown from "./components/Countdown";
import SpotifyWidget from "./components/SpotifyWidget";
import { giftConfig } from "./config";

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  shape: "circle" | "rect" | "heart";
}

export default function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [confetti, setConfetti] = useState<Particle[]>([]);

  // Generatore di coriandoli/particelle festose al momento del reveal
  const triggerConfetti = () => {
    const colors = ["#3B82F6", "#60A5FA", "#EC4899", "#F43F5E", "#10B981", "#F59E0B"];
    const shapes: ("circle" | "rect" | "heart")[] = ["circle", "rect", "heart"];
    
    const newConfetti: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // posizione X da 0 a 100vw
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 6, // dimensione
      delay: Math.random() * 1.5,   // ritardo cascata
      duration: Math.random() * 3 + 2.5, // tempo di caduta
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setConfetti(newConfetti);
  };

  const handleReveal = () => {
    setIsRevealed(true);
    triggerConfetti();
  };

  // Se l'utente ricarica, ricalcoliamo o teniamo memoria facoltativa (qui lasciamo volatile)
  return (
    <div
      id="root-app"
      className="min-h-screen w-full bg-[#020205] text-slate-100 overflow-x-hidden selection:bg-blue-500 selection:text-white font-sans"
    >
      {/* Sottofondo Musicale Fluttuante persistente */}
      <AudioPlayer />

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          /* 1. SCHERMATA INIZIALE (D'ATTESA) */
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="w-full h-full"
          >
            <IntroScreen onReveal={handleReveal} />
          </motion.div>
        ) : (
          /* 2. REVEAL DEL REGALO (IL SITO COMPLETO) */
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-screen w-full bg-[#020205]"
          >
            {/* Cascata di coriandoli attiva al Reveal */}
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
              {confetti.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ y: -50, opacity: 1, x: `${c.x}vw`, rotate: 0 }}
                  animate={{
                    y: "110vh",
                    opacity: [1, 1, 0.7, 0],
                    rotate: [0, 360, 720],
                    x: [`${c.x}vw`, `${c.x + (Math.random() * 15 - 7.5)}vw`],
                  }}
                  transition={{
                    duration: c.duration,
                    delay: c.delay,
                    ease: "easeOut",
                  }}
                  className="absolute pointer-events-none"
                  style={{
                    width: c.size,
                    height: c.size,
                    backgroundColor: c.shape !== "heart" ? c.color : "transparent",
                    borderRadius: c.shape === "circle" ? "50%" : "2px",
                  }}
                >
                  {c.shape === "heart" && (
                    <Heart
                      size={c.size}
                      className="fill-current"
                      style={{ color: c.color }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Background Atmosphere: Stadium Lights Effect */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-blue-900/25 rounded-full blur-[130px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[130px]" />
              <div className="absolute inset-0 opacity-[0.15] bg-radial-dots" />
            </div>

            {/* HERO: BRANDING & EMOTIONAL HOOK */}
            <header className="relative z-10 pt-16 sm:pt-24 pb-10 px-4 sm:px-6 max-w-6xl mx-auto text-center">
              <span className="inline-block text-[10px] tracking-[0.3em] uppercase mb-4 font-mono text-blue-400 font-bold">
                Buon compleanno, {giftConfig.partnerName}
              </span>
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase italic font-display">
                {giftConfig.ticketDetails.artist}{" "}
                <span className="inline-block pr-[0.15em] -mr-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-400">
                  {new Date(giftConfig.ticketDetails.countdownTarget).getFullYear()}
                </span>
              </h1>
              <p className="mt-5 text-lg sm:text-2xl font-light italic text-blue-300">
                &quot;{giftConfig.ticketDetails.subTitle}&quot;
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <Calendar size={12} className="text-blue-400" />
                  {giftConfig.ticketDetails.dateString}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <MapPin size={12} className="text-blue-400" />
                  {giftConfig.ticketDetails.location.split(",")[0]}
                </span>
              </div>
            </header>

            <main className="relative z-10 px-4 sm:px-6 pb-24 max-w-6xl mx-auto space-y-16 sm:space-y-24">
              {/* 1. Biglietto Digitale */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <TicketScreen />
              </motion.section>

              {/* 2. Countdown + Spotify affiancati */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
              >
                <Countdown />
                <SpotifyWidget />
              </motion.section>

              {/* 3. Dedica */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <LoveLetter />
              </motion.section>

              {/* 4. Galleria */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Gallery />
              </motion.section>
            </main>

            {/* FOOTER */}
            <footer className="relative z-10 border-t border-white/5">
              <div className="max-w-6xl mx-auto px-6 pt-10 pb-28 flex flex-col md:flex-row justify-between items-center text-center text-[10px] uppercase tracking-[0.3em] text-white/40 gap-4">
                <div>Buon Compleanno Vita Mia</div>
                <div>{giftConfig.ticketDetails.dateString} • Stadio Maradona</div>
                <div className="inline-flex items-center gap-1.5">
                  Made with <Heart size={10} className="text-pink-500 fill-current" />
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
