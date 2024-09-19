export interface Project {
  title: string;
  position: string;
  duration: string;
  location: string;
  details: string[];
  imageUrl: string;
}

export const projects: Project[] = [
  {
    title: "SOLVEI8",
    position: "SENIOR FRONT END DEVELOPER",
    duration: "Sept 2023 - Present",
    location: "REMOTE, IN",
    details: [
      "Leading a team of three in the development of a comprehensive Planning app for planners in the apparel industry (Available on Play Store and App Store), integrating stateful calendars, timelines (leveraging D3), and customized tables/forms. This initiative resulted in a dynamic, user-centric planning tool.",
      "Spearheaded the expansion and introduction of the UI library in our Monorepo at Solvei8, introducing dynamic forms, tables, and charting elements to provide a standardized and scalable user interface for various applications. Also introduced and developed typing, services, and utils library. This reduced the dev effort by 60-80%, production bug rates decreased by 80%, improved UX across applications, reduced dev testing by 40%, and improved code quality and maintainability.",
      "Successfully migrated legacy applications (Angular 5) into a Monorepo like TV dashboard which included real-time dashboard with WebSocket connections (whose support was not present in Monorepo) amongst other complex applications. This ensured that feature development time reduced by 80-90% for migrated applications, and production bug rates decreased by more than 95%.",
    ],
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    title: "SOLVEI8 (ex ZILINGO)",
    position: "FRONT END DEVELOPER",
    duration: "Sept 2021 - Sept 2023",
    location: "REMOTE, IN",
    details: [
      "Developed a comprehensive analytics dashboard app (Available on Play Store and App Store) for tracking apparel industry metrics and visualizing data in real-time.",
      "Successfully migrated legacy applications from Angular 5 to Angular 14 in a monorepo architecture using Angular, Ionic, and React. This update reduced technical debt by 40%, improved app performance by 30%, and enabled the dev team to deliver product updates 25% faster, aligning with evolving requirements.",
    ],
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    title: "ZEOTAP",
    position: "DATA SCIENCE, CO-OP",
    duration: "Sep 2020 - Sept 2021",
    location: "REMOTE, IN",
    details: [
      "Worked on cleaning, scoring, finding anomalies, and forming modules in huge network graphs with nodes and edges in billions using state-of-the-art scalable machine-learning algorithms in Pyspark, Graph Frames, Graphx, and Networkx libraries.",
    ],
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
  },
];
