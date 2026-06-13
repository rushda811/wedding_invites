# Wedding Invitation — Static Vite Site

A plain Vite + React + Tailwind v4 build of the wedding invitation. No SSR, no backend — just a static site that builds to `dist/`.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

The static site is output to `dist/`. Upload that folder to **any** static host:
- Netlify (drag the `dist` folder onto netlify.com/drop)
- Vercel
- Cloudflare Pages
- GitHub Pages
- Any web server (nginx, S3, etc.)

`vite.config.ts` uses `base: "./"` so the build also works when opened from a subfolder or even directly via `file://`.
