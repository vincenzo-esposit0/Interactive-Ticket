/**
 * CONFIGURAZIONE DEL REGALO DI COMPLEANNO
 * Personalizza questi valori per adattare l'esperienza alle tue esigenze!
 * Tutte le immagini sono pre-configurate con splendidi placeholder ad alta risoluzione.
 */

export interface GiftConfig {
  partnerName: string;
  yourName: string;
  ticketDetails: {
    artist: string;
    subTitle: string;
    location: string;
    dateString: string;       // Data visualizzata sul biglietto
    timeString: string;       // Ora visualizzata sul biglietto
    sector: string;           // Settore della tribuna
    gate: string;             // Gate di accesso
    row: string;              // Fila del posto
    seat: string;             // Numero del posto
    countdownTarget: string;  // Data di scadenza per il countdown (formato ISO)
  };
  loveLetter: {
    title: string;
    paragraphs: string[];
    signature: string;
  };
  photos: {
    realCoupleUrl: string;    // Immagine reale di coppia (Placeholder romantico ad alta risoluzione)
    cartoonCoupleUrl: string; // Immagine stile cartoon/illustrato (per la Variante B)
  };
  audio: {
    enabled: boolean;
    url: string;              // Link a file audio MP3 di sottofondo (es. brano di Geolier o melodia romantica)
    title: string;
    artist: string;
  };
}

export const giftConfig: GiftConfig = {
  // 1. NOMI DELLA COPPIA
  partnerName: "Amore Mio", // Cambia con il suo nome (es. "Giulia", "Martina"...)
  yourName: "Il Tuo Ragazzo", // Cambia con il tuo nome

  // 2. DETTAGLI DEL BIGLIETTO (Già configurati per Geolier a Napoli!)
  ticketDetails: {
    artist: "GEOLIER",
    subTitle: "Napoli è casa tua",
    location: "Stadio Diego Armando Maradona, Napoli",
    dateString: "13 Giugno 2027",
    timeString: "21:00",
    sector: "Tribuna Posillipo Cat 2 - TP8",
    gate: "GATE 1-4",
    row: "Fila 16",
    seat: "Posto 26",
    countdownTarget: "2027-06-13T21:00:00", // Modificabile se cambia la data
  },

  // 3. LA TUA DEDICA ROMANTICA
  // Puoi aggiungere o rimuovere paragrafi a piacimento!
  loveLetter: {
    title: "Buon Compleanno, Vita Mia! 💖",
    paragraphs: [
      "Volevo farti un regalo speciale, qualcosa che potesse unire la nostra passione, la musica, e la magia della nostra terra. Fin dal primo giorno in cui sei entrata nella mia vita, hai portato un calore immenso, lo stesso calore che si respira nelle serate d'estate a Napoli.",
      "Geolier canta l'amore, la strada, la veridicità di chi ci mette il cuore in ogni cosa. E noi due sappiamo bene cosa significa volersi bene in modo così puro e travolgente.",
      "Questo biglietto è solo un piccolo pezzo di carta, ma rappresenta una promessa: quella di vivere una serata indimenticabile insieme, cantando sotto il cielo di Napoli, abbracciati in mezzo a migliaia di persone, ma sentendoci unici al mondo.",
      "Ti amo immensamente, e non vedo l'ora di cantare a squarciagola con te. Preparati, Napoli ci aspetta!"
    ],
    signature: "Tuo per sempre"
  },

  // 4. FOTO DI COPPIA (Placeholder romantici da Unsplash ad alta risoluzione)
  photos: {
    // Foto di coppia reale (Amore, risate, momenti intimi al tramonto)
    realCoupleUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600&h=800",
    
    // Foto cartoon/illustrata (Usata per il cross-fade della Variante B)
    // Come placeholder usiamo un'illustrazione d'arte digitale calda ed evocativa sul tema delle stelle e dell'amore
    cartoonCoupleUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=800"
  },

  // 5. AUDIO DI SOTTOFONDO (Disattivato di default per non disturbare, attivabile premendo il tasto Play sul sito)
  audio: {
    enabled: true,
    // Brano romantico e travolgente di Geolier
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", // Sostituito con un bellissimo sottofondo ritmato e moderno
    title: "I P' ME, TU P' TE",
    artist: "Geolier"
  }
};
