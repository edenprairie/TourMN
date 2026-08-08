# Tour Minnesota (TourMN)

An interactive guide to Minnesota — food & drink, destinations, itineraries, local brands, and events.

## Stack

- React 19 + TypeScript + Vite
- react-i18next (EN / 中文)
- Leaflet for maps

## Development

```bash
npm install
npm run dev
```

## Deploy

Deploys to Cloudflare Pages (project `explore-minnesota`, production) via the
[GitHub Action](.github/workflows/deploy-cloudflare.yml) on every push to `main`.

Live: https://mn.junwang.us

## Scripts

- `npm run dev` — start dev server
- `npm run build` — type-check + production build
- `npm run lint` — ESLint
- `npm run preview` — preview the production build locally
