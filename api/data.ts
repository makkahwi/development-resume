import "server-only";
import localData from "./blog-backup.json";
import {
  clientsURL,
  fetchJson,
  jobProjectsURL,
  ProjectProps,
  skillsURL,
} from "./client-data";
import { JobProps } from "@/sections/about/statistics";
import { EducationProps } from "@/sections/education";
import { ClientProps } from "@/sections/clients";
import { TestimonialProps } from "@/sections/testimonials";
import { TraineeProps } from "@/sections/helps/training";
import { ContactProps } from "@/layout/Footer";
import { SkillProps } from "@/sections/skills";

export const apiCallRevalidate = 60 * 60 * 24 * 30;

const RESUME_BASE =
  process.env.RESUME_DB_BASE_URL ??
  "https://resume-data-8215f-default-rtdb.europe-west1.firebasedatabase.app";

const ALEMBIC_BASE =
  process.env.ALEMBIC_DB_BASE_URL ??
  "https://alembicsoft-75205-default-rtdb.europe-west1.firebasedatabase.app";

const LOCAL_BLOG = process.env.BLOG_LOCAL === "1";

const alembicAR = `${ALEMBIC_BASE}/ar.json`;
const alembicEN = `${ALEMBIC_BASE}/en.json`;

export const getBlogArPosts = async () => {
  if (LOCAL_BLOG) return (localData as any).ar;
  return fetchJson<typeof localData.ar>(alembicAR, "blog-ar");
};

export const getSemesteerBlogEnPosts = async () => {
  if (LOCAL_BLOG) return (localData as any).en;
  return fetchJson<typeof localData.en>(alembicEN, "blog-en");
};

const personalAR = `${ALEMBIC_BASE}/ar.json`;
const personalEN = `${ALEMBIC_BASE}/en.json`;

export const getPersonalBlogArPosts = async () => {
  if (LOCAL_BLOG) return (localData as any).ar;
  return fetchJson<typeof localData.ar>(personalAR, "pblog-ar");
};

export const getPersonalBlogEnPosts = async () => {
  if (LOCAL_BLOG) return (localData as any).en;
  return fetchJson<typeof localData.en>(personalEN, "pblog-en");
};

const jobsURL = `${RESUME_BASE}/jobs.json`;
const educationURL = `${RESUME_BASE}/education.json`;
const testimonialsURL = `${RESUME_BASE}/testimonials.json`;
const traineesURL = `${RESUME_BASE}/trainees.json`;
const contactsURL = `${RESUME_BASE}/contacts.json`;

export const getJobs = async (): Promise<JobProps[]> =>
  fetchJson(jobsURL, "jobs");
export const getEducation = async (): Promise<EducationProps[]> =>
  fetchJson(educationURL, "education");
export const getClients = async (): Promise<ClientProps[]> =>
  fetchJson(clientsURL, "clients");
export const getTestimonials = async (): Promise<TestimonialProps[][]> =>
  fetchJson(testimonialsURL, "testimonials");
export const getTrainees = async (): Promise<TraineeProps[]> =>
  fetchJson(traineesURL, "trainees");
export const getContacts = async (): Promise<ContactProps[]> =>
  fetchJson(contactsURL, "contacts");
export const getSkills = async (): Promise<SkillProps[]> =>
  fetchJson(skillsURL, "skills");

export const getJobProjects = async (): Promise<ProjectProps[]> =>
  fetchJson<ProjectProps[]>(jobProjectsURL, "works");
