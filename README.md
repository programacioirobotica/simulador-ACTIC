# Simulador ACTIC Nivell 1

Projecte React + TypeScript + Vite + Tailwind per simular la prova ACTIC Nivell 1.

## Provar-ho sense instal·lar res local

1. Crea un repositori nou a GitHub.
2. Puja aquest codi a la branca `main`.
3. A GitHub, ves a `Settings > Pages` i a `Build and deployment` selecciona `Source: GitHub Actions`.
4. Fes un push a `main` (o executa manualment el workflow `Deploy ACTIC Simulator to GitHub Pages`).
5. GitHub publicarà la web automàticament.

## Notes de desplegament

- El workflow és a `.github/workflows/deploy-pages.yml`.
- En mode GitHub Pages, el router funciona amb hash (`/#/exam`) per evitar errors 404 en rutes internes.
- Si mai vols canviar la base URL manualment, pots definir `VITE_BASE_PATH` al workflow.

## Comandes (si algun dia tens Node disponible)

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run test`
