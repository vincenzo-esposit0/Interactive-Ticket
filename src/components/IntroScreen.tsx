import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { giftConfig } from "../config";

interface IntroScreenProps {
  onReveal: () => void;
}

export default function IntroScreen({ onReveal }: IntroScreenProps) {
  // Generiamo alcune stelle fisse per lo sfondo notturno
  const starsArray = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 80 + 5}%`,
    left: `${Math.random() * 90 + 5}%`,
    scale: Math.random() * 0.5 + 0.5,
    delay: Math.random() * 2,
  }));

  return (
    <div
      id="intro-container"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#020205] overflow-hidden px-6 text-center font-sans"
    >
      {/* Sfondo Stellato & Stadium Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.15] bg-radial-dots" />

        {starsArray.map((star) => (
          <motion.div
            key={star.id}
            className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-60"
            style={{
              top: star.top,
              left: star.left,
              boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.8)",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [star.scale * 0.8, star.scale * 1.2, star.scale * 0.8],
            }}
            transition={{
              duration: 2 + star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Luci blu di Napoli che sfumano in lontananza */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-[radial-gradient(circle_at_bottom,rgba(26,54,115,0.4)_0%,transparent_70%)] opacity-80" />
      </div>

      {/* Contenuto Principale */}
      <div className="relative z-10 max-w-md w-full flex flex-col items-center">
        {/* Piccolo badge decorativo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-1.5 bg-[#0a0a0f] border border-white/10 text-blue-400 text-[10px] uppercase tracking-widest px-4 py-2 rounded-full mb-8 font-mono font-bold"
        >
          <Sparkles size={11} className="text-blue-400 animate-pulse" />
          Qualcosa di unico per te
        </motion.div>

        {/* Dedica di benvenuto */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-3 font-bold"
        >
          Ciao {giftConfig.partnerName},
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, type: "spring" }}
          className="text-4xl sm:text-5xl font-black text-white leading-none tracking-tight mb-6 uppercase font-display italic"
        >
          Ho un regalo <br />
          <span className="inline-block pr-[0.15em] -mr-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-400">
            speciale per te...
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xs mb-12"
        >
          C'è un'emozione da vivere insieme, custodita sotto questa scatola digitale. Sei pronta a svelarla?
        </motion.p>

        {/* Pulsantone Cuore Pulsante Interactive */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.8, type: "spring" }}
          className="relative flex flex-col items-center group cursor-pointer"
          onClick={onReveal}
          id="btn-svela-regalo"
        >
          {/* Aloni luminosi pulsanti sullo sfondo */}
          <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full scale-125 group-hover:scale-150 transition-all duration-700 animate-pulse" />
          <div className="absolute inset-0 bg-pink-500/10 blur-2xl rounded-full scale-110 group-hover:scale-135 transition-all duration-700 animate-pulse delay-75" />

          {/* Cuore principale tridimensionale */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              boxShadow: [
                "0 0 20px 0px rgba(59,130,246,0.4)",
                "0 0 35px 5px rgba(59,130,246,0.6)",
                "0 0 20px 0px rgba(59,130,246,0.4)"
              ]
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-20 h-20 bg-gradient-to-tr from-blue-600 via-sky-500 to-pink-500 rounded-full flex items-center justify-center border border-white/10 z-10 cursor-pointer shadow-2xl"
          >
            <Heart size={36} className="text-white fill-current animate-pulse" />
          </motion.div>

          {/* Sotto-testo d'invito */}
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-6 text-white text-[10px] font-mono font-bold tracking-[0.3em] uppercase group-hover:text-blue-400 transition-colors"
          >
            TOCCA PER APRIRE
          </motion.span>
        </motion.div>
      </div>

      {/* Footer minimalista */}
      <div className="absolute bottom-6 left-0 right-0 text-[9px] text-white/30 tracking-[0.4em] font-mono pointer-events-none select-none uppercase">
        PROGETTATO CON AMORE DA {giftConfig.yourName.toUpperCase()}
      </div>

    </div>
  );
}
