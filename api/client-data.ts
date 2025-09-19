import { ClientProps } from "@/sections/clients";
import { SkillProps } from "@/sections/skills";

const RESUME_BASE =
  process.env.RESUME_DB_BASE_URL ??
  "https://resume-data-8215f-default-rtdb.europe-west1.firebasedatabase.app";

export async function fetchJson<T>(url: string, tag: string): Promise<T> {
  const res = await fetch(url, { next: { tags: [tag] } });
  if (!res.ok) throw new Error(`Fetch failed (${res.status}) for ${url}`);
  return res.json();
}

export interface ProjectProps {
  category: string;
  comingSoon?: boolean;
  designed?: boolean;
  description: string;
  type: string;
  image: string;
  title: string;
  shortTitle?: string;
  url?: string;
  technologies: string[];
  details: string[];
  company?: string;
  role?: string;
  location?: string;
  date: number;
  hide?: boolean;
  timeOrder?: number;
  importanceOrder?: number;
  openSource?: boolean;
  foc?: boolean;
}

export const clientsURL = `${RESUME_BASE}/clients.json`;
export const skillsURL = `${RESUME_BASE}/skills.json`;
export const jobProjectsURL = `${RESUME_BASE}/job-projects.json`;

export const getJobProjects = async (): Promise<ProjectProps[]> =>
  fetchJson<ProjectProps[]>(jobProjectsURL, "works");
export const getSkills = async (): Promise<SkillProps[]> =>
  fetchJson(skillsURL, "skills");
export const getClients = async (): Promise<ClientProps[]> =>
  fetchJson(clientsURL, "clients");
