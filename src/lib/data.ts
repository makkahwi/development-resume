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

import json from "./data.json";

export const clientsList: ClientProps[] = json.developer.clients;
export const blogPosts: BlogProps[] = json.developer.blog;
export const jobsList: JobProps[] = json.developer.jobs;
export const traineesList: TraineeProps[] = json.developer.trainees;
export const projectsList: ProjectProps[] = json.developer.projects;
export const skillsList: SkillsProps[] = json.developer.skills;
export const testimonialsList: TestimonialProps[] = json.developer.testimonials;

export const contactsList: ContactProps[] = json.common.contacts;
export const educationsList: EducationProps[] = json.common.education;

export const statisticsList: StatisticProps[] = [
  {
    count: jobsList.reduce((total, job) => total + (job.monthsCount || 0), 0),
    label: "Months in Web Dev",
    description:
      "Spanning multiple roles since 2015, excluding earlier years as a graphic designer.",
  },
  {
    count: projectsList.filter(({ category }) => category === "Web App")
      ?.length,
    label: "Software Built",
    description:
      "From client portals to internal tools — samples are showcased in the Works section.",
  },
  {
    count: clientsList.length,
    label: "Happy Clients",
    description:
      "Happy employers & direct clients, whom accepted & used the end results.",
  },
  {
    count: traineesList.length,
    label: "Individuals Trained",
    description:
      "Mentored aspiring developers through real-world projects, self-paced learning paths, and code quality reviews.",
  },
  {
    count: projectsList.filter(({ category }) => category === "Consulting")
      ?.length,
    label: "Projects Consulted",
    description:
      "Provided strategic guidance to founders and product owners, regarding roadmapping, architecture and product direction.",
  },
  {
    count: projectsList.filter(({ designed }) => designed)?.length,
    label: "Solutions Architected",
    description:
      "Led end-to-end solution design: from client needs analysis to user journeys and UX flows.",
  },
];

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

export const getBlogPosts = (locale: string): BlogPostView[] => {
  const lang = normalizeLocale(locale);

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
  const posts = getBlogPosts(locale);
  const match = posts.find((post) => post.slug === slug);
  return match || null;
};
