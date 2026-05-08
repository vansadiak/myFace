// First, let's define a type for a link object
export type LinkObject = { href: string; text: string };

// Define the type for text that may contain links
export type TextWithLinks = string | LinkObject | Array<string | LinkObject>;

export interface Project {
  company: LinkObject;
  role: string;
  period: {
    start: string;
    end: string;
  };
  location: string;
  achievements: TextWithLinks[]; // Array of TextWithLinks
  technologies: string[];
  imageUrl?: string; // Optional preview image URL
}

export const projectData: Project[] = [
  {
    company: {
      href: "https://www.entrupy.com",
      text: "ENTRUPY",
    },
    role: "SENIOR FULL STACK ENGINEER",
    period: {
      start: "Oct 2025",
      end: "Present",
    },
    location: "REMOTE, IN",
    achievements: [
      "Architected a structured authentication workflow engine with branching decision paths, multi-region consensus voting with tie-breaking guards, and confirmation gates — handling complex result states across globally distributed teams.",
      "Diagnosed and resolved critical performance issues including GPU memory leaks in OpenSeadragon image viewers, Vuex state leaks on unmount, Redis lock contention on cache pipelines, and Vue reactivity storms firing ~70 duplicate events per page load.",
      "Optimized real-time SocketIO infrastructure by eliminating zombie socket connections and heartbeat event bursts, and reduced image search bandwidth through progressive SD-to-HD loading, browser caching, and DOM virtualization for infinite scroll.",
      "Redesigned the CMS cache system to a declarative registry pattern, migrated hardcoded configs to CMS-driven delivery, and built path-aware workflow analytics with PostHog tracking branching completions, hover times, and vote timing cohorts.",
    ],
    technologies: [
      "Vue 3",
      "Python",
      "Flask",
      "FastAPI",
      "TypeScript",
      "SocketIO",
      "Redis",
      "PostHog",
      "AWS",
      "OpenTelemetry",
    ],
  },
  {
    company: {
      href: "https://solvei8.com",
      text: "SOLVEI8",
    },
    role: "LEAD ENGINEER | SENIOR FRONT END DEVELOPER | FRONT END DEVELOPER",
    period: {
      start: "Sept 2021",
      end: "Oct 2025",
    },
    location: "REMOTE, IN",
    achievements: [
      [
        "Led a team of 5 developers to build and scale Maintaini8, a full-stack machine maintenance platform with inventory management, downtime tracking, preventive maintenance, and real-time analytics (Available on ",
        {
          href: "https://play.google.com/store/apps/details?id=com.zinnov8.machine.maintenance&hl=en_IN",
          text: "Play Store",
        },
        " and ",
        {
          href: "https://apps.apple.com/in/app/maintaini8/id1666505304",
          text: "App Store",
        },
        ")",
      ],
      "Drove monorepo evolution across Angular (5–16), Ionic, and React, including major upgrades and Nx migrations, reducing feature development time by up to 80–90% and production bugs by over 80–95%.",
      "Designed and implemented reusable UI libraries for dynamic forms, tables, charts, and shared typings/services/utils, cutting new feature effort by 60–80% and improving UX and maintainability.",
      [
        "Delivered planning and analytics apps for apparel factories with rich timelines, D3-based visualizations, WebSocket dashboards, and stateful calendars (Available on ",
        {
          href: "https://play.google.com/store/apps/details?id=com.solvei8.tna.updates&hl=en",
          text: "Play Store",
        },
        " and ",
        {
          href: "https://apps.apple.com/us/app/plani8/id6670177547",
          text: "App Store",
        },
        "), adopted in production by global customers.",
      ],
    ],
    technologies: [
      "Angular",
      "Scala",
      "Ionic",
      "SQL",
      "React",
      "Typescript",
      "D3",
      "RxJS",
      "Nx",
      "Team Leadership",
    ],
  },
  {
    company: {
      href: "https://zeotap.com",
      text: "ZEOTAP",
    },
    role: "DATA SCIENCE, CO-OP",
    period: {
      start: "Sep 2020",
      end: "Sept 2021",
    },
    location: "REMOTE, IN",
    achievements: [
      "Worked on cleaning, scoring, finding anomalies, and forming modules in huge network graphs with nodes and edges in billions using state-of-the-art scalable machine-learning algorithms in Pyspark, Graph Frames, Graphx and NumPy libraries",
    ],
    technologies: ["Pyspark", "Graph Frames", "Graphx", "NumPy"],
  },
];
