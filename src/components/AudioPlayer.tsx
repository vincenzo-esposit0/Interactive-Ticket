import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music, VolumeX, Volume2, Play, Pause } from "lucide-react";
import { giftConfig } from "../config";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Forza la creazione dell'elemento audio
  useEffect(() => {
    if (giftConfig.audio.enabled && giftConfig.audio.url) {
      const audio = new Audio(giftConfig.audio.url);
      audio.loop = true;
      audioRef.current = audio;

      return () => {
        audio.pause();
        audioRef.current = null;
      };
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch((err) => {
          console.warn("Audio autoplay blocked or invalid URL", err);
          setHasError(true);
        });
    }
  };

  if (!giftConfig.audio.enabled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Soundwave bars (appare solo quando in riproduzione) */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-end gap-1 bg-[#0a0a0f]/95 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 shadow-xl h-9"
          >
            <div className="text-right mr-1.5 hidden sm:block">
              <p className="text-[10px] text-slate-300 font-semibold leading-none truncate max-w-[120px]">
                {giftConfig.audio.title}
              </p>
              <p className="text-[8px] text-slate-500 font-mono leading-none mt-0.5">
                {giftConfig.audio.artist}
              </p>
            </div>
            {/* Colonne sonore che saltano */}
            <div className="flex items-end gap-0.5 h-full pb-0.5">
              {[0.6, 1.2, 0.8, 1.5, 0.5, 1.0].map((delay, index) => (
                <motion.div
                  key={index}
                  className="w-0.5 bg-blue-500 rounded-full"
                  animate={{
                    height: ["4px", "16px", "4px"]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: delay * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsante Floating */}
      <button
        onClick={togglePlay}
        className={`relative w-12 h-12 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
          isPlaying
            ? "bg-blue-600 text-white shadow-blue-600/30 border border-blue-500"
            : "bg-black text-slate-300 hover:text-white hover:bg-zinc-900 border border-white/10"
        }`}
        id="btn-riproduzione-musica"
        aria-label={isPlaying ? "Disattiva musica" : "Attiva musica"}
        title={isPlaying ? "Metti in pausa" : "Riproduci sottofondo musicale"}
      >
        {/* Cerchio rotante d'onda sotto il pulsante per invitare all'azione */}
        {!isPlaying && (
          <span className="absolute -inset-1.5 rounded-full border border-white/10 animate-ping opacity-30 pointer-events-none" />
        )}

        {/* Effetto rotazione vinile se riproduce */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="flex items-center justify-center"
        >
          {isPlaying ? <Volume2 size={18} /> : <Music size={18} />}
        </motion.div>

        {/* Piccolo indicatore di Play/Pausa sovrapposto */}
        <div className="absolute -bottom-1 -right-1 bg-black border border-white/10 text-white rounded-full p-0.5">
          {isPlaying ? <Pause size={8} /> : <Play size={8} className="fill-current text-blue-400" />}
        </div>
      </button>

      {/* Segnalazione d'errore temporanea se fallisce l'URL */}
      {hasError && (
        <div className="absolute right-0 bottom-14 bg-red-950/90 border border-red-800 text-red-300 text-[10px] px-3 py-1.5 rounded-lg max-w-[200px] shadow-lg backdrop-blur-sm">
          Impossibile riprodurre la traccia. Verifica l'URL dell'MP3 in <code>config.ts</code>!
        </div>
      )}
    </div>
  );
}
