import { useState, useRef, MouseEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Trash2, Heart, Sparkles } from "lucide-react";
import { giftConfig } from "../config";

export default function InteractivePhoto() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Immagine personalizzata salvata in localStorage per persistenza
  const [customRealPhoto, setCustomRealPhoto] = useState<string | null>(() => {
    return localStorage.getItem("custom_couple_photo_real");
  });

  const realPhotoInputRef = useRef<HTMLInputElement>(null);

  // Per l'effetto Tilt 3D della foto
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Coordinata del mouse rispetto al centro del contenitore (-0.5 a 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    // Rotazione 3D morbida ed elegante (max 12 gradi)
    setRotateX(-relativeY * 18);
    setRotateY(relativeX * 18);
    
    // Posizione per l'effetto glow (in percentuale)
    const pctX = ((e.clientX - rect.left) / width) * 100;
    const pctY = ((e.clientY - rect.top) / height) * 100;
    setGlowX(pctX);
    setGlowY(pctY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Elabora e salva l'immagine caricata
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxDim = 800; // Alta qualità ma leggero

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          
          setCustomRealPhoto(compressedDataUrl);
          localStorage.setItem("custom_couple_photo_real", compressedDataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleClearPhoto = () => {
    localStorage.removeItem("custom_couple_photo_real");
    setCustomRealPhoto(null);
    if (realPhotoInputRef.current) realPhotoInputRef.current.value = "";
  };

  return (
    <div 
      id="sezione-foto" 
      className="relative max-w-sm mx-auto p-4 sm:p-5 bg-gradient-to-b from-[#101018] to-[#07070d] border border-white/10 rounded-3xl shadow-2xl overflow-hidden text-center"
    >
      {/* Elementi decorativi d'atmosfera nello sfondo */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Titolo di Sezione Elegante */}
      <div className="mb-5 relative z-10">
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-blue-400 font-bold block mb-1">
          POSTER UFFICIALE DELL'EVENTO
        </span>
        <h3 className="text-lg font-bold text-white tracking-tight font-display">
          Geolier - Napoli è casa tua
        </h3>
      </div>

      {/* Cornice Polaroid/Galleria con effetto Tilt 3D */}
      <div className="relative flex justify-center z-10">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
          className="relative w-72 h-96 p-3 pb-12 bg-white rounded-xl shadow-2xl transition-shadow duration-500 overflow-hidden cursor-pointer border border-black/5"
          style={{
            perspective: 1000,
            boxShadow: isHovered
              ? "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
              : "0 15px 35px -5px rgba(0, 0, 0, 0.4)",
          }}
          id="polaroid-frame"
        >
          {/* Effetto Riflesso/Glow sulla foto */}
          <div
            className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{
              opacity: isHovered ? 0.4 : 0,
              background: `radial-gradient(circle 150px at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.6), transparent 80%)`,
            }}
          />

          <motion.div
            className="w-full h-[82%] relative overflow-hidden rounded-md bg-[#eef1f6]"
            animate={{
              rotateX: rotateX,
              rotateY: rotateY,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 170,
              damping: 18,
              mass: 0.6,
            }}
          >
            {customRealPhoto ? (
              <img
                src={customRealPhoto}
                alt="Il nostro scatto più bello"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            ) : (
              <img
                src="https://www.teamworld.it/wp-content/uploads/2023/12/geolier-stadi-2024.jpg"
                alt="Geolier - Napoli è casa tua"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            )}

            {/* Overlay scuro per far risaltare il caricamento al passaggio */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black z-10 pointer-events-none"
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Testo polaroid scritto a mano */}
          <div className="absolute bottom-2.5 left-0 right-0 text-center z-20 select-none">
            <p className="text-slate-800 font-bold tracking-wide text-xs font-display">
              {giftConfig.partnerName} & {giftConfig.yourName.split(" ")[1] || "Io"}
            </p>
            <p className="text-slate-500 text-[9px] font-medium flex items-center justify-center gap-1 font-mono mt-0.5">
              <span>Napoli, 2027</span>
              <Heart size={8} className="text-red-500 fill-current animate-pulse" />
            </p>
          </div>

          {/* Pulsante Interattivo di Upload o Reset al passaggio del mouse */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute inset-x-0 bottom-14 flex justify-center gap-2 z-30"
              >
                <input
                  type="file"
                  ref={realPhotoInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                
                {customRealPhoto && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      realPhotoInputRef.current?.click();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-[9px] font-bold uppercase tracking-wider shadow-lg transition-colors cursor-pointer"
                    title="Carica Foto"
                  >
                    <Camera size={10} />
                    {customRealPhoto ? "Cambia Foto" : "Carica Foto"}
                  </button>
                )}

                {customRealPhoto && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearPhoto();
                    }}
                    className="flex items-center justify-center p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors cursor-pointer"
                    title="Ripristina Poster"
                  >
                    <Trash2 size={10} />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
