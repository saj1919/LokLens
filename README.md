# 🏛️ LokLens

### A clear look at the Lok Sabha

**🔗 Live site: https://saj1919.github.io/LokLens/**
**📦 Repository: https://github.com/saj1919/LokLens**

LokLens is a transparency dashboard for **all 543 members of India's 18th Lok
Sabha (2024)**. It brings together each MP's affidavit-declared assets,
education, criminal cases, occupation, photo and a short profile — with
clickable stats and infographics — into one fast, mobile-friendly website.

It is a static site: plain HTML/CSS/JavaScript, no server, no build step. It
runs directly on GitHub Pages.

---

## ✨ Features

- **Stats & infographics dashboard** — seats by party, average assets, criminal
  cases and case types, education levels, occupations beyond politics, and
  leaderboards (richest MPs, most cases, highest liabilities).
- **Every stat is clickable** — tap any number, chart bar/slice or leaderboard
  row to see exactly which MPs are behind it, then jump straight to a full
  profile.
- **Find an MP** — search by name, and filter by **state**, **party** or
  **occupation** (e.g. list all 17 actor-MPs or all 42 lawyers).
- **Full 543 coverage** — every elected member, with verified affidavit data
  for the vast majority and richer biographies for a curated set.
- **Photos** — MP portraits resolved live from Wikipedia, with clean initials
  as a fallback.
- **Mobile-friendly** — responsive layout down to small phones.

## 📊 Data & coverage

| Field | Coverage |
|-------|----------|
| Roster (name, party, constituency, state) | 543 / 543 |
| Assets, liabilities, education, criminal cases (affidavits) | 528 / 543 |
| Occupation + short bio | 534 / 543 |
| Live photos (Wikipedia) | ~292 / 543 (rest show initials) |
| Deep profiles (family, allegations, timeline) | curated subset |

Figures are **self-declared by candidates in sworn 2024 election affidavits**.
**Pending criminal cases are allegations, not convictions.** A small number of
records are marked *N/A* where a source could not be matched — never guessed.

## 🗂️ Data sources
- **MyNeta / ADR** — affidavit data (assets, liabilities, education, cases)
- **Election Commission of India** — results and margins
- **Wikipedia / Wikimedia Commons** — biographies, occupations, photos
- **Reputable press** — allegations, notable work, timelines (cited on profiles)

## 🧱 Tech
Static HTML/CSS/JS. Charts via [Chart.js](https://www.chartjs.org/) (CDN).
Photos resolved at runtime through the Wikipedia PageImages API. No frameworks,
no bundler, no backend.

## 📁 Files
| File | Purpose |
|------|---------|
| `index.html` | Stats & infographics dashboard |
| `mps.html` | Find-an-MP: search, filters, profiles |
| `data_full.js` | The dataset — all 543 MPs |
| `photos.js` | Baked-in portraits for prominent MPs |
| `common.js` | Shared helpers (formatting, live photos, analytics) |
| `styles.css` | Responsive styling |
| `.nojekyll` | Serve files as-is on GitHub Pages |
| `LICENSE` | Usage terms (CC BY-NC-ND 4.0) |

## 🚀 Run locally
Because photos load over the network, open it via a tiny local server rather
than double-clicking the file:
```bash
# from the project folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🌐 Deploy on GitHub Pages
1. Push these files to the **root** of the repo (`saj1919/LokLens`).
2. **Settings → Pages → Source:** *Deploy from a branch* → **Branch: `main`**,
   **Folder: `/ (root)`** → **Save**.
3. Live in ~1 minute at **https://saj1919.github.io/LokLens/**.

To update data later, replace `data_full.js` and push — Pages redeploys
automatically.

## 🗺️ Roadmap
- Official MyNeta candidate photos to fill remaining faces
- Deeper per-MP detail (family, key controversies, term history)
- Wealth-growth-across-elections and MPLADS fund views

## ⚖️ License
© 2026 saj1919. Licensed under **CC BY-NC-ND 4.0** — free to share with
attribution, no commercial use, no derivatives. See [`LICENSE`](LICENSE).
MP data belongs to its public sources; LokLens claims no ownership of it.
This project is independent and not affiliated with any party, candidate,
government body, or data source.

> **Disclaimer:** LokLens is an informational tool. Data may be incomplete or
> out of date and should be verified against primary sources before being
> relied upon. Nothing here is an accusation or an endorsement of any person.
