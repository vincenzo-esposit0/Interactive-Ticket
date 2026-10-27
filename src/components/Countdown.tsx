import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { giftConfig } from "../config";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Calcolo del Countdown
  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(giftConfig.ticketDetails.countdownTarget).getTime();
      const diff = target - Date.now();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-[#0a0a0f] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-center">
      {/* Cerchi colorati d'atmosfera nello sfondo */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2 justify-center mb-6 relative z-10">
        <Clock size={15} className="text-blue-400 animate-pulse" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
          Il Nostro Countdown
        </span>
      </div>

      {/* Cifre Countdown */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 relative z-10">
        {[
          { label: "GIORNI", value: timeLeft.days },
          { label: "ORE", value: timeLeft.hours },
          { label: "MINUTI", value: timeLeft.minutes },
          { label: "SECONDI", value: timeLeft.seconds },
        ].map((item) => (
          <div key={item.label} className="text-center bg-white/[0.03] border border-white/5 rounded-2xl py-4">
            <span className="text-3xl sm:text-4xl font-black italic text-white leading-none block font-display tabular-nums">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[8px] sm:text-[9px] text-slate-500 font-mono tracking-widest uppercase block mt-2 font-bold">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <p className="text-center text-[11px] text-slate-500 mt-6 relative z-10">
        {giftConfig.ticketDetails.dateString} · ore {giftConfig.ticketDetails.timeString}
      </p>
    </div>
  );
}
