# jciambella.github.io

Personal academic website of Jacopo Ciambella, served by GitHub Pages at
<https://jciambella.github.io/>. GitHub builds it with Jekyll on every push to
`main`; there is no build step to run locally.

## Where the content lives

| To change…                         | edit                          |
|------------------------------------|-------------------------------|
| Name, position, links, photo, CV   | `_config.yml` → `profile:`    |
| Publications                       | `_data/publications.yml`      |
| Research themes (Home + Research)  | `_data/topics.yml`            |
| Research figures                   | `assets/img/research/` + `image:` fields in `_data/topics.yml` |
| Highlights on the home page        | `_data/news.yml`              |
| Invited talks                      | `_data/talks.yml`             |
| Funded projects                    | `_data/projects.yml`          |
| Students                           | `_data/people.yml`            |
| CV page (bio, positions, service…) | `_data/cv.yml`                |
| Public code                        | `_data/code.yml`              |
| Home page intro paragraph          | `index.html`                  |

Pages: `index.html`, `research.html`, `publications.html`, `group.html`,
`cv.html`. Layout in `_layouts/`, fragments in `_includes/`, styles in
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

## Research figures

Each theme in `_data/topics.yml` can carry a figure: put the file in
`assets/img/research/` and set `image:` (and optionally `thumb:`, `caption:`,
`credit:`, `image_alt:`) on the theme. The Home page shows a 16:10 crop on the
theme card; the Research page shows the full figure with its caption,
alternating left and right. Keep files under ~250 kB: about 1400 px wide for
`image` and 800×500 px for `thumb` (WebP keeps them small). For figures already published in a journal,
check that the publisher's author-rights policy allows reuse on a personal
website and give the source in `credit:`.

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

- Fill `scholar`, `scopus`, `researchgate`, `linkedin` and `institutional` in
  `_config.yml`; they become profile links and `sameAs` entries in the
  structured data that search engines read.
- Register the site in Google Search Console (paste the verification token
  under `webmaster_verifications` in `_config.yml`) and submit
  `https://jciambella.github.io/sitemap.xml`.
- Add the URL as "Website" on ORCID, Google Scholar, Scopus, ResearchGate
  and LinkedIn, on the Sapienza staff page, and in your e-mail signature.
  Links from those pages are what make the site rank for your name.
