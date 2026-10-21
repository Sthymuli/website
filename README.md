# website

The Sthymuli site: Helvetica, uppercase, black on the warm grey of the robot photo.

## Pages

| File                          | Page                                                    |
|-------------------------------|---------------------------------------------------------|
| `content/_index.md`           | Home: `heading` (one line per line) over `background`; `keepout` is the robot circle the heading avoids |
| `content/projects/_index.md`  | Projects intro; each file in `content/projects/` adds a row below it |
| `content/about.md`            | About                                                   |
| `content/contact.md`          | Get in touch                                            |
| `content/style-guide.md`      | Every Markdown element, not in the menu (`/style-guide/`) |

## Add a robot or add-on

Copy `content/projects/example-robot.md`, edit it and set `draft: false`. Text above `<!--more-->` shows on the Projects page.

Images go in `static/images/` and are referenced as `images/name.jpg`.

Front matter options:

| key           | effect                                              |
|---------------|-----------------------------------------------------|
| `title`       | page title                                          |
| `description` | lead line under the title, and on the Projects page |
| `image`       | round picture on the Projects page                  |
| `weight`      | order on the Projects page (lowest first)           |
| `date`        | shown on the page                                   |
| `tags`        | tag pills at the bottom                             |
| `class`       | extra class on the content, e.g. `links` for big link rows |

Shortcodes: `circle` (round image), `trio` (three overlapping circles), `cards` (row of round cards). See `content/style-guide.md`.

## Menu

Menu items are in `hugo.toml`. The black pill rests on the current page and slides to the hovered link (`themes/sthymuli/static/js/menu.js`).

## Logo

`static/images/logo.svg` is the vector logo. The header uses the same path from `themes/sthymuli/layouts/_partials/logo.html`, and `themes/sthymuli/static/favicon.svg` for the browser tab.

## Preview locally

```sh
hugo server       # add -D to show drafts
```

## Publish

Pushing to `main` builds and deploys with `.github/workflows/hugo.yml`.
One-time setup: in the repo on GitHub, go to **Settings → Pages → Source** and pick **GitHub Actions**.

## Theme

`themes/sthymuli/` is derived from [hugo-xmin](https://github.com/yihui/hugo-xmin) (MIT). Colours and sizes are CSS variables at the top of `themes/sthymuli/static/css/style.css`.
