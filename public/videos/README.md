# Demo videos (Expo apps)

Place MP4 files here so they are served at `/videos/…` from the site root (Laravel `public/`).

Expected filenames (see `src/data/featuredProjects.ts`):

| File | Project |
|------|---------|
| `punchyface-demo.mp4` | Punchyface |
| `wind-company-organisation-demo.mp4` | Company Organisation App |

The **AWS Portfolio Website** project has no video section on its detail page.

After adding files, run `npm run build` if you only changed static assets under `public/` — usually a refresh is enough for new videos.
