// First, let's define a type for a link object
export type LinkObject = { href: string; text: string };

// Define the type for text that may contain links
export type TextWithLinks = string | LinkObject | Array<string | LinkObject>;

export interface Project {
  company: TextWithLinks;
  role: string;
  period: {
    start: string;
    end: string;
  };
  location: string;
  achievements: TextWithLinks[]; // Array of TextWithLinks
  technologies: string[];
}

export const projectData: Project[] = [
  {
    company: {
      href: "https://solvei8.com",
      text: "SOLVEI8"
    },
    role: "LEAD ENGINEER",
    period: {
      start: "Oct 2024",
      end: "Present",
    },
    location: "REMOTE, IN",
    achievements: [
      [
        "Leading a team of 5 developers as a Full Stack Engineer, managing both backend and frontend development for Maintaini8 - a comprehensive machine maintenance platform (Available on ",
        {
          href: "https://play.google.com/store/apps/details?id=com.zinnov8.machine.maintenance&hl=en_IN",
          text: "Play Store",
        },
        " and ",
        {
          href: "https://apps.apple.com/in/app/maintaini8/id1666505304",
          text: "App Store",
        },
        "), overseeing the complete development lifecycle of Maintaini8, a full-fledged machine maintenance tool featuring inventory management, downtime tracking, automated breakdown assignments, preventive maintenance, and real-time analytics"
      ],

      "Led comprehensive monorepo migration from Angular 14 to 16, including Ionic framework upgrades and Nx workspace migration, ensuring seamless transition while maintaining application stability and performance across multiple projects",
    ],
    technologies: ["Full Stack", "Scala","Angular","React","Typescript","Team Leadership", "Backend", "Frontend", "Architecture"],
  },
  {
    company: {
      href: "https://solvei8.com",
      text: "SOLVEI8"
    },
    role: "SENIOR FRONT END DEVELOPER",
    period: {
      start: "Sept 2023",
      end: "Sept 2024",
    },
    location: "REMOTE, IN",
    achievements: [
      [
        "Leading a team of three in the development of a comprehensive Planning app for planners in apparel industry (Available on ",
        {
          href: "https://play.google.com/store/apps/details?id=com.solvei8.tna.updates&hl=en",
          text: "Play Store",
        },
        " and ",
        {
          href: "https://apps.apple.com/us/app/plani8/id6670177547",
          text: "App Store",
        },
        "), integrating stateful calendars, timelines (leveraging D3), and customized tables/forms.",
      ],
      "Spearheaded the expansion and introduction of the UI library in our Monorepo at Solvei8, introducing dynamic forms, tables, and charting elements to provide a standardized and scalable user interface for various applications. Also introduced and developed typing, services and utils library. This reduced the dev effort by 60-80%, production bug rates decreased by 50%, improved UX across applications, reduced dev testing by 40% and improved code quality and maintainability.",
      "Successfully migrated legacy applications (angular 5) into a Monorepo like Tv dashboard which included real time dashboard with Websocket connections (whose support was not present in Monorepo) amongst other complex applications. This made sure that feature development time reduced by 80-90% for migrated applications, Production bug rates decreased by more than 95%.",
    ],
    technologies: ["Angular", "Ionic", "Typescript", "D3", "RxJS","React","Monorepo"],
  },
  {
    company: {
      href: "https://solvei8.com",
      text: "SOLVEI8 (ex ZILINGO)"
    },
    role: "FRONT END DEVELOPER",
    period: {
      start: "Sept 2021",
      end: "Sept 2023",
    },
    location: "REMOTE, IN",
    achievements: [
      [
        "Developed a comprehensive analytics dashboard app (Available on ",
        {
          href: "https://play.google.com/store/apps/details?id=com.zilingo.factory&hl=en",
          text: "Play Store",
        },
        " and ",
        {
          href: "https://apps.apple.com/us/app/solvei8-analytics/id6443829907",
          text: "App Store",
        },
        ") for tracking apparel industry metrics and visualizing data in real-time.",
      ],
      "Successfully migrated legacy applications from Angular 5 to Angular 14 in a monorepo architecture using Angular, Ionic, and React. This update reduced technical debt by 40%, improved app performance by 30%, and enabled the dev team to deliver product updates 25% faster, aligning with evolving requirements.",
    ],
    technologies: ["Angular", "Ionic", "React", "Typescript", "RxJS"],
  },
  {
    company: {
      href: "https://zeotap.com",
      text: "ZEOTAP"
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
