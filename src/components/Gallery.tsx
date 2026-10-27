import { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image, X, Sparkles, MapPin, Eye, ArrowLeft, ArrowRight } from "lucide-react";

interface GalleryItem {
  id: string;
  category: "artist" | "venue" | "atmosphere";
  title: string;
  description: string;
  url: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "artist-live",
    category: "artist",
    title: "Geolier Live",
    description: "Il re indiscusso della scena napoletana sul palco, pronto a far tremare lo stadio con barre affilate e melodie travolgenti.",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    alt: "Cantante rap sul palco illuminato da faretti blu e fumo atmosferico"
  },
  {
    id: "stadium-night",
    category: "venue",
    title: "Stadio Diego Armando Maradona",
    description: "L'iconico tempio di Fuorigrotta illuminato da fari azzurri e blu sotto il cielo notturno di Napoli, pronto ad accoglierci.",
    url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
    alt: "Stadio di notte gremito e illuminato dai fari"
  },
  {
    id: "crowd-energy",
    category: "atmosphere",
    title: "Un Mare di Luci",
    description: "Migliaia di smartphone accesi cantano all'unisono, creando un'atmosfera magica e intima che toglie il fiato.",
    url: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=800&q=80",
    alt: "Marea di folla a un concerto nello stadio con luci accese"
  },
  {
    id: "concert-vibe",
    category: "atmosphere",
    title: "Il Coro di Fuorigrotta",
    description: "L'energia sprigionata dalla curva quando le prime note di 'I P' ME, TU P' TE' inizieranno a risuonare nell'aria napoletana.",
    url: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    alt: "Palco con luci calde ed energia e mani alzate a tempo"
  }
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<"all" | "artist" | "venue" | "atmosphere">("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => activeTab === "all" || item.category === activeTab
  );

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    const newIndex = selectedPhotoIndex === 0 ? filteredItems.length - 1 : selectedPhotoIndex - 1;
    setSelectedPhotoIndex(newIndex);
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    const newIndex = selectedPhotoIndex === filteredItems.length - 1 ? 0 : selectedPhotoIndex + 1;
    setSelectedPhotoIndex(newIndex);
  };

  return (
    <div className="w-full bg-[#0a0a0f] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden" id="gallery-container">
      {/* Glow d'atmosfera azzurro */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />

      {/* Titolo e Intestazione della Galleria */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-950/40 border border-blue-500/20 text-blue-400 text-[10px] font-mono mb-2">
            <Image size={10} className="animate-pulse" />
            GALLERIA DELL'EVENTO
          </div>
          <h3 className="text-xl sm:text-2xl font-black italic uppercase font-display text-white tracking-tight flex items-center gap-2">
            L'Atmosfera dello Show <Sparkles size={16} className="text-blue-400" />
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Sfoglia i momenti visivi che definiscono lo Stadio Maradona e Geolier.
          </p>
        </div>

        {/* Tab di Filtro */}
        <div className="flex flex-wrap gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5 self-start md:self-auto" id="gallery-tabs">
          {[
            { id: "all", label: "Tutti" },
            { id: "artist", label: "Artista" },
            { id: "venue", label: "Stadio" },
            { id: "atmosphere", label: "Atmosfera" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSelectedPhotoIndex(null);
              }}
              className={`px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              id={`tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Griglia delle Foto con Framer Motion */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        id="gallery-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative h-56 lg:h-72 rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-slate-900 shadow-lg"
              onClick={() => setSelectedPhotoIndex(index)}
              id={`gallery-item-${item.id}`}
            >
              {/* Immagine */}
              <img
                src={item.url}
                alt={item.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />

              {/* Overlay Sfumato */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Contenuto di Testo sul Card */}
              <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[8px] font-mono font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                  {item.category === "artist" && "L'ARTISTA"}
                  {item.category === "venue" && <><MapPin size={8} /> STADIO DI FUORIGROTTA</>}
                  {item.category === "atmosphere" && "DENTRO LO SHOW"}
                </span>
                <h4 className="text-sm font-bold text-white tracking-tight flex items-center justify-between">
                  {item.title}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-400">
                    <Eye size={14} />
                  </span>
                </h4>
                <p className="text-[10px] text-slate-300 mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* LIGHTBOX MODALE IN FULLSCREEN */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedPhotoIndex(null)}
            id="gallery-lightbox"
          >
            {/* Bottone Chiudi */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-full transition-all duration-200 z-50"
              id="btn-close-lightbox"
            >
              <X size={20} />
            </button>

            {/* Contenitore Immagine e Comandi */}
            <div className="relative max-w-3xl w-full flex flex-col items-center justify-center gap-4">
              <div 
                className="relative w-full max-h-[60vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={filteredItems[selectedPhotoIndex].id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={filteredItems[selectedPhotoIndex].url}
                  alt={filteredItems[selectedPhotoIndex].alt}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[60vh] object-contain rounded-2xl"
                />

                {/* Frecce Navigazione */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full hover:scale-105 transition-all border border-white/5 cursor-pointer z-10"
                  id="btn-prev-photo"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full hover:scale-105 transition-all border border-white/5 cursor-pointer z-10"
                  id="btn-next-photo"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Informazioni di Testo Lightbox */}
              <motion.div
                key={`desc-${filteredItems[selectedPhotoIndex].id}`}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center max-w-xl px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block mb-1">
                  {filteredItems[selectedPhotoIndex].category === "artist" && "GEOLIER - L'ARTISTA"}
                  {filteredItems[selectedPhotoIndex].category === "venue" && "STADIO MARADONA - NAPOLI"}
                  {filteredItems[selectedPhotoIndex].category === "atmosphere" && "L'ATMOSFERA DELLO SHOW"}
                </span>
                <h4 className="text-xl font-black text-white italic uppercase font-display tracking-tight">
                  {filteredItems[selectedPhotoIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {filteredItems[selectedPhotoIndex].description}
                </p>
                <div className="text-[10px] text-slate-500 font-mono mt-3">
                  {selectedPhotoIndex + 1} di {filteredItems.length}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
