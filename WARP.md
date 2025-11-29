# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

This repository is a static personal portfolio site built from the **Massively** HTML5 UP template. There is no build system, package manager, or automated test suite; GitHub Pages serves the raw HTML/CSS/JS from the root of the repository.

Key top-level files:
- `index.html`: main portfolio landing page.
- `generic.html`: secondary "generic" content page.
- `elements.html`: elements/typography reference page.
- `assets/`: shared CSS, JS, fonts, and related front-end assets.
- `images/`: image assets used by the portfolio.
- `html5up- template/`: mostly an untouched copy of the original Massively demo page and documentation (`README.txt`, `LICENSE.txt`).

## Common Commands

There are no project-specific CLIs configured (no `package.json`, no build or test scripts). Development is done directly against the static files.

### Serve the site locally

From the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/` in a browser to view `index.html`. This approximates how GitHub Pages will serve the site.

### Open the main page directly

You can also open `index.html` directly in a browser via the file system (e.g., double-click in Finder), but using a local HTTP server better matches production behavior for assets and relative paths.

### Linting and tests

- **HTML/CSS/JS linting**: There is no configured linter (no ESLint, Stylelint, etc.). If you add tooling in the future, document the commands here.
- **Tests**: There is no automated test suite or test runner configured.

## High-Level Architecture and Structure

### Page layout

All main pages (`index.html`, `generic.html`, `elements.html`) follow the Massively structure:
- A `#wrapper` container with a `fade-in` class wrapping the entire page.
- An optional `#intro` section with the large hero text and call-to-action.
- A fixed `#header` containing the site logo text (currently still set to "Massively").
- A `#nav` element with:
  - `.links` list: primary navigation items for `index.html`, `generic.html`, and `elements.html`.
  - `.icons` list: social media icons (Font Awesome) which are currently placeholder `#` links.
- A `#main` container holding the article content:
  - On `index.html`, a featured post (`.post.featured`) followed by a grid of posts inside `.posts`.
  - On other pages, more free-form content and component examples.
- A `#footer` section at the bottom with:
  - A contact form (non-functional by default, `action="#"`).
  - Contact and social info blocks.
- A copyright bar (`#copyright`).

Scripts are loaded at the bottom of each page to provide scroll effects, navigation behaviors, and other enhancements:
- `assets/js/jquery.min.js`
- `assets/js/jquery.scrollex.min.js`
- `assets/js/jquery.scrolly.min.js`
- `assets/js/browser.min.js`
- `assets/js/breakpoints.min.js`
- `assets/js/util.js`
- `assets/js/main.js`

### Styling (CSS)

Primary styling is in `assets/css/main.css`:
- Starts with a CSS reset and base element styles.
- Imports Google Fonts and Font Awesome.
- Defines global typography (body uses `Merriweather`; headings use `Source Sans Pro`), colors, and spacing.
- Implements the responsive layout, including breakpoints to adjust font sizes and layout for various screen widths.

There is also a `assets/css/noscript.css` stylesheet referenced in the HTML `<noscript>` block, providing fallback styles when JavaScript is disabled.

When editing layout or visual design, most changes should be made in `assets/css/main.css`, ensuring class names continue to match what the HTML expects.

### JavaScript behavior

Custom behavior is implemented via the Massively template scripts, primarily `assets/js/main.js`:
- Defines a jQuery IIFE that wires up:
  - A custom `_parallax` jQuery plugin to apply parallax scrolling on the background of the `#wrapper` container. It uses `breakpoints` and `browser` utilities to disable parallax on IE, Edge, HiDPI, and mobile for performance.
  - Initial page-load animations by removing the `is-preload` class from `<body>` after a short delay on window `load`.
  - Smooth scrolling for elements with the `.scrolly` class.
  - The responsive navigation panel (`#navPanel`):
    - Injects a `#navPanelToggle` link into `#wrapper`.
    - Uses the `.panel()` helper (from `util.js`) to create an off-canvas nav that slides in from the right on smaller viewports.
    - Moves the navigation content between the main `#nav` and `#navPanel` depending on `breakpoints` to support desktop vs. mobile layouts, also toggling `.alt` classes on icons appropriately.
  - Scroll-based behavior for the `#intro` section using `scrollex`, hiding or showing the intro depending on scroll position and viewport size.

Other JS files (`browser.min.js`, `breakpoints.min.js`, `util.js`, `jquery.scrolly.min.js`, `jquery.scrollex.min.js`) provide utility functions and plugins used by `main.js`. You generally should not need to modify them unless changing core template behavior.

### Template copy vs. live site

The `html5up- template/` directory contains a near-stock copy of the original Massively demo page and its accompanying `README.txt` and `LICENSE.txt`. The live portfolio is served from the root-level HTML files and `assets/` directory.

When making content changes for the portfolio, update the root-level pages (`index.html`, `generic.html`, `elements.html`) and shared assets under `assets/`. The files in `html5up- template/` can be used as reference but are not meant to be edited for production content.

### Deployment assumptions

Because this repository is named `IsaFernandes22.github.io`, it is expected to be served by GitHub Pages from the root of the default branch. Deployment is typically triggered by pushing changes to the repository; no additional build step is required.