---
title: "Style guide"
date: 2026-10-06
description: "Every Markdown element and shortcode the theme supports."
tags: ["guide"]
---

Plain paragraphs, **bold**, *italic*, [links](https://gohugo.io) and `inline code`.

## Headings

Second-level headings get a small circle. Third-level ones stay plain.

### A third-level heading

#### A fourth-level label

## Lists

- Thin circles as bullets
- One idea per line
- Nothing more

1. Numbered
2. Lists
3. Too

---

## Quote

> Simple, direct, to the point.

## Table

| Pillar     | Focus                         |
|------------|-------------------------------|
| Robotics   | Robots as learning tools      |
| Aesthetics | Soft materials, playful design |
| Education  | Motivation and confidence     |

## Code

```python
def circle(r):
    return 3.14159 * r * r
```

## Shortcodes

A round image. Put the file in `static/images/`:

```
{{</* circle src="images/photo.jpg" caption="A caption" size="240" */>}}
```

Three overlapping circles:

{{< trio a="Robotics" b="Aesthetics" c="Education" caption="The three pillars" >}}

A row of round cards. Each line is `Title | text | link`, and the link is optional:

{{< cards >}}
One | First idea
Two | Second idea
Three | Third idea
{{< /cards >}}
