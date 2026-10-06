# website

A minimal Hugo site in the spirit of *The Beauty & the Machine*: black and white, thin lines, circles.

## Add a page

```sh
hugo new content projects/my-page.md   # then edit it; set draft: false
```

Or just create the `.md` file by hand. Images go in `static/images/` and are referenced as `images/name.jpg`.

Front matter options:

| key           | effect                                    |
|---------------|-------------------------------------------|
| `title`       | page title                                |
| `description` | lead line under the title, and in lists   |
| `date`        | shown on the page and used for sorting    |
| `image`       | round thumbnail in page lists             |
| `tags`        | tag pills at the bottom                   |

Shortcodes: `circle` (round image), `trio` (three overlapping circles), `cards` (row of round cards). See `content/projects/style-guide.md`.

## Preview locally

```sh
hugo server
```

## Publish

Pushing to `main` builds and deploys with `.github/workflows/hugo.yml`.
One-time setup: in the repo on GitHub, go to **Settings → Pages → Source** and pick **GitHub Actions**.

## Theme

`themes/beautymachine/` is derived from [hugo-xmin](https://github.com/yihui/hugo-xmin) (MIT). Colours are CSS variables at the top of `themes/beautymachine/static/css/style.css`.
