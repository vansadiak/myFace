# Data & Configuration

All content data lives in `src/types/`. Edit these files to update site content.

---

## Project/Experience (`src/types/project.ts`)

### Types

```tsx
interface TextSegment {
  type: "text" | "link";
  content: string;
  href?: string;  // Required if type is "link"
}

type TextWithLinks = TextSegment[];

interface Project {
  company: { href: string; text: string };
  role: string;
  period: { start: string; end: string };
  location: string;
  achievements: TextWithLinks[];
  technologies: string[];
  imageUrl?: string;  // Optional company logo
}
```

### TextWithLinks Pattern

Allows inline links within achievement text:

```tsx
// Plain text
[{ type: "text", content: "Built a dashboard" }]

// Text with link
[
  { type: "text", content: "Implemented " },
  { type: "link", content: "OAuth 2.0", href: "https://oauth.net/2/" },
  { type: "text", content: " authentication" }
]
```

### Adding Experience

Add to `projects` array in `project.ts`:

```tsx
{
  company: { href: "https://company.com", text: "Company Name" },
  role: "Your Role",
  period: { start: "Jan 2024", end: "Present" },
  location: "Remote",
  achievements: [
    [{ type: "text", content: "Achievement description" }],
    // More achievements...
  ],
  technologies: ["React", "TypeScript", "Node.js"],
}
```

Order matters - first item displays first.

---

## Personal Info (`src/types/me.ts`)

### Types

```tsx
interface SocialLink {
  href: string;
  iconName: "github" | "linkedin" | "resume";
  label: string;  // Accessibility label
}
```

### Exported Data

| Export | Purpose |
|--------|---------|
| `name` | Display name on Home |
| `role` | Job title on Home |
| `location` | Location on Home |
| `socialLinks` | Array of social link objects |
| `cvLink` | Direct download link for CV |

### Updating Social Links

Edit `socialLinks` array:

```tsx
export const socialLinks: SocialLink[] = [
  { href: "https://github.com/username", iconName: "github", label: "GitHub" },
  { href: "https://linkedin.com/in/username", iconName: "linkedin", label: "LinkedIn" },
  { href: "https://drive.google.com/...", iconName: "resume", label: "Resume" },
];
```

Supported icons: `github`, `linkedin`, `resume`. Add more by extending the type and icon mapping in Home component.

---

## Firebase Config (`src/config/firebaseConfig.ts`)

Currently placeholder values. If using Firebase:

1. Create Firebase project
2. Get config from Firebase Console
3. Update values in `firebaseConfig.ts`

Firestore `db` instance exported but unused in current codebase.

---

## Configuration Files

### tailwind.config.js

Key customizations:
- `darkMode: "class"` - Class-based dark mode
- Custom `accent` color
- IBM Plex Mono as default mono font
- `borderRadius: { DEFAULT: "0" }` - Brutalist override

### tsconfig.json

Strict mode enabled. Key settings:
- `"strict": true`
- `"noImplicitAny": true`
- Target: ES5 for browser compat

### package.json

Scripts:
- `start` - Dev server
- `build` - Production build
- `build:prod` - Build with production env
