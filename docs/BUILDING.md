# Building Guide

## Setup

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Production build
npm run build
```

Requires Node.js 21+ (managed via Volta).

## Environment Variables

Create `.env` for local development:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_ADMIN_TEMPLATE_ID=your_admin_template
REACT_APP_EMAILJS_RESPONSE_TEMPLATE_ID=your_response_template
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

Production uses `.env.production`.

---

## Coding Standards

### TypeScript

- **Strict mode enabled** - All code must be fully typesafe
- No `any` types - Use proper interfaces/types
- Define interfaces for all props, data structures
- Export types from `src/types/` for shared use

```tsx
// Good
interface Props {
  title: string;
  onClick: () => void;
}

// Bad
const Component = (props: any) => { ... }
```

### Testing

- **No tests required** - Testing setup exists but not enforced
- Focus on TypeScript for correctness
- Add tests only if complexity warrants it

### Styling

- **Tailwind only** - No custom CSS unless absolutely necessary
- Use `theme-utils.ts` for theme-aware classes
- Follow brutalist principles (or current design system)
- Responsive: mobile-first with `md:` breakpoints

```tsx
// Good
<div className={`${theme.bg} ${theme.text} border-2 ${theme.border} p-4`}>

// Avoid
<div style={{ backgroundColor: 'white', padding: '16px' }}>
```

### Components

- Functional components only (no class components)
- One component per file
- Folder per component if multiple files needed
- Use lazy loading for route components

### Design Philosophy

**Current: Web Brutalist + Functional**
- Prioritize function over decoration
- Sharp edges, high contrast
- Monochrome + single accent color
- Clear hierarchy, no ambiguity

This can change - see [ARCHITECTURE.md](./ARCHITECTURE.md#changing-the-design).

---

## Adding Features

### New Page

1. Create component in `src/components/NewPage/NewPage.tsx`
2. Add lazy import in `App.tsx`
3. Add route to `routes` array in `App.tsx`
4. Navigation link auto-generates from route config

### New Component

1. Create in `src/components/ComponentName/`
2. Define TypeScript interface for props
3. Use `useDarkMode()` hook if theme-aware
4. Apply theme classes via `getThemeClasses()`

### New Data Type

1. Define interface in `src/types/`
2. Export type and data from same file
3. Import where needed

### New Hook

1. Create in `src/hooks/`
2. Prefix with `use` (React convention)
3. Return tuple or object as appropriate

---

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase | `Projects.tsx` |
| Hook | camelCase with `use` prefix | `useDarkMode.ts` |
| Type file | camelCase | `project.ts` |
| Utility | kebab-case | `theme-utils.ts` |

---

## Build Output

Production build outputs to `build/` folder:
- Static files ready for deployment
- Code-split chunks for lazy-loaded routes
- Optimized and minified

Deploy to any static hosting (Vercel, Netlify, GitHub Pages, etc.).
