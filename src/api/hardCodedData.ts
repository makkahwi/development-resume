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

export const clientsList: ClientProps[] = json.clients;
export const blogPosts: BlogProps[] = json.blog;
export const jobsList: JobProps[] = json.jobs[0].jobs;
export const traineesList: TraineeProps[] = json.trainees;
export const projectsList: ProjectProps[] = json.jobProjects;
export const skillsList: SkillsProps[] = json.skills;
export const testimonialsList: TestimonialProps[] = json.testimonials;

export const contactsList: ContactProps[] = json.contacts;
export const educationsList: EducationProps[] = json.education;

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
