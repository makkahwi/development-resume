interface BlogPostContent {
  text?: string;
  type: string;
  items?: string[];
}

interface BlogContentBlock {
  long: BlogPostContent[];
  meta: {
    description: string;
    title: string;
  };
  short: BlogPostContent[];
  slug: string;
  title: string;
}

export interface BlogProps {
  category: string;
  date: string;
  image?: string;
  id: string;
  tags: string[];
  versions: {
    ar: BlogContentBlock;
    en: BlogContentBlock;
  };
}

export interface ClientProps {
  name: string;
  img: string;
  link: string;
  prominent?: boolean;
}

export interface JobProps {
  company: string;
  description: string[];
  location?: string;
  monthsCount?: number;
  period: string;
  projectsCount?: number;
  title: string;
  type: string;
  website?: string;
}

export interface ProjectProps {
  category: string | "Web App" | "Consulting" | "Graphic Design";
  comingSoon?: boolean;
  company?: string;
  date?: number;
  description: string;
  details?: string[];
  image: string;
  importanceOrder: number;
  url?: string;
  location?: string;
  role?: string;
  shortTitle?: string;
  designed?: boolean;
  technologies?: string[];
  timeOrder: number;
  title: string;
  type?: string;
}

export interface SkillsProps {
  color: string;
  groups: string[];
  icon: string;
  name: string;
  rate: number;
  subSkills?: string[];
  website?: string;
}

export interface TestimonialProps {
  author: string;
  content: string;
  img: string;
  link: string;
}

export interface TraineeProps {
  img: string;
  link: string;
  name: string;
  highlight?: boolean;
}
