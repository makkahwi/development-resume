"use server";

import { revalidatePath } from "next/cache";

/**
 * Centralized revalidation helpers for when data changes.
 * Call these from Server Actions or API Route Handlers after mutations.
 */

/**
 * Revalidates paths that depend on jobs data
 * - Home page (statistics)
 * - Hands-on page (experiences/jobs list)
 */
export const revalidateJobsPaths = async () => {
  revalidatePath("/");
  revalidatePath("/[locale]");
  revalidatePath("/hands-on");
  revalidatePath("/[locale]/hands-on");
};

/**
 * Revalidates paths that depend on projects data
 * - Home page (statistics)
 * - Hands-off page (projects)
 */
export const revalidateProjectsPaths = async () => {
  revalidatePath("/");
  revalidatePath("/[locale]");
  revalidatePath("/hands-off");
  revalidatePath("/[locale]/hands-off");
};

/**
 * Revalidates paths that depend on clients data
 * - Home page (statistics, clients section)
 */
export const revalidateClientsPaths = async () => {
  revalidatePath("/");
  revalidatePath("/[locale]");
};

/**
 * Revalidates paths that depend on trainees data
 * - Home page (statistics)
 * - Non-profit page (mentoring section)
 */
export const revalidateTraineesPaths = async () => {
  revalidatePath("/");
  revalidatePath("/[locale]");
  revalidatePath("/non-profit");
  revalidatePath("/[locale]/non-profit");
};

/**
 * Revalidates paths that depend on skills data
 * - Multiple pages showing skills
 */
export const revalidateSkillsPaths = async () => {
  revalidatePath("/");
  revalidatePath("/[locale]");
  revalidatePath("/about");
  revalidatePath("/[locale]/about");
};

/**
 * Revalidates paths that depend on blog data
 * - Home page (latest blog)
 * - Blog listing and individual posts
 */
export const revalidateBlogPaths = async () => {
  revalidatePath("/");
  revalidatePath("/[locale]");
  revalidatePath("/blog");
  revalidatePath("/[locale]/blog");
};

/**
 * Revalidates paths that depend on testimonials data
 * - Home page (testimonials section)
 */
export const revalidateTestimonialsPaths = async () => {
  revalidatePath("/");
  revalidatePath("/[locale]");
};

/**
 * Revalidates all paths (use sparingly, e.g., for major data imports)
 */
export const revalidateAllPaths = async () => {
  revalidatePath("/", "layout");
};
