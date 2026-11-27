# jciambella.github.io

Personal academic website of Jacopo Ciambella, served by GitHub Pages at
<https://jciambella.github.io/>. GitHub builds it with Jekyll on every push to
`main`; there is no build step to run locally.

## Where the content lives

| To change…                         | edit                          |
|------------------------------------|-------------------------------|
| Name, position, links, photo, CV, university logo | `_config.yml` → `profile:` |
| Publications                       | `_data/publications.yml`      |
| Research themes (Home + Research)  | `_data/topics.yml`            |
| Research figures                   | `assets/img/research/` + `image:` fields in `_data/topics.yml` |
| News (home "Highlights" + /news/), optional LinkedIn posts | `_data/news.yml` |
| Invited talks                      | `_data/talks.yml`             |
| Funded projects                    | `_data/projects.yml`          |
| Students                           | `_data/people.yml`            |
| CV page (bio, positions, service…) | `_data/cv.yml`                |
| Public code                        | `_data/code.yml`              |
| Home page intro paragraph          | `index.html`                  |
| Contact page (office room, phone, office hours) | `_config.yml` → `profile:` (`office`, `phone`, `office_hours`); layout in `contact.html` |

Pages: `index.html`, `research.html`, `publications.html`, `group.html`,
`cv.html`, `contact.html`, `news.html` (linked from the Highlights tile, not from the menu). Layout in `_layouts/`, fragments in `_includes/`, styles in
`assets/css/main.css`.

## Adding a paper

Add an entry at the top of `_data/publications.yml` (the file is newest
first):

```yaml
- type: journal                # journal | conference | book
  year: 2027
  title: "Title of the paper"
  authors: ["Surname, I.", "Ciambella, J."]
  venue: "Journal of the Mechanics and Physics of Solids"
  volume: 190
  pages: "105700"              # page range or article number
  doi: "10.1016/j.jmps.2027.105700"
  topics: [visco, fracture]    # keys from _data/topics.yml
  selected: true               # optional
```

The publication list, counts, BibTeX, topic pages and "Latest publications"
on the home page all update from this one entry.

Optional links shown next to DOI and BibTeX: `pdf:` (a free full text, e.g. the
accepted manuscript on IRIS Sapienza or arXiv, where the publisher's policy
allows it), `code:` and `data:`.

## Adding a LinkedIn post to the news

Every item in `_data/news.yml` can point to a public LinkedIn post. On LinkedIn,
open the post, click "⋯" and choose "Copy link to post" (or "Embed this post" and
copy the code), then add it to the item:

```yaml
- date: "Nov 2026"
  text: "Short text shown on the site (Markdown)."
  linkedin: "https://www.linkedin.com/posts/jacopo-ciambella-4730b262_...-activity-7401234567890123456-AbCd"
  linkedin_height: 600     # optional; the height="…" value in LinkedIn's embed code
```

The home page then shows a "Discuss on LinkedIn" link under the item, and
`/news/` shows the post itself. Nothing is loaded from LinkedIn until the
visitor clicks "Show the post" (`assets/js/linkedin-embed.js`), so the site
sets no third-party cookies by default. Short `lnkd.in` links cannot be used,
and the post must be visible to "Anyone". LinkedIn offers no supported way to
pull a personal profile's posts automatically, so the list is curated by hand.

## Sharing preview

`assets/img/social-card.png` (1200×627 px) is the image LinkedIn, X, Slack and
e-mail clients show when a link to the site is shared; it is set under
`defaults:` in `_config.yml`. After changing it, LinkedIn's Post Inspector
(linkedin.com/post-inspector) refreshes LinkedIn's cached copy.

## Look and feel

The site uses the "Bento" theme: rounded tiles on a quiet background, a
floating pill menu, Geist for text and Geist Mono for small labels, with light
and dark versions that follow the visitor's system setting. The fonts are
self-hosted in `assets/fonts/` (SIL Open Font License), so no request goes to
Google Fonts. All styles are in `assets/css/main.css`: the shared layout rules
come first and the theme layer is at the end of the file; colours are the
custom properties at the top of that layer (`--bg`, `--accent`, ...).

The numbers in the home-page tiles (publications, journal articles, first
year, funded projects, projects as PI, PhD students) are counted from the
`_data` files, and the red tile shows the first entry of `_data/talks.yml`,
so they update by themselves.

## Research figures

Each theme in `_data/topics.yml` can carry a figure: put the file in
`assets/img/research/` and set `image:` (and optionally `thumb:`, `caption:`,
`credit:`, `image_alt:`) on the theme. The Home page shows a 16:10 crop on the
theme card; the Research page shows the full figure with its caption,
alternating left and right. Keep files under ~250 kB: about 1400 px wide for
`image` and 800×500 px for `thumb` (WebP keeps them small). For figures already published in a journal,
check that the publisher's author-rights policy allows reuse on a personal
website and give the source in `credit:`.

A theme can also carry a short simulation clip: put an H.264 MP4 (muted, a few
seconds, ideally under ~2 MB) in `assets/video/` and set `video:` on the theme.
The Research page then shows the clip in place of the still figure, with
`image` as its first frame; it plays only while on screen and not at all for
visitors who ask their system to reduce motion (`assets/js/research.js`).

## Photo and CV

Put a square photo (at least 400×400 px) in `assets/img/profile.jpg` and set
`profile.photo: /assets/img/profile.jpg`. For a PDF CV, add
`assets/cv.pdf` and set `profile.cv_pdf: /assets/cv.pdf`. Empty fields are
simply hidden.

## Preview locally (optional)

```bash
bundle install
bundle exec jekyll serve      # http://localhost:4000
```

This needs Ruby with its development headers (`sudo apt install ruby-full
build-essential`).

## Visibility checklist

- `scholar`, `scopus`, `researchgate`, `linkedin` and `institutional` are
  filled in `_config.yml`. They become profile links and `sameAs` entries in
  the structured data that search engines read.
- Register the site in Google Search Console (paste the verification token
  under `webmaster_verifications` in `_config.yml`) and submit
  `https://jciambella.github.io/sitemap.xml`.
- Add the URL as "Website" on ORCID, Google Scholar, Scopus, ResearchGate
  and LinkedIn, on the Sapienza staff page, and in your e-mail signature.
  Links from those pages are what make the site rank for your name.
