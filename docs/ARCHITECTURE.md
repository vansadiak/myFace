# Architecture

## Folder Structure

```
src/
├── components/          # React components (one folder per component)
│   ├── App/App.tsx      # Root: routing, navigation, theme provider
│   ├── Home/Home.tsx    # Landing page
│   ├── Projects/Projects.tsx  # Experience/work history
│   └── ContactMe/Contact.tsx  # Contact form
├── config/
│   └── firebaseConfig.ts    # Firebase setup (placeholder)
├── contexts/
│   └── ThemeContext.tsx     # Dark/light mode state
├── hooks/
│   └── useDarkMode.ts       # Theme hook wrapper
├── types/
│   ├── project.ts           # Work experience data + types
│   └── me.ts                # Personal info + social links
├── utils/
│   └── theme-utils.ts       # Theme class generators
├── index.tsx                # Entry point
└── index.css                # Global styles + Tailwind
```

## Component Architecture

### Lazy Loading

All route components are lazy-loaded for code splitting:

```tsx
const Home = lazy(() => import("../Home/Home"));
const Projects = lazy(() => import("../Projects/Projects"));
const Contact = lazy(() => import("../ContactMe/Contact"));
```

Wrapped in `<Suspense>` with loading fallback in App.tsx.

### State Management

| Type | Tool | Purpose |
|------|------|---------|
| Global | React Context | Theme (dark/light mode) |
| Local | useState | Form state, UI state |
| Persistent | localStorage | Theme preference |

No Redux/Zustand needed for this scale.

### Routing

Routes defined as config array in App.tsx:

```tsx
const routes = [
  { path: "/", component: Home, label: "Home" },
  { path: "/experience", component: Projects, label: "Experience" },
  { path: "/contact", component: Contact, label: "Contact" },
];
```

Add new routes by extending this array.

## Theme System

### Context Pattern

```
ThemeContext.tsx (Provider + state)
    ↓
useDarkMode.ts (Hook wrapper)
    ↓
Components (consume via hook)
```

Theme persists to localStorage, respects system preference on first load.

### Theme Utility

`getThemeClasses(isDarkMode)` returns object with pre-built class strings:

```tsx
const theme = getThemeClasses(isDarkMode);
// theme.bg → "bg-white" or "bg-black"
// theme.text → "text-black" or "text-white"
// theme.border → "border-black" or "border-white"
```

---

## Design System

### Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Background | `#FFFFFF` | `#000000` | Page background |
| Text | `#000000` | `#FFFFFF` | Primary text |
| Border | `#000000` | `#FFFFFF` | All borders |
| Accent | `#FF0000` | `#FF0000` | Links, highlights, selection |

Accent defined as CSS variable `--accent` in index.css.

### Typography

**Font:** IBM Plex Mono (monospace)

Configured in tailwind.config.js:
```js
fontFamily: {
  mono: ['"IBM Plex Mono"', 'monospace'],
}
```

All text uses this font by default.

### Brutalist Principles

1. **No border radius** - `border-radius: 0 !important` globally
2. **Sharp edges** - All elements have hard corners
3. **High contrast** - Pure black/white, no grays
4. **Minimal decoration** - Function over form
5. **Bold borders** - 2px+ black/white borders
6. **Red accent only** - Single accent color for emphasis

### CSS Classes (index.css)

| Class | Effect |
|-------|--------|
| `.hover-invert` | Inverts colors on hover (brutalist button effect) |
| `.animate-fadeIn` | Fade-in animation for page transitions |
| `.animate-blink` | Blinking cursor animation |

### Scrollbar

Custom scrollbar with accent color:
- Thumb: `var(--accent)` (red)
- Track: Transparent
- Width: 8px

### Selection

Text selection uses accent color:
- Background: `var(--accent)`
- Text: White

---

## Changing the Design

To switch from brutalist to a different style:

1. **tailwind.config.js** - Update colors, fonts, border-radius
2. **index.css** - Modify/remove brutalist overrides
3. **theme-utils.ts** - Adjust class generators if needed

The architecture separates design from logic, making style changes isolated.
