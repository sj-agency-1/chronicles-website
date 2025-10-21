# Project dependencies

This document lists the project's dependencies (production) and devDependencies (build/tooling), why each package is included, and where it is used in the repository. Use this as a quick reference when auditing, upgrading, or trimming dependencies.

## How to read the entries

- Package — short purpose.
- Where used — files/locations in the repo where the package is imported or configured.
- Notes — additional context or actionable notes.

---

## Production dependencies

- astro — Core framework used to build the site (Astro).  
  Where used: project root scripts and throughout (e.g., `astro.config.ts`).  
  Notes: Required runtime/build framework for the site.

- @astrojs/rss — Generate RSS feeds.  
  Where used: `src/pages/rss.xml.ts` (`getRssString`).  
  Notes: Produces the feed at `/rss.xml` during build.

- @astrojs/sitemap — Sitemap generation integration.  
  Where used: `astro.config.ts` (registered in `integrations`).

- @astrolib/analytics — Analytics helpers/components (Google Analytics wrapper).  
  Where used: `src/components/common/Analytics.astro` imports `{ GoogleAnalytics }`.

- @astrolib/seo — SEO helpers and types for consistent metadata/OG.  
  Where used: `src/components/common/Metadata.astro` (component + types), `src/utils/images.ts` (OpenGraph type).

- @fontsource-variable/inter — Local Inter variable font (Fontsource).  
  Where used: `src/components/CustomStyles.astro` (import to include font CSS).

- astro-embed — Components for embedding external content (YouTube, Twitter, Vimeo, etc).  
  Where used: `src/pages/homes/startup.astro`, `src/data/post/markdown-elements-demo-post.mdx` and other content using embed components.

- astro-icon — Icon integration (Iconify).  
  Where used: `astro.config.ts` (integration config), and many components import icons, e.g. `src/components/widgets/*` and `src/components/ui/*` (`import { Icon } from 'astro-icon/components'`).

- limax — Slugify library for permalinks.  
  Where used: `src/utils/permalinks.ts` (`slugify`).

- lodash.merge — Deep/object merge utility.  
  Where used: `vendor/integration/utils/configBuilder.ts`, `src/pages/[...blog]/index.astro`, `src/components/common/Metadata.astro` (merging metadata/configs).

- unpic — Universal image URL transformation/optimizer utilities.  
  Where used: `src/utils/images-optimization.ts` (imports `transformUrl`, `parseUrl`), `src/utils/images.ts` (calls `unpicOptimizer`), `src/components/common/Image.astro`.

---

## Dev / build dependencies

- @astrojs/check — Astro-specific project checks.  
  Where used: `npm run check:astro` (script calls `astro check`).

- @astrojs/mdx — MDX support for Astro (render `.mdx` files).  
  Where used: `astro.config.ts` (registered `mdx()`); repo includes `.mdx` content.

- @astrojs/partytown — Partytown integration to offload 3rd-party scripts to a worker.  
  Where used: `astro.config.ts` (imported and conditionally registered; feature is off by default via `hasExternalScripts`).

- @astrojs/tailwind — Tailwind integration for Astro.  
  Where used: `astro.config.ts` (registered `tailwind()` integration).

- @eslint/js — ESLint JS config utilities.  
  Where used: `eslint.config.js` (`js.configs.recommended`).

- @iconify-json/flat-color-icons, @iconify-json/tabler — Icon JSON sets for `astro-icon`.  
  Where used: `astro.config.ts` icon integration includes `tabler` and `flat-color-icons` sets.

- @tailwindcss/typography — Rich-text (prose) plugin for Tailwind CSS.  
  Where used: `tailwind.config.js` (imported as `typographyPlugin` and added to plugins).

- @types/js-yaml, js-yaml — YAML parser and types.  
  Where used: `vendor/integration/utils/loadConfig.ts` imports `js-yaml` to parse `src/config.yaml`. Types assist TypeScript in development.

- @types/lodash.merge — Types for `lodash.merge`.  
  Where used: Type checking where `lodash.merge` is used.

- @types/mdx — MDX types for TypeScript tooling.  
  Where used: Type checking for MDX integration.

- @typescript-eslint/eslint-plugin, @typescript-eslint/parser, typescript-eslint — ESLint TypeScript rules and parser.  
  Where used: `eslint.config.js` imports `@typescript-eslint/parser` and `typescript-eslint` configs; they enable proper linting of `.ts` and `.astro` script blocks.

- astro-compress — Integration to minify/compress HTML/CSS/JS during build.  
  Where used: `astro.config.ts` registers `compress()` with CSS/HTML/JS options.

- astro-eslint-parser — Enables ESLint to parse `.astro` files.  
  Where used: `eslint.config.js` (parser for `**/*.astro`).

- eslint, eslint-plugin-astro — Project linting and Astro-specific lint rules.  
  Where used: `eslint.config.js` and `npm run check:eslint` script.

- globals — Provides node/browser globals for ESLint config.  
  Where used: `eslint.config.js` (`globals.browser` and `globals.node`).

- mdast-util-to-string — Extract plaintext from Markdown AST nodes.  
  Where used: `src/utils/frontmatter.ts` to convert mdast into text for reading-time calculations.

- prettier, prettier-plugin-astro — Code formatting and plugin to format `.astro` files.  
  Where used: `.prettierrc.cjs` includes `prettier-plugin-astro`. Scripts `check:prettier` / `fix:prettier` use Prettier.

- reading-time — Estimate reading time for blog posts.  
  Where used: `src/utils/frontmatter.ts` (`getReadingTime`) to populate `frontmatter.readingTime`.

- sharp — Image processing library used for resizing/format conversion (native binary).  
  Where used: referenced by image tooling and integrations (present in `package.json` and `package-lock.json`, used transitively by image-related packages such as `astro-compress` or other optimizers).  
  Notes: Native dependency; Windows may need build tools or prebuilt binaries. Keep if you need local image processing.

- tailwind-merge — Merge Tailwind CSS class strings safely (resolves duplicate/conflicting classes).  
  Where used: many UI components under `src/components/ui/*` (e.g., `Button.astro`, `Headline.astro`, `ItemGrid.astro`, `WidgetWrapper.astro`, `Timeline.astro`) import and use `twMerge`.

- tailwindcss — Tailwind CSS framework.  
  Where used: `tailwind.config.js`, `astro.config.ts` with `@astrojs/tailwind` integration; used for styling site.

- typescript — Type checking and editor tooling.  
  Where used: The project contains TypeScript files and `tsconfig.json`.

- unist-util-visit — AST walker for unified/unist trees.  
  Where used: `src/utils/frontmatter.ts` (visitor used to set `loading='lazy'` on `<img>` elements in a Rehype plugin).

---

## Notes and recommendations

- Everything in `package.json` appears to be referenced in the codebase (I found concrete imports/usages for the listed packages).
- `@astrojs/partytown` is present and configured but not enabled by default in `astro.config.ts` (`hasExternalScripts` is false). You can remove it if you will not use Partytown.
- `sharp` is a native dependency. If you get install/build errors on Windows, follow Sharp's install instructions (or rely on unpic/remote/CDN-based optimization if you want to avoid local native binaries). I can add troubleshooting steps if needed.
- If you'd like a shorter summary for the README or a list of packages that may be safe to remove (unused, duplicate, or optional), I can analyze transitive usage (e.g., `npm ls <package>`) and provide candidates.

## Change log

- Document created to list and explain dependencies and devDependencies (generated from repository scan of imports/config).
