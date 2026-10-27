# Interactive Ticket 💙

Biglietto digitale interattivo per il concerto di Geolier — un regalo a sorpresa.

## Personalizzazione

Tutti i testi (nomi, dettagli del biglietto, dedica, musica) si trovano in [`src/config.ts`](src/config.ts).

## Sviluppo locale

```bash
npm install
npm run dev
```

Il sito è disponibile su http://localhost:3000.

## Pubblicazione su GitHub Pages

Il deploy è automatico tramite GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)):

1. Su GitHub apri **Settings → Pages** e in **Source** scegli **GitHub Actions**.
2. Fai push sul branch `main`.
3. Dopo un paio di minuti il sito sarà online su `https://<tuo-utente>.github.io/Interactive-Ticket/`.
