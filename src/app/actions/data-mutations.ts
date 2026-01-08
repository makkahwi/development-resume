"use server";

import api from "@/lib/api";
import {
  revalidateClientsPaths,
  revalidateJobsPaths,
  revalidateProjectsPaths,
  revalidateTraineesPaths,
  revalidateSkillsPaths,
  revalidateBlogPaths,
  revalidateTestimonialsPaths,
} from "@/lib/revalidation";

/**
 * Server Actions for updating data collections
 * Each action updates the data and triggers revalidation of affected pages
 */

// ============================================
// JOBS
// ============================================

export async function createJob(jobData: any) {
  try {
    await api.post("/developer/jobs", jobData);
    await revalidateJobsPaths(); // Revalidates home + hands-on pages
    return { success: true };
  } catch (error) {
    console.error("Failed to create job:", error);
    return { success: false, error: "Failed to create job" };
  }
}

export async function updateJob(jobId: string, jobData: any) {
  try {
    await api.put(`/developer/jobs/${jobId}`, jobData);
    await revalidateJobsPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to update job:", error);
    return { success: false, error: "Failed to update job" };
  }
}

export async function deleteJob(jobId: string) {
  try {
    await api.delete(`/developer/jobs/${jobId}`);
    await revalidateJobsPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to delete job:", error);
    return { success: false, error: "Failed to delete job" };
  }
}

// ============================================
// CLIENTS
// ============================================

export async function createClient(clientData: any) {
  try {
    await api.post("/developer/clients", clientData);
    await revalidateClientsPaths(); // Revalidates home page
    return { success: true };
  } catch (error) {
    console.error("Failed to create client:", error);
    return { success: false, error: "Failed to create client" };
  }
}

export async function updateClient(clientId: string, clientData: any) {
  try {
    await api.put(`/developer/clients/${clientId}`, clientData);
    await revalidateClientsPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to update client:", error);
    return { success: false, error: "Failed to update client" };
  }
}

export async function deleteClient(clientId: string) {
  try {
    await api.delete(`/developer/clients/${clientId}`);
    await revalidateClientsPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to delete client:", error);
    return { success: false, error: "Failed to delete client" };
  }
}

// ============================================
// PROJECTS
// ============================================

export async function createProject(projectData: any) {
  try {
    await api.post("/developer/projects", projectData);
    await revalidateProjectsPaths(); // Revalidates home + hands-off pages
    return { success: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(projectId: string, projectData: any) {
  try {
    await api.put(`/developer/projects/${projectId}`, projectData);
    await revalidateProjectsPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(projectId: string) {
  try {
    await api.delete(`/developer/projects/${projectId}`);
    await revalidateProjectsPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}

// ============================================
// TRAINEES
// ============================================

export async function createTrainee(traineeData: any) {
  try {
    await api.post("/developer/trainees", traineeData);
    await revalidateTraineesPaths(); // Revalidates home + non-profit pages
    return { success: true };
  } catch (error) {
    console.error("Failed to create trainee:", error);
    return { success: false, error: "Failed to create trainee" };
  }
}

export async function updateTrainee(traineeId: string, traineeData: any) {
  try {
    await api.put(`/developer/trainees/${traineeId}`, traineeData);
    await revalidateTraineesPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to update trainee:", error);
    return { success: false, error: "Failed to update trainee" };
  }
}

export async function deleteTrainee(traineeId: string) {
  try {
    await api.delete(`/developer/trainees/${traineeId}`);
    await revalidateTraineesPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to delete trainee:", error);
    return { success: false, error: "Failed to delete trainee" };
  }
}

// ============================================
// SKILLS
// ============================================

export async function updateSkills(skillsData: any) {
  try {
    await api.put("/developer/skills", skillsData);
    await revalidateSkillsPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to update skills:", error);
    return { success: false, error: "Failed to update skills" };
  }
}

// ============================================
// BLOG
// ============================================

export async function createBlogPost(blogData: any) {
  try {
    await api.post("/developer/blog", blogData);
    await revalidateBlogPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return { success: false, error: "Failed to create blog post" };
  }
}

export async function updateBlogPost(slug: string, blogData: any) {
  try {
    await api.put(`/developer/blog/${slug}`, blogData);
    await revalidateBlogPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to update blog post:", error);
    return { success: false, error: "Failed to update blog post" };
  }
}

export async function deleteBlogPost(slug: string) {
  try {
    await api.delete(`/developer/blog/${slug}`);
    await revalidateBlogPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to delete blog post:", error);
    return { success: false, error: "Failed to delete blog post" };
  }
}

// ============================================
// TESTIMONIALS
// ============================================

export async function createTestimonial(testimonialData: any) {
  try {
    await api.post("/developer/testimonials", testimonialData);
    await revalidateTestimonialsPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return { success: false, error: "Failed to create testimonial" };
  }
}

export async function updateTestimonial(
  testimonialId: string,
  testimonialData: any
) {
  try {
    await api.put(`/developer/testimonials/${testimonialId}`, testimonialData);
    await revalidateTestimonialsPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    return { success: false, error: "Failed to update testimonial" };
  }
}

export async function deleteTestimonial(testimonialId: string) {
  try {
    await api.delete(`/developer/testimonials/${testimonialId}`);
    await revalidateTestimonialsPaths();
    return { success: true };
  } catch (error) {
    console.error("Failed to delete testimonial:", error);
    return { success: false, error: "Failed to delete testimonial" };
  }
}
