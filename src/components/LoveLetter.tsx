import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MailOpen, Mail, Sparkles } from "lucide-react";
import { giftConfig } from "../config";

interface FloatingHeart {
  id: number;
  x: number; // Posizione X percentuale
  size: number; // Dimensione in px
  delay: number; // Delay animazione
  duration: number; // Durata animazione in secondi
}

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  // Funzione per generare cuori che volano verso l'alto
  const triggerHearts = () => {
    const newHearts: FloatingHeart[] = Array.from({ length: 22 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 90 + 5, // Posizione X tra 5% e 95%
      size: Math.random() * 16 + 10, // Dimensione tra 10px e 26px
      delay: Math.random() * 2, // Fino a 2 secondi di delay
      duration: Math.random() * 3 + 3, // Da 3 a 6 secondi di volo
    }));
    setHearts((prev) => [...prev, ...newHearts]);
  };

  // Se l'utente apre la lettera, facciamo esplodere i cuori
  useEffect(() => {
    if (isOpen) {
      triggerHearts();
      // Generiamo ulteriori cuori periodicamente se rimane aperto
      const interval = setInterval(triggerHearts, 4000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Rimuoviamo i cuori vecchi per non sovraccaricare la memoria
  useEffect(() => {
    if (hearts.length > 80) {
      setHearts((prev) => prev.slice(30));
    }
  }, [hearts]);

  return (
    <div id="sezione-dedica" className="relative w-full max-w-2xl mx-auto text-center overflow-hidden bg-[#0a0a0f] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl">
      {/* Contenitore Cuori Volanti */}
      <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
        <AnimatePresence>
          {isOpen &&
            hearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ top: "100%", opacity: 0 }}
                animate={{
                  top: "-10%",
                  opacity: [0, 0.9, 0.9, 0],
                  x: [0, Math.random() * 40 - 20, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: heart.duration,
                  delay: heart.delay,
                  ease: "easeOut",
                }}
                className="absolute text-blue-400 fill-current pointer-events-none drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                style={{ left: `${heart.x}%`, width: heart.size, height: heart.size }}
              >
                <Heart size={heart.size} className="fill-current" />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <div className="mb-6 flex flex-col items-center relative z-10">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400 font-bold">
          IL MESSAGGIO FINALE
        </span>
        <h3 className="text-2xl sm:text-3xl font-black italic uppercase text-white mt-2 font-display tracking-tight">La tua dedica speciale</h3>
      </div>

      <div className="relative z-10">
        {/* BUSTA DA LETTERE (Se non è ancora aperta) */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              onClick={() => setIsOpen(true)}
              className="bg-black/40 border border-white/10 rounded-2xl p-6 sm:p-8 cursor-pointer hover:shadow-blue-500/10 hover:border-blue-500/30 group max-w-sm mx-auto transition-all duration-300"
              id="busta-lettera-chiusa"
            >
              <div className="relative w-16 h-16 mx-auto bg-white/5 rounded-full border border-white/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/10 group-hover:border-blue-500/40 transition-colors">
                <Mail size={24} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="absolute -inset-1 rounded-full border border-blue-500/10 pointer-events-none group-hover:border-blue-500/20"
                />
              </div>

              <h4 className="text-sm font-bold text-white mb-2 group-hover:text-blue-300 transition-colors font-display">
                C'è un messaggio per te
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-5">
                Clicca sulla busta per sbloccare e leggere la dedica che ho scritto per te.
              </p>

              <button className="bg-gradient-to-r from-blue-600 to-pink-600 text-white font-bold text-[10px] uppercase tracking-widest px-6 py-2.5 rounded-full shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all">
                Apri la lettera 💌
              </button>
            </motion.div>
          ) : (
            /* LETTERA APERTA (Scorrimento morbido stile pergamena futuristica) */
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="bg-black/60 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative text-left backdrop-blur-md max-w-xl mx-auto"
              id="lettera-aperta-dedica"
            >
              {/* Bottone per richiudere */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 text-[9px] font-mono px-2 py-0.5 rounded-full bg-black border border-white/10 transition-colors"
                title="Richiudi busta"
              >
                Chiudi
              </button>

              {/* Decorazione d'angolo */}
              <div className="absolute top-4 left-4 text-blue-500/50">
                <MailOpen size={14} />
              </div>

              {/* Titolo Dedica */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                <Heart size={16} className="text-blue-400 fill-current animate-pulse" />
                <h4 className="text-md sm:text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300 font-display">
                  {giftConfig.loveLetter.title}
                </h4>
              </div>

              {/* Paragrafi con ritardi a comparsa morbida */}
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                {giftConfig.loveLetter.paragraphs.map((para, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Firma Finale */}
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-end">
                <div>
                  <p className="text-[8px] text-slate-500 font-mono tracking-widest">DEDICATO CON TUTTO IL CUORE</p>
                  <p className="text-sm font-bold text-white tracking-wide mt-1 italic font-display">
                    {giftConfig.loveLetter.signature}
                  </p>
                </div>
                
                {/* Micro animazione di bacio o cuoricini */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-2 rounded-full"
                >
                  <Heart size={14} className="fill-current" />
                </motion.div>
              </div>

              {/* Pulsante lancia-cuori manuale */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={triggerHearts}
                  className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-blue-400 bg-blue-500/5 border border-blue-500/10 px-3.5 py-2 rounded-full hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
                >
                  <Sparkles size={10} className="text-blue-400 animate-pulse" />
                  Manda altri cuori ❤️
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
