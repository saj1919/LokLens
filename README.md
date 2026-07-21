# 🏛️ LokLens

### A clear look at India's Parliament

**🔗 Live site: https://saj1919.github.io/LokLens/**
**📦 Repository: https://github.com/saj1919/LokLens**

LokLens is a transparency dashboard for the **Parliament of India** — all
**543 members of the 18th Lok Sabha (2024)** and the **241 sitting members of
the Rajya Sabha**. It brings together each member's affidavit-declared assets,
education, criminal cases, occupation, photo and a short profile — with
clickable stats and infographics — into one fast, mobile-friendly website.

It is a static site: plain HTML/CSS/JavaScript, no server, no build step. It
runs directly on GitHub Pages.

---

## ✨ Features

- **House toggle** on the dashboard — view **All Parliament**, **Lok Sabha
  only**, or **Rajya Sabha only**; every stat and chart recalculates.
- **Every stat is clickable** — tap any number, chart bar/slice or leaderboard
  row to see exactly which members are behind it, then jump to a full profile.
- **Stats & infographics** — seats by party, average assets, criminal cases and
  case types, education levels, occupations beyond politics, and leaderboards
  (richest, most cases, highest liabilities).
- **Find a member** — search by name and filter by **House**, **state**,
  **party** or **occupation** (e.g. list all actor-MPs or all lawyers).
- **My Area (by PIN code)** — type your pincode and see your full chain of
  representatives: your exact **MP** and **MLA**, plus CM / Deputy CM / Governor,
  the state cabinet, Union ministers, and district/local office links. Powered by
  a pincode→constituency map built by spatially joining ~148k post-office
  locations against assembly-constituency boundaries (~92% of pincodes resolve to
  an exact seat; the rest safely show a short district shortlist). Regenerate
  anytime with `build_pincode_constituency.py` / `run_join.py`.
- **Photos** — portraits resolved live from Wikipedia, with clean initials as a
  fallback.
- **Mobile-friendly** — responsive layout down to small phones.

## 📊 Data & coverage

| | Lok Sabha | Rajya Sabha |
|---|---|---|
| Members | 543 | 241 (12 nominated) |
| Affidavit data (assets/education/cases) | 528 | ~106 (best-effort) |
| Occupation + short bio | 534 | ~227 |
| Photos (live, Wikipedia) | partial | partial |

Figures are **self-declared in sworn election affidavits**. **Pending criminal
cases are allegations, not convictions.** Lok Sabha data is from the 2024
general election; Rajya Sabha members are elected in staggered terms, so their
financial affidavit coverage is lower and best-effort. Missing values are shown
as *N/A* — never guessed.

## 🗂️ Data sources
- **MyNeta / ADR** — affidavit data (assets, liabilities, education, cases)
- **Election Commission of India** — results and margins
- **Wikipedia / Wikimedia Commons** — biographies, occupations, photos
- **Reputable press** — allegations, notable work, timelines (cited on profiles)

## 📁 Files
| File | Purpose |
|------|---------|
| `index.html` | Stats dashboard with the House toggle |
| `mps.html` | Find-a-member: search, House/state/party/occupation filters, profiles |
| `data_full.js` | The dataset — 784 members (both Houses) |
| `photos.js` | Baked-in portraits for prominent members |
| `common.js` | Shared helpers (formatting, live photos, analytics) |
| `styles.css` | Responsive styling |
| `.nojekyll` | Serve files as-is on GitHub Pages |
| `LICENSE` | Usage terms (CC BY-NC-ND 4.0) |

## 🚀 Run locally
Photos load over the network, so use a tiny local server rather than
double-clicking:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## 🌐 Deploy on GitHub Pages
1. Put these files at the **root** of the repo (`saj1919/LokLens`).
2. **Settings → Pages → Source:** *Deploy from a branch* → **Branch: `main`**,
   **Folder: `/ (root)`** → **Save**.
3. Live in ~1 minute at **https://saj1919.github.io/LokLens/**.

To update data later, replace `data_full.js` and push — Pages redeploys
automatically.

## 🗺️ Roadmap
- Improve Rajya Sabha affidavit coverage and official photos
- Deeper per-member detail (family, key controversies, term history)
- Wealth-growth-across-terms and constituency-development views

## ⚖️ License
© 2026 saj1919. Licensed under **CC BY-NC-ND 4.0** — free to share with
attribution, no commercial use, no derivatives. See [`LICENSE`](LICENSE).
Member data belongs to its public sources; LokLens claims no ownership of it.
Independent project, not affiliated with any party, candidate, government body,
or data source.

> **Disclaimer:** LokLens is an informational tool. Data may be incomplete or
> out of date and should be verified against primary sources before being
> relied upon. Nothing here is an accusation or an endorsement of any person.
