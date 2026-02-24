import {
  BlogProps,
  ClientProps,
  ContactProps,
  EducationProps,
  JobProps,
  ProjectProps,
  SkillsProps,
  StatisticProps,
  TestimonialProps,
  TraineeProps,
} from "@/types/data";
import service from "./api";
import { periodCalculator } from "./dateUtils";

type ResumeData = {
  developer: {
    clients: ClientProps[];
    blog: BlogProps[];
    jobs: JobProps[];
    trainees: TraineeProps[];
    projects: ProjectProps[];
    skills: SkillsProps[];
    testimonials: TestimonialProps[];
  };
  common: {
    contacts: ContactProps[];
    education: EducationProps[];
  };
};

const EMPTY_RESUME_DATA: ResumeData = {
  developer: {
    clients: [],
    blog: [],
    jobs: [],
    trainees: [],
    projects: [],
    skills: [],
    testimonials: [],
  },
  common: {
    contacts: [],
    education: [],
  },
};

const asArray = <T>(value: unknown): T[] => {
  return Array.isArray(value) ? (value as T[]) : [];
};

const normalizeResumeData = (value: unknown): ResumeData => {
  if (!value || typeof value !== "object") {
    return EMPTY_RESUME_DATA;
  }

  const root = value as Record<string, unknown>;
  const developer = (root.developer as Record<string, unknown>) || {};
  const common = (root.common as Record<string, unknown>) || {};

  return {
    developer: {
      clients: asArray<ClientProps>(developer.clients),
      blog: asArray<BlogProps>(developer.blog),
      jobs: asArray<JobProps>(developer.jobs),
      trainees: asArray<TraineeProps>(developer.trainees),
      projects: asArray<ProjectProps>(developer.projects),
      skills: asArray<SkillsProps>(developer.skills),
      testimonials: asArray<TestimonialProps>(developer.testimonials),
    },
    common: {
      contacts: asArray<ContactProps>(common.contacts),
      education: asArray<EducationProps>(common.education),
    },
  };
};

let cachedResumeData: ResumeData | null = null;

export const getResumeData = async (): Promise<ResumeData> => {
  if (cachedResumeData) {
    return cachedResumeData;
  }

  try {
    const data = await service.get(".json");
    cachedResumeData = normalizeResumeData(data);
  } catch {
    cachedResumeData = EMPTY_RESUME_DATA;
  }

  return cachedResumeData;
};

export const getClientsList = async (): Promise<ClientProps[]> =>
  (await getResumeData()).developer.clients;

export const getBlogEntries = async (): Promise<BlogProps[]> =>
  (await getResumeData()).developer.blog;

export const getJobsList = async (): Promise<JobProps[]> =>
  (await getResumeData()).developer.jobs;

export const getTraineesList = async (): Promise<TraineeProps[]> =>
  (await getResumeData()).developer.trainees;

export const getProjectsList = async (): Promise<ProjectProps[]> =>
  (await getResumeData()).developer.projects;

export const getSkillsList = async (): Promise<SkillsProps[]> =>
  (await getResumeData()).developer.skills;

export const getTestimonialsList = async (): Promise<TestimonialProps[]> =>
  (await getResumeData()).developer.testimonials;

export const getContactsList = async (): Promise<ContactProps[]> =>
  (await getResumeData()).common.contacts;

export const getEducationsList = async (): Promise<EducationProps[]> =>
  (await getResumeData()).common.education;

export const buildStatisticsList = (
  t: (key: string) => string,
  data?: {
    jobs?: JobProps[];
    clients?: ClientProps[];
    projects?: ProjectProps[];
    trainees?: TraineeProps[];
  },
): StatisticProps[] => {
  const jobs = data?.jobs || [];
  const clients = data?.clients || [];
  const projects = data?.projects || [];
  const trainees = data?.trainees || [];

  return [
    {
      count: jobs
        .filter(({ type }) => type === "Freelance")
        .reduce(
          (total, { start, end }) => total + periodCalculator(start, end),
          0,
        ),
      label: t("MonthsInWebDev.Label"),
      description: t("MonthsInWebDev.Description"),
    },
    {
      count: projects.filter(({ consultation }) => !consultation)?.length,
      label: t("SoftwareBuilt.Label"),
      description: t("SoftwareBuilt.Description"),
    },
    {
      count: clients.length,
      label: t("HappyClients.Label"),
      description: t("HappyClients.Description"),
    },
    {
      count: trainees.length,
      label: t("IndividualsTrained.Label"),
      description: t("IndividualsTrained.Description"),
    },
    {
      count: projects.filter(({ designed }) => designed)?.length,
      label: t("SolutionsArchitected.Label"),
      description: t("SolutionsArchitected.Description"),
    },
    {
      count: projects.filter(({ consultation }) => consultation)?.length,
      label: t("ProjectsConsulted.Label"),
      description: t("ProjectsConsulted.Description"),
    },
  ];
};

type BlogLocale = "en" | "ar";

export type BlogPostView = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  publishedAt: string;
  tags: string[];
  category: string;
  image?: string;
};

const normalizeLocale = (locale: string): BlogLocale =>
  locale === "ar" ? "ar" : "en";

const escapeHtml = (text = "") =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderBlogContent = (blocks: BlogProps["versions"]["en"]["long"]) => {
  return blocks
    .map((block) => {
      const type = block.type;

      if (type === "heading") {
        const level =
          block.level && block.level >= 2 && block.level <= 4 ? block.level : 2;
        const text = escapeHtml(block.text || "");
        return `<h${level}>${text}</h${level}>`;
      }

      if (type === "list") {
        const items = block.items || [];
        const tag = block.style === "ordered" ? "ol" : "ul";
        const listItems = items
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join("");
        return `<${tag}>${listItems}</${tag}>`;
      }

      const text = escapeHtml(block.text || "");
      return `<p>${text}</p>`;
    })
    .join("");
};

const buildExcerpt = (blocks: BlogProps["versions"]["en"]["short"]) => {
  const text = blocks
    .map((block) => block.text || "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return text;
};

export const getBlogPosts = async (locale: string): Promise<BlogPostView[]> => {
  const lang = normalizeLocale(locale);
  const blogPosts = await getBlogEntries();

  return blogPosts
    .filter((post) => post?.versions?.[lang]?.slug)
    .map((post) => {
      const version = post.versions[lang];
      return {
        id: post.id,
        slug: version.slug,
        title: version.title,
        excerpt: buildExcerpt(version.short),
        contentHtml: renderBlogContent(version.long),
        publishedAt: post.date || "1970-01-01",
        tags: post.tags || [],
        category: post.category || "",
        image: post.image,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
};

export const getBlogPost = async (
  locale: string,
  slug: string,
): Promise<BlogPostView | null> => {
  const posts = await getBlogPosts(locale);
  const match = posts.find((post) => post.slug === slug);
  return match || null;
};
