---
name: Joaquin Pacia Portfolio
description: A monochromatic, editorial portfolio where the work is the art and the site is the frame.
colors:
  bg-light: "#ffffff"
  bg-elevated-light: "#fafafa"
  fg-light: "#0a0a0a"
  fg-muted-light: "#6b6b6b"
  line-light: "#e5e5e5"
  hover-light: "#f5f5f5"
  bg-dark: "#0a0a0a"
  bg-elevated-dark: "#141414"
  fg-dark: "#f5f5f5"
  fg-muted-dark: "#8a8a8a"
  line-dark: "#232323"
  hover-dark: "#1a1a1a"
typography:
  display:
    fontFamily: "Schibsted Grotesk, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.15em"
rounded:
  xs: "3px"
  sm: "4px"
  md: "6px"
  lg: "16px"
  xl: "20px"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
  hero: "8rem"
components:
  button-pill:
    backgroundColor: "{colors.bg-light}"
    textColor: "{colors.fg-light}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.75rem"
  button-pill-hover:
    backgroundColor: "{colors.fg-light}"
    textColor: "{colors.bg-light}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.75rem"
  outcome-card:
    backgroundColor: "{colors.bg-light}"
    textColor: "{colors.fg-light}"
    rounded: "0px"
    padding: "2rem"
---

# Design System: Joaquin Pacia Portfolio

## 1. Overview

**Creative North Star: "The Quiet Gallery"**

The work hangs on a neutral wall. The site is the frame, not the painting. Every choice recedes so the case studies, the screens, the video, the research, hold the visitor's eye. Whitespace is the matting around each piece; the monochrome palette is the gallery's deliberate refusal to compete with the art on its walls. A recruiter walks in, scans the room in thirty seconds, then stops in front of the one piece that earns a closer look.

The system is achromatic by doctrine. There is no brand color, no accent hue, no gradient. Contrast does all the work that color usually does: near-black against white in light mode, soft off-white against near-black in dark mode (the default). Type is a single family, Inter, worked hard across weight and scale rather than diluted across many fonts. Hierarchy comes from size and weight contrast, never from decoration. Motion is minimal and exponential, present only to confirm a state change, never to perform.

This system explicitly rejects the template-portfolio look (interchangeable Wix/Squarespace shells with no point of view), Dribbble-bait over-design (flashy gradients, fake dashboards, style over substance), corporate-SaaS cliche (the hero-metric template, identical icon-heading-text card grids, navy and gradient slop), and dev-bro neon (terminal-green-on-black, neon accents, the hacker costume). The dark default reads as quiet and editorial, never as a hacker terminal.

**Key Characteristics:**
- Achromatic: contrast carries meaning, not hue.
- Single typeface (Schibsted Grotesk), wide weight and scale range.
- Generous, varied whitespace as the primary compositional tool.
- Hairline borders (1px) structure the page; flat at rest.
- Dark by default, light by toggle, both equally considered.

## 2. Colors

A two-pole achromatic palette mirrored across light and dark themes. No chromatic accent exists; the foreground color IS the accent.

### Primary
- **Ink** (light `#0a0a0a` / dark `#f5f5f5`): The foreground. Body text, headlines, the pill-button fill on hover, the selection background. Also serves as the lone "accent" wherever emphasis is needed, which is why no separate accent token exists.

### Neutral
- **Paper** (light `#ffffff` / dark `#0a0a0a`): The base background, the gallery wall.
- **Riser** (light `#fafafa` / dark `#141414`): Elevated surfaces, code blocks, subtle tonal lift above Paper.
- **Hover Wash** (light `#f5f5f5` / dark `#1a1a1a`): Row and control hover backgrounds.
- **Hairline** (light `#e5e5e5` / dark `#232323`): Every border, divider, and rule. The structural skeleton of the layout.
- **Muted Ink** (light `#6b6b6b` / dark `#8a8a8a`): Secondary text, eyebrows, captions, metadata, italic-substitute emphasis in the hero headline.

### Named Rules
**The No-Hue Rule.** This portfolio has no brand color and never will. If a screen needs emphasis, it comes from weight, scale, or the Ink-on-Paper inversion, never from introducing a hue. The instant a colored accent appears, the gallery becomes a storefront.

**The Inversion Rule.** Emphasis at maximum strength is a full Ink/Paper swap (pill button hover, text selection), not a tint. The flip is the loudest move the system permits.

## 3. Typography

**Display / Body / Label Font:** Schibsted Grotesk (with `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` fallback)
**Mono Font:** `ui-monospace, 'SF Mono', Menlo, monospace` (inline code and code blocks only)

**Character:** One text grotesque doing every job. Schibsted Grotesk carries subtle character in its `a`, `g`, and `t` and ships a true italic cut. The stylistic set `ss01` is enabled globally. Personality comes from how hard the scale is pushed, not from typeface variety. Negative letter-spacing tightens large display text; wide positive tracking on uppercase micro-labels does the editorial work.

### Hierarchy
- **Display** (600, `clamp(2.5rem, 6vw, 5rem)`, 1.05, `-0.035em`): Home hero headline only. Capped at `14ch`. Muted Ink applied to the `<em>` span for a two-tone headline instead of italics.
- **Headline** (600, `2rem`, prose h2 / `clamp(2rem, 5vw, 3.75rem)` case-study h1): Section openers and case-study titles. Case h1 capped at `18ch`.
- **Title** (500, `1.4rem` to `1.5rem`): Prose h3, pull-quotes (blockquote at `1.5rem`/500). Sub-section structure.
- **Body** (400, `1rem`, 1.5): All running text. Constrained by the `760px` narrow container, which lands body measure around 65-75ch.
- **Label** (500, `0.75rem` to `0.8rem`, `0.15em`, UPPERCASE): Eyebrows, section labels, the tools-marquee context. Tabular numerals (`font-variant-numeric: tabular-nums`) on indices and stats.

### Named Rules
**The One-Family Rule.** Schibsted Grotesk carries the entire system. Adding a second typeface is prohibited; the answer to "this needs more personality" is more weight or scale contrast, not more fonts.

**The Two-Tone Headline Rule.** Hero emphasis uses Muted Ink on part of the headline, never italics, never color. The fade from Ink to Muted Ink is the only headline ornament allowed.

## 4. Elevation

Flat by default. Surfaces sit on the page with no shadow at rest; the 1px Hairline border and the Paper/Riser tonal step do all structural separation. Shadow is reserved strictly as a response to state, never as ambient decoration.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 6px 16px rgba(0,0,0,0.08)`): Appears on hover for interactive cards (e.g. the home profile/preview card lifting from its 1px-2px resting shadow). Communicates "this responds."
- **Float** (`box-shadow: 0 8px 32px rgba(0,0,0,0.08)`): The portrait and case-cover imagery, where a framed photograph reads as physically lifted off the wall.
- **Overlay** (`box-shadow: 0 24px 80px rgba(0,0,0,0.5)`): Lightbox image only. The single deep shadow in the system, justified because the image is pulled fully out of the document over a dimmed backdrop.

### Named Rules
**The Flat-At-Rest Rule.** Cards, list rows, and containers carry zero shadow until the user touches them. If a surface has an ambient shadow with no interaction behind it, remove it; let the Hairline border define the edge instead.

## 5. Components

### Buttons
- **Shape:** Fully pill (`999px`). No square buttons in the chrome.
- **Primary (contact link):** Transparent fill, 1px Ink border, Ink text, padding `0.9rem 1.75rem`.
- **Hover / Focus:** Full inversion, background becomes Ink, text becomes Paper. Transition `all 0.2s ease`.
- **Icon buttons (theme toggle):** `36px` circle, Muted Ink icon, Hover Wash background on hover, color shifts to Ink.

### Cards / Containers
- **Outcome card:** Square corners (`0px`), 1px Hairline border, `2rem` padding, no fill, no shadow. Stat in Headline-weight Ink at `2.5rem`/600, description in Muted Ink. Laid out in a 3-up grid (`outcomes-grid`).
- **Profile / preview card:** Soft corners (`16px`-`20px`), resting `0 1px 2px rgba(0,0,0,0.04)`, lifts to Lift shadow on hover with a slight `translateY`.
- **Internal padding:** `2rem` standard; containers cap at `1200px` (`.container`) or `760px` (`.container-narrow`), both with `3rem` horizontal gutters.
- **Border:** 1px Hairline is the default container edge. Nested cards are prohibited.

### Navigation
- **Style:** Fixed top bar, `color-mix` 85% Paper with `blur(20px)` backdrop, 1px Hairline bottom border. Padding `1.25rem 3rem`.
- **Typography:** Name at `0.95rem`/600; links at `0.9rem` Muted Ink, shifting to Ink on hover (`0.2s`).
- **States:** Links are Muted Ink at rest, Ink on hover. No underline, no pill, no active-color.

### Pull-quote (signature)
Blockquote at `1.5rem`/500, `-0.015em`, with a 2px Ink left border and `2rem` left padding. Citation line drops to `0.85rem` Muted Ink. This is the one intentional left-border in the system, scoped to editorial quotes inside long-form prose, never applied to cards or callouts.

### Tools Marquee (signature)
A horizontally scrolling, seamless-loop row of tool icons under an uppercase Label heading. No hover-pause; runs continuously at a calm linear speed (32s) with an edge mask fade. Two equal duplicated track-groups create the seamless loop. Dark-on-dark icons (GitHub, Next.js) get `filter: invert(1)` in dark mode.

### Lightbox (signature)
Full-viewport dimmed-and-blurred overlay (`z-index: 1000`). Image capped at `92vw / 88vh`, scroll-to-zoom (1x-6x, anchored to cursor), drag-to-pan when zoomed, double-click to toggle/reset. A bottom-center pill hint reads "Scroll to zoom, double-click to reset." Excludes the case-cover hero by design.

## 6. Do's and Don'ts

### Do:
- **Do** carry the entire palette as Ink-on-Paper plus four neutrals. Emphasis is weight, scale, or the full Ink/Paper inversion.
- **Do** keep surfaces flat at rest; introduce shadow only on hover, float, or overlay (the three shadow tokens above).
- **Do** use 1px Hairline borders and the Paper/Riser tonal step for structure.
- **Do** push Inter hard across weight (400-600) and scale (`0.75rem` to `5rem`); maintain at least a 1.25 ratio between hierarchy steps.
- **Do** set uppercase micro-labels at `0.15em` tracking and use tabular numerals for indices and stats.
- **Do** constrain running text to the `760px` narrow container so body measure stays 65-75ch.
- **Do** honor `prefers-reduced-motion` on the marquee and all transitions (a11y target: WCAG AA).

### Don't:
- **Don't** introduce any brand color, accent hue, or gradient. The No-Hue Rule is absolute.
- **Don't** use `background-clip: text` gradient text, glassmorphism as decoration (the nav blur is the one sanctioned blur), or the hero-metric template.
- **Don't** build identical icon-heading-text card grids, the corporate-SaaS cliche named in PRODUCT.md.
- **Don't** let the dark default drift toward dev-bro neon: no terminal green, no neon accents, no hacker costume. Dark stays quiet and editorial.
- **Don't** add a colored `border-left` stripe to cards or callouts. The one 2px left border is the editorial pull-quote, and nothing else.
- **Don't** add a second typeface. The answer to "needs more personality" is more weight or scale, never more fonts.
- **Don't** nest cards, and don't wrap content in a container that does not need one.
- **Don't** ship a template-portfolio or Dribbble-bait look. If it could be any designer's site, it has failed.
