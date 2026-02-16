# Theme Switcher Implementation Notes

## Goal
Add a live color palette + font pairing switcher to test neo-brutalist design combos.

## Architecture
- CSS custom properties on `:root` for all theme values (colors + fonts)
- Tailwind configured to read from CSS vars so utility classes work
- React context manages palette/font selection + dark/light mode
- localStorage persists user choices
- No Tailwind `dark:` prefix usage -- all driven by CSS vars swapped at runtime

## Color Palettes (6)
| ID | Light BG | Dark BG | Accent 1 | Accent 2 |
|----|---------|---------|-----------|----------|
| teal-pink | #FFFFFF | #1B2227 | #4DDDD9 | #FB97B3 |
| cream-lavender | #FDF6EC | #1E1E2E | #D9BEFF | #FF8ACD |
| lime-coral | #FFFFF0 | #1A1A1A | #D3F46E | #FF6B6B |
| blue-yellow | #FAFAFA | #111827 | #A8D8FF | #FFD166 |
| mint-peach | #FFF9F5 | #1B2227 | #ADFACE | #FFC6E7 |
| mono-red | #FFFFFF | #000000 | #FF4444 | #FF4444 |

## Font Pairings (4)
| ID | Heading | Body |
|----|---------|------|
| victor-lato | Victor Mono SemiBold | Lato Regular |
| plex-mono-sans | IBM Plex Mono Bold | IBM Plex Sans Regular |
| jetbrains-inter | JetBrains Mono Bold | Inter Regular |
| lexend-plex | Lexend Mega Bold | IBM Plex Mono Regular |

## Dark mode border colors
- cream-lavender dark: #E8E0D0 (warm)
- mint-peach dark: #E8DDD5 (warm)
- All others: #FFF

## Round 2 Fixes
- Split accents into per-mode values (light gets deeper/saturated, dark gets pastel)
- Light mode accents are now WCAG-readable against their backgrounds
- Added `.brutal-shadow` class (3px 3px 0px, press effect on hover/active)
- `.hover-invert` now also has brutal shadow + press animation
- Name heading is now a filled accent block with shadow (like Moon NFT logo)
- Contact + Experience headers use accent color
- Expanded project detail uses 8% accent tint background instead of 5% text tint
- Form has brutal shadow
- Mobile cards have brutal shadow

### Light mode accent colors (deeper, readable)
| Palette | Light accent1 | Light accent2 |
|---------|--------------|--------------|
| teal-pink | #0EB5B2 | #E5457B |
| cream-lavender | #7C3AED | #DB2777 |
| lime-coral | #65A30D | #DC2626 |
| blue-yellow | #2563EB | #D97706 |
| mint-peach | #059669 | #DB2777 |
| mono-red | #DC2626 | #DC2626 |

## Gotchas
- Tailwind needs `var()` references in config for JIT to pick up CSS var colors
- Using arbitrary values `bg-[var(--bg)]` won't generate unless safelisted or inline
- Solution: define named Tailwind colors (accent, accent2, theme-bg, theme-text, theme-border) that point to CSS vars
- `bg-opacity-*` doesn't work with CSS var hex colors -- use `color-mix(in srgb, ...)` instead
- Created `.hover-accent-subtle` CSS utility for 10% accent hover backgrounds
- Removed `isDarkMode` prop from TableRow since expanded section bg now uses `color-mix`
- `getThemeClasses()` still takes `isDarkMode` param for API compat but returns var-based classes

## Files Changed
- `public/index.html` -- loads 7 Google Font families
- `tailwind.config.js` -- CSS var color tokens + font families
- `src/index.css` -- CSS vars on :root, heading font rule, hover-accent-subtle utility
- `src/utils/theme-utils.ts` -- 6 palettes, 4 font pairings, applyPalette/applyFontPairing
- `src/contexts/ThemeContext.tsx` -- paletteId/fontPairingId state + localStorage persistence
- `src/hooks/useDarkMode.ts` -- unchanged (thin wrapper)
- `src/components/App/App.tsx` -- ThemePicker popover with palette circles + font buttons
- `src/components/Home/Home.tsx` -- divider uses theme.divider
- `src/components/Projects/Projects.tsx` -- divider, expanded bg, hover-accent-subtle
- `src/components/ContactMe/Contact.tsx` -- divider uses theme.divider
