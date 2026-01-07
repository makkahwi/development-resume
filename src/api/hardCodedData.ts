import {
  BlogProps,
  ClientProps,
  JobProps,
  ProjectProps,
  SkillsProps,
  TestimonialProps,
  TraineeProps,
} from "@/types/data";
import json from "./data.json";

export const clientsList: ClientProps[] = json.clients;
export const blogPosts: BlogProps[] = json.blog;
export const jobsList: JobProps[] = json.jobs[0].jobs;
export const traineesList: TraineeProps[] = json.trainees;
export const projectsList: ProjectProps[] = json["job-projects"];
export const skillsList: SkillsProps[] = json.skills;
export const testimonialsList: TestimonialProps[] = json.testimonials;

export const contactsList = json.contacts;
export const educationsList = json.education;
