// --- Color Palette Definitions ---

export type PaletteId =
  | "teal-pink"
  | "cream-lavender"
  | "lime-coral"
  | "blue-yellow"
  | "mint-peach"
  | "mono-red"
  | "dandiya"
  | "bandhani"
  | "patola"
  | "kutch"
  | "rangoli";

interface PaletteColors {
  light: {
    bg: string;
    text: string;
    border: string;
    accent1: string;
    accent2: string;
  };
  dark: {
    bg: string;
    text: string;
    border: string;
    accent1: string;
    accent2: string;
  };
}

export interface PaletteConfig {
  id: PaletteId;
  name: string;
  colors: PaletteColors;
  /** Preview swatch colors for the picker UI */
  swatches: [string, string];
}

export const palettes: PaletteConfig[] = [
  {
    id: "teal-pink",
    name: "Teal + Pink",
    colors: {
      light: {
        bg: "#FFFFFF",
        text: "#000000",
        border: "#000000",
        accent1: "#0EB5B2", // deeper teal, readable on white
        accent2: "#E5457B", // deeper pink, readable on white
      },
      dark: {
        bg: "#1B2227",
        text: "#FFFFFF",
        border: "#FFFFFF",
        accent1: "#4DDDD9", // pastel teal glows on dark
        accent2: "#FB97B3", // pastel pink glows on dark
      },
    },
    swatches: ["#4DDDD9", "#FB97B3"],
  },
  {
    id: "cream-lavender",
    name: "Cream + Lavender",
    colors: {
      light: {
        bg: "#FDF6EC",
        text: "#000000",
        border: "#000000",
        accent1: "#7C3AED", // deep violet, strong on cream
        accent2: "#DB2777", // deep pink, strong on cream
      },
      dark: {
        bg: "#1E1E2E",
        text: "#FFFFFF",
        border: "#E8E0D0",
        accent1: "#D9BEFF", // soft lavender on dark
        accent2: "#FF8ACD", // soft pink on dark
      },
    },
    swatches: ["#D9BEFF", "#FF8ACD"],
  },
  {
    id: "lime-coral",
    name: "Lime + Coral",
    colors: {
      light: {
        bg: "#FFFFF0",
        text: "#000000",
        border: "#000000",
        accent1: "#65A30D", // olive/lime green, readable on ivory
        accent2: "#DC2626", // strong red-coral, readable on ivory
      },
      dark: {
        bg: "#1A1A1A",
        text: "#FFFFFF",
        border: "#FFFFFF",
        accent1: "#D3F46E", // neon lime on dark
        accent2: "#FF6B6B", // soft coral on dark
      },
    },
    swatches: ["#D3F46E", "#FF6B6B"],
  },
  {
    id: "blue-yellow",
    name: "Blue + Yellow",
    colors: {
      light: {
        bg: "#FAFAFA",
        text: "#000000",
        border: "#000000",
        accent1: "#2563EB", // strong blue, readable on white
        accent2: "#D97706", // amber/dark yellow, readable on white
      },
      dark: {
        bg: "#111827",
        text: "#FFFFFF",
        border: "#FFFFFF",
        accent1: "#A8D8FF", // sky blue on dark
        accent2: "#FFD166", // golden yellow on dark
      },
    },
    swatches: ["#A8D8FF", "#FFD166"],
  },
  {
    id: "mint-peach",
    name: "Mint + Peach",
    colors: {
      light: {
        bg: "#FFF9F5",
        text: "#000000",
        border: "#000000",
        accent1: "#059669", // deep emerald, readable on warm white
        accent2: "#DB2777", // deep rose, readable on warm white
      },
      dark: {
        bg: "#1B2227",
        text: "#FFFFFF",
        border: "#E8DDD5",
        accent1: "#ADFACE", // pastel mint on dark
        accent2: "#FFC6E7", // pastel peach on dark
      },
    },
    swatches: ["#ADFACE", "#FFC6E7"],
  },
  {
    id: "mono-red",
    name: "Monochrome",
    colors: {
      light: {
        bg: "#FFFFFF",
        text: "#000000",
        border: "#000000",
        accent1: "#DC2626", // strong red
        accent2: "#DC2626",
      },
      dark: {
        bg: "#000000",
        text: "#FFFFFF",
        border: "#FFFFFF",
        accent1: "#FF4444", // brighter red on dark
        accent2: "#FF4444",
      },
    },
    swatches: ["#FF4444", "#FF4444"],
  },
  // --- Navratri / Gujarat palettes ---
  {
    id: "dandiya",
    name: "Dandiya Night",
    colors: {
      light: {
        bg: "#FFFDF7",
        text: "#1A0A00",
        border: "#1A0A00",
        accent1: "#E65100", // deep saffron
        accent2: "#C2185B", // hot magenta
      },
      dark: {
        bg: "#1A0F08",
        text: "#FFF3E0",
        border: "#FFE0B2",
        accent1: "#FF9E40", // bright saffron glow
        accent2: "#F48FB1", // soft magenta glow
      },
    },
    swatches: ["#E65100", "#C2185B"],
  },
  {
    id: "bandhani",
    name: "Bandhani",
    colors: {
      light: {
        bg: "#FAFAFA",
        text: "#0A0A20",
        border: "#0A0A20",
        accent1: "#1A237E", // royal indigo
        accent2: "#D32F2F", // vermillion red
      },
      dark: {
        bg: "#0D0D1A",
        text: "#E8EAF6",
        border: "#C5CAE9",
        accent1: "#7986CB", // soft indigo glow
        accent2: "#EF9A9A", // soft vermillion glow
      },
    },
    swatches: ["#1A237E", "#D32F2F"],
  },
  {
    id: "patola",
    name: "Patola",
    colors: {
      light: {
        bg: "#FFFFF5",
        text: "#0D1A00",
        border: "#0D1A00",
        accent1: "#1B5E20", // deep patola green
        accent2: "#F9A825", // turmeric gold
      },
      dark: {
        bg: "#0D1A0F",
        text: "#E8F5E9",
        border: "#C8E6C9",
        accent1: "#81C784", // soft green glow
        accent2: "#FFD54F", // warm gold glow
      },
    },
    swatches: ["#1B5E20", "#F9A825"],
  },
  {
    id: "kutch",
    name: "Kutch",
    colors: {
      light: {
        bg: "#FFF8F0",
        text: "#1A0000",
        border: "#1A0000",
        accent1: "#0277BD", // mirror blue
        accent2: "#B71C1C", // deep red
      },
      dark: {
        bg: "#12181E",
        text: "#ECEFF1",
        border: "#CFD8DC",
        accent1: "#4FC3F7", // bright mirror blue glow
        accent2: "#EF5350", // soft red glow
      },
    },
    swatches: ["#0277BD", "#B71C1C"],
  },
  {
    id: "rangoli",
    name: "Rangoli",
    colors: {
      light: {
        bg: "#FFF9F0",
        text: "#1A0008",
        border: "#1A0008",
        accent1: "#AD1457", // hot pink
        accent2: "#EF6C00", // marigold orange
      },
      dark: {
        bg: "#1A0D10",
        text: "#FCE4EC",
        border: "#F8BBD0",
        accent1: "#F06292", // soft pink glow
        accent2: "#FFB74D", // soft marigold glow
      },
    },
    swatches: ["#AD1457", "#EF6C00"],
  },
];

export function getPalette(id: PaletteId): PaletteConfig {
  return palettes.find((p) => p.id === id) || palettes[5]; // fallback to mono-red
}

// --- Font Pairing Definitions ---

export type FontPairingId =
  | "victor-lato"
  | "plex-mono-sans"
  | "jetbrains-inter"
  | "lexend-plex"
  | "syne-space"
  | "dela-inter"
  | "unbounded-plex"
  | "rubik-mono-space";

export interface FontPairingConfig {
  id: FontPairingId;
  name: string;
  heading: string;
  body: string;
  /** Short label for the picker UI */
  label: string;
}

export const fontPairings: FontPairingConfig[] = [
  {
    id: "victor-lato",
    name: "Victor Mono + Lato",
    heading: '"Victor Mono"',
    body: '"Lato"',
    label: "Victor",
  },
  {
    id: "plex-mono-sans",
    name: "IBM Plex Mono + Sans",
    heading: '"IBM Plex Mono"',
    body: '"IBM Plex Sans"',
    label: "Plex",
  },
  {
    id: "jetbrains-inter",
    name: "JetBrains Mono + Inter",
    heading: '"JetBrains Mono"',
    body: '"Inter"',
    label: "JetBr",
  },
  {
    id: "lexend-plex",
    name: "Lexend Mega + IBM Plex Mono",
    heading: '"Lexend Mega"',
    body: '"IBM Plex Mono"',
    label: "Lexend",
  },
  {
    id: "syne-space",
    name: "Syne + Space Grotesk",
    heading: '"Syne"',
    body: '"Space Grotesk"',
    label: "Syne",
  },
  {
    id: "dela-inter",
    name: "Dela Gothic One + Inter",
    heading: '"Dela Gothic One"',
    body: '"Inter"',
    label: "Dela",
  },
  {
    id: "unbounded-plex",
    name: "Unbounded + IBM Plex Sans",
    heading: '"Unbounded"',
    body: '"IBM Plex Sans"',
    label: "Unbnd",
  },
  {
    id: "rubik-mono-space",
    name: "Rubik Mono One + Space Grotesk",
    heading: '"Rubik Mono One"',
    body: '"Space Grotesk"',
    label: "Rubik",
  },
];

export function getFontPairing(id: FontPairingId): FontPairingConfig {
  return fontPairings.find((f) => f.id === id) || fontPairings[1]; // fallback to plex
}

// --- Apply theme to :root CSS variables ---

export function applyPalette(paletteId: PaletteId, isDarkMode: boolean): void {
  const palette = getPalette(paletteId);
  const mode = isDarkMode ? palette.colors.dark : palette.colors.light;
  const root = document.documentElement;

  root.style.setProperty("--bg", mode.bg);
  root.style.setProperty("--text", mode.text);
  root.style.setProperty("--border", mode.border);
  root.style.setProperty("--accent1", mode.accent1);
  root.style.setProperty("--accent2", mode.accent2);
}

export function applyFontPairing(fontPairingId: FontPairingId): void {
  const fp = getFontPairing(fontPairingId);
  const root = document.documentElement;

  root.style.setProperty("--font-heading", fp.heading);
  root.style.setProperty("--font-body", fp.body);
}

// --- Tailwind class helpers (backward compatible) ---

export interface ThemeClasses {
  background: string;
  text: string;
  border: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentHover: string;
  accent2: string;
  accent2Bg: string;
  accent2Border: string;
  inputBg: string;
  divider: string;
}

export const getThemeClasses = (isDarkMode: boolean): ThemeClasses => ({
  background: "bg-theme-bg",
  text: "text-theme-text",
  border: "border-theme-border",
  accent: "text-accent",
  accentBg: "bg-accent",
  accentBorder: "border-accent",
  accentHover: "hover:border-accent hover:text-accent",
  accent2: "text-accent2",
  accent2Bg: "bg-accent2",
  accent2Border: "border-accent2",
  inputBg: "bg-theme-bg",
  divider: "bg-theme-border",
});
