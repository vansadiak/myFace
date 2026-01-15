export interface SocialLink {
  href: string;
  iconName: "github" | "linkedin" | "resume";
  label: string;
}

export const introText = {
  name: "Kuldeep",
  role: "Full Stack Developer",
  location: "India",
} as const;

export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/vansadiak",
    iconName: "github",
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/kuldeep-vansadia-34b7631a6/",
    iconName: "linkedin",
    label: "LinkedIn",
  },
  {
    href: "https://drive.google.com/file/d/1IthRqKms_w5I5xOij96YFUd2WfxoQYlb/view?usp=sharing",
    iconName: "resume",
    label: "Resume",
  },
];

export const cvDownloadLink =
  "https://drive.google.com/uc?export=download&id=1IthRqKms_w5I5xOij96YFUd2WfxoQYlb";
