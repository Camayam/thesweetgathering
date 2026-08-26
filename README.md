# Cakes & Tea — event landing page

A one-page site for a cake-and-tea community gathering, styled like a recipe card.
Plain HTML/CSS/JS — no build step, no dependencies to install.

```
cakes-and-tea/
├── index.html      ← page content — edit this first
├── css/styles.css  ← all styling
├── js/script.js    ← small scroll-reveal effect
└── CNAME           ← your custom domain (see below)
```

## 2. Add your photos

Drop your images straight into the `assets/` folder using these exact filenames —
the page is already wired up to look for them:

| Slot                | Filename          | Suggested shape        |
|---------------------|-------------------|--------------------------|
| Gallery photo 1–6   | `cake-1.jpg` … `cake-6.jpg` | Landscape, roughly 4:3 |
| Baker's portrait    | `baker.jpg`       | Square, cropped to a face |

Until you add a file, that slot shows a dashed "add photo" placeholder instead of a
broken image — so it's safe to launch before every photo is in. Also update the
`alt="[...]"` text and the handwritten captions under each photo in `index.html` to
describe what's actually in the picture.

You can rename slots or add more by copying a `<figure class="photo-slot">` block in
the "From the Kitchen" section — just keep the filenames matching what's in `assets/`.

## 3. Fill in the rest of your details

Open `index.html` and replace everything else in `[brackets]`:

- Date, time, and place (in the "details" row near the top)
- The baker's bio and signature bake (in "The Baker" section)
- The RSVP email address (`mailto:you@example.com` — search for `example.com`)

Everything else — headline, copy, sections — is ready to use as-is, but feel free to
rewrite it in your own voice.

## 4. Preview it locally

Just open `index.html` in a browser — no server needed. Or, if you have Python:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## 5. Put it on GitHub

```bash
cd cakes-and-tea
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

If you don't have the repo yet, create an empty one first on github.com (no README,
no .gitignore — you already have files).

## 6. Turn on GitHub Pages

1. On GitHub, go to your repo → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. After a minute, GitHub shows your site at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

## 7. Point your Namecheap domain at it

**Delete the placeholder `CNAME` file first if you're not using a custom domain yet** —
GitHub Pages will complain about it otherwise. If you *are* using your domain, put it
in that file (already set up for you, just edit the domain name inside).

### Option A — use the whole domain (e.g. `yourdomain.com`)

In Namecheap → **Domain List** → your domain → **Manage** → **Advanced DNS**,
add these **A Records**, host `@`, pointing to GitHub's four IPs:

| Type | Host | Value             |
|------|------|--------------------|
| A    | @    | 185.199.108.153    |
| A    | @    | 185.199.109.153    |
| A    | @    | 185.199.110.153    |
| A    | @    | 185.199.111.153    |

Also add, so `www` works too:

| Type  | Host | Value                          |
|-------|------|----------------------------------|
| CNAME | www  | YOUR-USERNAME.github.io.        |

### Option B — use a subdomain (e.g. `party.yourdomain.com`)

Just add one record:

| Type  | Host  | Value                          |
|-------|-------|----------------------------------|
| CNAME | party | YOUR-USERNAME.github.io.       |

### Then tell GitHub about the domain

1. Repo → **Settings** → **Pages** → **Custom domain** → enter your domain → **Save**.
   (This writes the `CNAME` file in your repo automatically — you can also just edit
   the one already included here and commit it.)
2. DNS changes can take anywhere from a few minutes to a few hours to propagate.
3. Once it resolves, tick **Enforce HTTPS** in the same Pages settings panel.

## Notes

- The teacup steam animation and section fade-ins respect `prefers-reduced-motion`.
- Fonts (Fraunces, Newsreader, Courier Prime, Caveat) load from Google Fonts via the
  `<link>` tags in `index.html` — no local font files needed.
- Everything is a single page; if you want more pages later (e.g. a photo gallery of
  past bakes), add more `.html` files and link to them from the nav.
