import {
  getClientsList,
  getEducationsList,
  getJobsList,
  getProjectsList,
  getSkillsList,
  getTestimonialsList,
  getTraineesList,
} from "@/lib/data";

export type KnowledgeChunk = {
  id: string;
  section: string;
  content: string;
  private: boolean;
};

const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
};

export const retrieveRelevantChunks = (
  query: string,
  chunks: KnowledgeChunk[],
): KnowledgeChunk[] => {
  const tokens = tokenize(query);

  const scored = chunks.map((chunk) => {
    const haystack = tokenize(`${chunk.section} ${chunk.content}`);
    let score = 0;

    tokens.forEach((token) => {
      if (haystack.includes(token)) {
        score += 3;
      }

      if (haystack.some((item) => item.includes(token) || token.includes(item))) {
        score += 1;
      }

      if (chunk.section.toLowerCase().includes(token)) {
        score += 1;
      }
    });

    return { chunk, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .filter((entry) => entry.score > 0)
    .slice(0, 6)
    .map((entry) => entry.chunk);
};

export const buildKnowledgeChunks = async (): Promise<KnowledgeChunk[]> => {
  const [
    jobsList,
    projectsList,
    skillsList,
    educationsList,
    clientsList,
    testimonialsList,
    traineesList,
  ] = await Promise.all([
    getJobsList(),
    getProjectsList(),
    getSkillsList(),
    getEducationsList(),
    getClientsList(),
    getTestimonialsList(),
    getTraineesList(),
  ]);

  const chunks: KnowledgeChunk[] = [];

  jobsList.forEach((job, index) => {
    const highlights = (job.description || []).join(" | ");
    chunks.push({
      id: `job-${index}`,
      section: `Experience: ${job.company}`,
      private: false,
      content: `${job.title} at ${job.company}. Type: ${job.type}. Location: ${job.location ?? "n/a"}. Start: ${job.start}. End: ${job.end}. Projects: ${job.projectsCount ?? "n/a"}. Highlights: ${highlights}. URL: ${job.url ?? "n/a"}`,
    });
  });

  projectsList.forEach((project, index) => {
    chunks.push({
      id: `project-${index}`,
      section: `Project: ${project.title}`,
      private: false,
      content: `${project.description}. Role: ${project.role ?? "n/a"}. Category: ${project.category}. Technologies: ${(project.technologies || []).join(", ") || "n/a"}. Consulting: ${project.consultation ? "yes" : "no"}. Open source: ${project.openSource ? "yes" : "no"}. URL: ${project.url ?? "n/a"}`,
    });
  });

  skillsList.forEach((skill, index) => {
    chunks.push({
      id: `skill-${index}`,
      section: `Skills: ${skill.label}`,
      private: false,
      content: `${skill.label}. Groups: ${skill.groups.join(", ")}. Sub-skills: ${(skill.subSkills || []).join(", ") || "n/a"}. Proficiency rate: ${skill.rate}/100.`,
    });
  });

  educationsList.forEach((edu, index) => {
    chunks.push({
      id: `education-${index}`,
      section: `Education: ${edu.school}`,
      private: false,
      content: `${edu.label}. ${edu.description}.`,
    });
  });

  clientsList.forEach((client, index) => {
    chunks.push({
      id: `client-${index}`,
      section: `Client: ${client.label}`,
      private: false,
      content: `${client.label}. Prominent: ${client.prominent ? "yes" : "no"}. URL: ${client.url}.`,
    });
  });

  testimonialsList.forEach((testimonial, index) => {
    chunks.push({
      id: `testimonial-${index}`,
      section: `Testimonial: ${testimonial.author}`,
      private: false,
      content: `${testimonial.author}: ${testimonial.content}. Featured: ${testimonial.featured ? "yes" : "no"}. URL: ${testimonial.url}.`,
    });
  });

  traineesList.forEach((trainee, index) => {
    chunks.push({
      id: `trainee-${index}`,
      section: `Trainee: ${trainee.name}`,
      private: false,
      content: `${trainee.name}. Featured: ${trainee.featured ? "yes" : "no"}. URL: ${trainee.url}.`,
    });
  });

  return chunks;
};
