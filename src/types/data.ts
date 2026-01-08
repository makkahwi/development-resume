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
  label: string;
  image: string;
  url: string;
  prominent?: boolean;
}

export interface ContactProps {
  color: string;
  icon: string;
  label: string;
  url: string;
  name: string;
}

export interface EducationProps {
  cert: string;
  description: string;
  downloads: {
    label: string;
    url: string;
  }[];
  logo: string;
  label: string;
  school: string;
  url: string;
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
  label: string;
  rate: number;
  subSkills?: string[];
  website?: string;
}

export interface StatisticProps {
  count: number;
  label: string;
  description: string;
}

export interface TestimonialProps {
  author: string;
  content: string;
  image: string;
  url: string;
}

export interface TraineeProps {
  image: string;
  url: string;
  label: string;
  highlight?: boolean;
}
