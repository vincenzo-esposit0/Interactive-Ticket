import { motion } from "motion/react";
import { Music, ExternalLink, Sparkles } from "lucide-react";

export default function SpotifyWidget() {
  const playlistUrl = "https://open.spotify.com/artist/27LlKWxS3KXW7RRAxN5S8s";
  const embedUrl = "https://open.spotify.com/embed/artist/27LlKWxS3KXW7RRAxN5S8s?utm_source=generator&theme=0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="h-full w-full bg-[#0a0a0f] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
      id="spotify-playlist-widget"
    >
      {/* Sfondo d'atmosfera con sfumatura verde/blu neon */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#1DB954]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header del Widget */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1DB954]/10 border border-[#1DB954]/30 flex items-center justify-center text-[#1DB954]">
            <Music size={20} className="animate-pulse" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#1DB954] flex items-center gap-1">
              <Sparkles size={8} /> SPOTIFY PLAYLIST
            </span>
            <h4 className="text-md font-bold text-white tracking-tight">
              Entra nel mood del Concerto
            </h4>
          </div>
        </div>

        {/* Pulsante per Aprire Spotify */}
        <motion.a
          href={playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(29, 185, 84, 0.3)" }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs rounded-full transition-all tracking-wide shadow-lg"
          title="Apri la playlist ufficiale su Spotify"
        >
          <span>Apri su Spotify</span>
          <ExternalLink size={12} />
        </motion.a>
      </div>

      <p className="text-xs text-slate-400 text-left mb-5 leading-relaxed">
        Ascolta i brani di <span className="text-white font-semibold">Geolier</span> sul suo profilo Spotify ufficiale per entrare nel mood e prepararti a cantare a squarciagola allo Stadio Maradona!
      </p>

      {/* Spotify Embed Player */}
      <div className="relative z-10 rounded-2xl overflow-hidden bg-black/40 border border-white/5 shadow-inner">
        <iframe
          style={{ borderRadius: "12px" }}
          src={embedUrl}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Geolier Spotify Profile"
        ></iframe>
      </div>
    </motion.div>
  );
}
