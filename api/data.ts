import axios from "axios";
import { cache } from "react";

import localData from "./blog-backup.json";

const alembicApi = axios.create({
  baseURL:
    "https://alembicsoft-75205-default-rtdb.europe-west1.firebasedatabase.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

const local = false;

const getBlogArPostsApi = () =>
  local ? { data: localData.ar } : alembicApi.get("ar.json");
const getSemesteerBlogEnPostsApi = async () =>
  local ? { data: localData.en } : alembicApi.get("en.json");

export const getBlogArPosts = cache(async () => {
  const { data } = await getBlogArPostsApi();

  return data;
});

export const getSemesteerBlogEnPosts = cache(async () => {
  const { data } = await getSemesteerBlogEnPostsApi();

  return data;
});

const personalApi = axios.create({
  baseURL:
    "https://alembicsoft-75205-default-rtdb.europe-west1.firebasedatabase.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

const getPersonalBlogArPostsApi = () =>
  local ? { data: localData.ar } : personalApi.get("ar.json");
const getPersonalBlogEnPostsApi = async () =>
  local ? { data: localData.en } : personalApi.get("en.json");

export const getPersonalBlogArPosts = cache(async () => {
  const { data } = await getPersonalBlogArPostsApi();

  return data;
});

export const getPersonalBlogEnPosts = cache(async () => {
  const { data } = await getPersonalBlogEnPostsApi();

  return data;
});

const api = axios.create({
  baseURL:
    "https://resume-data-8215f-default-rtdb.europe-west1.firebasedatabase.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

const getJobsApi = () => api.get("jobs.json");
const getEducationApi = () => api.get("education.json");
const getClientsApi = () => api.get("clients.json");
const getTestimonialsApi = () => api.get("testimonials.json");
const getTraineesApi = () => api.get("trainees.json");
const getContactsApi = () => api.get("contacts.json");
const getSkillsApi = () => api.get("skills.json");
const getJobProjectsApi = () => api.get("job-projects.json");

export const apiCallRevalidate = 60 * 60 * 24 * 7; // seconds * mins * hours * days

export const getJobs = cache(async () => {
  const { data } = await getJobsApi();

  return data;
});

export const getSkills = cache(async () => {
  const { data } = await getSkillsApi();

  return data;
});

export const getEducation = cache(async () => {
  const { data } = await getEducationApi();

  return data;
});

export const getClients = cache(async () => {
  const { data } = await getClientsApi();

  return data;
});

export const getContacts = cache(async () => {
  const { data } = await getContactsApi();

  return data;
});

export const getTestimonials = cache(async () => {
  const { data } = await getTestimonialsApi();

  return data;
});

export const getTrainees = cache(async () => {
  const { data } = await getTraineesApi();

  return data;
});

export const getJobProjects = cache(async () => {
  const { data } = await getJobProjectsApi();

  return data;
});
