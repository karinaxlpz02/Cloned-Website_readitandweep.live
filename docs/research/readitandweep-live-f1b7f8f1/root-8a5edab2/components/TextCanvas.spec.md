# TextCanvas specification

## Overview

- Target file: `src/components/sites/readitandweep-live-f1b7f8f1/root-8a5edab2/TextCanvas.tsx`
- Screenshots: `docs/design-references/readitandweep-live-f1b7f8f1/root-8a5edab2/`
- Interaction model: time driven.

## DOM structure

One canvas containing fixed `div.text-snippet` items. Each item contains `mark` and either plain diary text, italic trash text, or an anchor for a citation.

## Computed styles

- Body: Arial, Helvetica, sans-serif; 16px; background `rgb(200, 180, 150)`; centered text.
- Canvas: antialiased text; hidden cursor.
- Snippet: fixed position; inline block; centered; random `font-size`, `max-width`, `left`, and `top`.
- Mark: background `rgb(200, 180, 150)`.
- Diary: white Arial.
- Trash: `rgb(255, 200, 227)` Arial italic.
- Citation: `rgb(241, 30, 169)` Times New Roman, underlined.

## States and behaviors

The typing and viewport behaviors are documented in `BEHAVIORS.md`. Text content is drawn without replacement from the captured `src/data/corpus.json` corpus, which contains 124 trash excerpts, 147 citations, and 118 notes.

## Assets

- `public/sites/readitandweep-live-f1b7f8f1/root-8a5edab2/pinksparkle.png`: favicon.

## Responsive behavior

- Desktop: 14–48px random text size.
- Mobile: 12–24px random text size.
- Breakpoint: 820px. Canvas remains a full viewport field at all widths.
