import { useState, useRef, MouseEvent } from "react";
import { motion } from "motion/react";
import { Calendar, MapPin, Ticket as TicketIcon, Sparkles } from "lucide-react";
import { giftConfig } from "../config";

export default function TicketScreen() {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Posizione per l'effetto di riflesso speculare sul biglietto
  const [glareX, setGlareX] = useState(0);
  const [glareY, setGlareY] = useState(0);
  
  // Tilt angles
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    setRotateX(-relativeY * 16); // max 8 gradi
    setRotateY(relativeX * 16);  // max 8 gradi
    
    // Specular glare position
    const gX = ((e.clientX - rect.left) / width) * 100;
    const gY = ((e.clientY - rect.top) / height) * 100;
    setGlareX(gX);
    setGlareY(gY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Intestazione Sezione */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/30 text-blue-400 text-xs font-mono mb-3"
        >
          <TicketIcon size={12} className="animate-pulse" />
          ECCO IL TUO BIGLIETTO REALE
        </motion.div>
        
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight uppercase font-display italic">
          Sorpresa Svelata! 💙
        </h2>
        <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
          Preparati per una notte indimenticabile. Passa sopra col mouse o tocca il biglietto per vederlo brillare!
        </p>
      </div>

      {/* BIGLIETTO INTERATTIVO 3D */}
      <div className="relative w-full flex justify-center">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
          className="w-full max-w-[400px] sm:max-w-[720px] transition-all duration-300 cursor-grab active:cursor-grabbing"
          id="biglietto-concerto-geolier"
        >
          <motion.div
            animate={{
              rotateX: rotateX,
              rotateY: rotateY,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 12, mass: 0.5 }}
            className="relative w-full bg-[#0a0a0f] border-2 border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Effetto Vetro Riflettente (Glint/Specular) */}
            <div
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
              style={{
                opacity: isHovered ? 0.15 : 0,
                background: `radial-gradient(circle 180px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.8), transparent 70%)`,
              }}
            />

            {/* HEADER BAND */}
            <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white z-10 relative">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase font-mono">
                Ticket Evento Ufficiale
              </span>
              <div className="flex gap-1.5 items-center">
                <div className="w-2 h-2 rounded-full bg-white/70 animate-ping absolute" />
                <div className="w-2 h-2 rounded-full bg-white/90" />
                <div className="w-2 h-2 rounded-full bg-white/30" />
              </div>
            </div>

            {/* MAIN CONTENT SPLIT */}
            <div className="flex flex-col sm:flex-row relative z-10">
              {/* PARTE SINISTRA: DETTAGLI DELLO SHOW */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between ">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-blue-400 uppercase font-bold">
                      LIVE IN CONCERT
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded text-[10px] font-semibold border border-amber-400/20">
                      <Sparkles size={10} />
                      POSTO RISERVATO
                    </div>
                  </div>

                  {/* Nome Artista */}
                  <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase font-display italic">
                    {giftConfig.ticketDetails.artist}
                  </h3>
                  
                  {/* Sottotitolo del Tour */}
                  <p className="text-md sm:text-lg font-medium text-blue-400 tracking-wide mt-1">
                    &quot;{giftConfig.ticketDetails.subTitle}&quot;
                  </p>
                </div>

                {/* Data e Luogo con icone */}
                <div className="mt-8 space-y-3.5 border-t border-white/5 pt-6">
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                      <Calendar size={15} />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">DATA E ORA</p>
                      <p className="text-sm font-bold text-white">
                        {giftConfig.ticketDetails.dateString} — {giftConfig.ticketDetails.timeString}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                      <MapPin size={15} />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">LUOGO</p>
                      <p className="text-sm font-bold text-white leading-tight">
                        {giftConfig.ticketDetails.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEPARATORE CON NOTCHES (PERFORAZIONE) */}
              <div className="relative h-0 sm:h-auto sm:w-0 z-20 border-t sm:border-t-0 sm:border-l border-dashed border-white/15">
                <div className="absolute w-6 h-6 bg-[#020205] rounded-full border-2 border-white/10 -left-3 -top-3 sm:left-[-12px] sm:-top-3" />
                <div className="absolute w-6 h-6 bg-[#020205] rounded-full border-2 border-white/10 -right-3 -top-3 sm:right-auto sm:left-[-12px] sm:top-auto sm:-bottom-3" />
              </div>

              {/* PARTE DESTRA: DETTAGLI POSTO & BARCODE */}
              <div className="p-6 sm:p-8 bg-black/40 sm:w-64 shrink-0 flex flex-col justify-between relative z-10">
                {/* Mappa dei settori del posto */}
                <div className="space-y-4">
                  <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold block">
                    DETTAGLI ACCESSO
                  </span>

                  <div className="grid grid-cols-[1fr_auto] gap-3">
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl min-w-0">
                      <p className="text-[8px] text-slate-500 font-mono uppercase tracking-wide">SETTORE</p>
                      <p className="text-xs font-bold text-white mt-0.5 leading-snug">
                        {giftConfig.ticketDetails.sector.split(" - ")[0]}
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                      <p className="text-[8px] text-slate-500 font-mono uppercase tracking-wide">ZONA</p>
                      <p className="text-xs font-bold text-white mt-0.5">
                        {giftConfig.ticketDetails.sector.split(" - ")[1] || "TP8"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 border border-white/10 p-2 rounded-lg text-center">
                      <p className="text-[8px] text-slate-500 font-mono">GATE</p>
                      <p className="text-xs font-bold text-white mt-0.5">{giftConfig.ticketDetails.gate.replace("GATE ","")}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded-lg text-center">
                      <p className="text-[8px] text-slate-500 font-mono">FILA</p>
                      <p className="text-xs font-bold text-blue-400 mt-0.5">{giftConfig.ticketDetails.row.replace("Fila ","")}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded-lg text-center">
                      <p className="text-[8px] text-slate-500 font-mono">POSTO</p>
                      <p className="text-xs font-bold text-blue-400 mt-0.5">{giftConfig.ticketDetails.seat.replace("Posto ","")}</p>
                    </div>
                  </div>
                </div>

                {/* BARCODE STILIZZATO (CSS puro ad altissimo realismo) */}
                <div className="mt-8 flex flex-col items-center">
                  <div className="w-full bg-white/95 p-3 rounded-xl flex flex-col items-center shadow-lg">
                    {/* Codice a Barre */}
                    <div className="flex h-11 w-full items-stretch justify-between opacity-95 select-none">
                      {[1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 2, 4, 1, 3, 1, 2, 4, 1, 1].map((width, idx) => (
                        <div
                          key={idx}
                          className="bg-black shrink-0"
                          style={{ width: `${width * 2}px` }}
                        />
                      ))}
                    </div>
                    <span className="text-[7px] text-black font-mono tracking-[0.25em] mt-1.5 select-none font-bold">
                      *GEOLIER-NA-2027*
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
