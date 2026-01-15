# Components

## App (`src/components/App/App.tsx`)

Root component. Handles:

| Responsibility | Implementation |
|----------------|----------------|
| Theme provider | Wraps app in `ThemeProvider` |
| Routing | `BrowserRouter` + `Routes` |
| Navigation | Header with route links |
| Code splitting | `Suspense` with loading fallback |

**Navigation includes:**
- Route links (generated from config)
- CV download link (Google Drive)
- Theme toggle button

---

## Home (`src/components/Home/Home.tsx`)

Landing page with:

| Element | Behavior |
|---------|----------|
| Name | Static display |
| Role | "Full Stack Developer" |
| Location | "India" |
| Tagline | Animated typing effect with blinking cursor |
| Social links | GitHub, LinkedIn, Resume icons |

**Interactions:**
- Click tagline → navigates to `/experience`
- Social icons → external links (new tab)

---

## Projects (`src/components/Projects/Projects.tsx`)

Work experience display with dual layouts:

| Viewport | Layout |
|----------|--------|
| Desktop (`md:`) | Table with expandable rows |
| Mobile | Cards with expandable content |

**Features:**
- Expandable rows/cards for achievements
- Technology tags per entry
- Links within achievement text (TextWithLinks support)

**Keyboard Navigation:**
| Key | Action |
|-----|--------|
| `j` / `↓` | Next item |
| `k` / `↑` | Previous item |
| `Enter` / `Space` | Toggle expand |

Data sourced from `src/types/project.ts`.

---

## Contact (`src/components/ContactMe/Contact.tsx`)

Email contact form using EmailJS.

**Fields:**
- Name (required)
- Email (required)
- Message (required, textarea)

**States:**

| State | Visual |
|-------|--------|
| Idle | Default border |
| Loading | Spinner, disabled inputs |
| Success | Green border, success message |
| Error | Red border, error message |

**EmailJS Flow:**
1. User submits form
2. Sends admin notification email
3. Sends auto-response to user
4. Shows success/error state

Requires environment variables (see [BUILDING.md](./BUILDING.md#environment-variables)).

---

## Shared Patterns

### Theme Usage

All components use the theme hook:

```tsx
const [isDarkMode] = useDarkMode();
const theme = getThemeClasses(isDarkMode);
```

### Responsive Pattern

Mobile-first with Tailwind breakpoints:

```tsx
<div className="block md:hidden">  {/* Mobile only */}
<div className="hidden md:block">  {/* Desktop only */}
```

### Animation

Framer Motion available but sparingly used. Primary animations via CSS:
- `animate-fadeIn` for page transitions
- `animate-blink` for cursor effect
- CSS Grid transitions for expand/collapse
