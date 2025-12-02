import { api, isApiConfigured } from "./api";

export interface HomeSnapshots {
  aboutSummary: string;
  handsOnHighlight: string;
  handsOffHighlight: string;
  nonprofitHighlight: string;
  latestBlogTitle: string | null;
}

export const getHomeSnapshots = async (): Promise<HomeSnapshots> => {
  if (!isApiConfigured()) {
    return {
      aboutSummary:
        "Senior full-stack developer and technical advisor with experience in SaaS, EdTech, and ERP.",
      handsOnHighlight:
        "Architected and delivered multiple production-grade systems using React & NestJS.",
      handsOffHighlight:
        "Led and mentored teams, established coding standards, and reviewed complex features.",
      nonprofitHighlight:
        "Built free-of-charge tools and provided training/coaching for new developers.",
      latestBlogTitle: null,
    };
  }

  const response = await api.get<HomeSnapshots>("/public/home-snapshots");
  return response.data;
};

export interface BlogPost {
  slug: string;
  locale: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  publishedAt: string;
  tags: string[];
}

export const getBlogPost = async (
  locale: string,
  slug: string
): Promise<BlogPost | null> => {
  if (!isApiConfigured()) {
    if (slug !== "sample-post") return null;

    return {
      slug,
      locale,
      title:
        locale === "ar"
          ? "مقال تجريبي حول تجربة تطوير الويب"
          : "Sample Blog Post about Web Development",
      excerpt:
        locale === "ar"
          ? "هذا نص تجريبي يوضح شكل صفحة المقال في الموقع الجديد."
          : "This is a sample excerpt to show how a blog post page will look.",
      contentHtml:
        locale === "ar"
          ? "<p>هذا المحتوى تجريبي فقط. سيتم استبداله لاحقًا ببيانات حقيقية قادمة من الـ API.</p>"
          : "<p>This is only sample content. It will later be replaced by real data coming from your API.</p>",
      publishedAt: new Date().toISOString(),
      tags: ["sample", "draft"],
    };
  }

  const response = await api.get<BlogPost>(
    `/public/blog-posts/${encodeURIComponent(slug)}`,
    {
      params: { locale },
    }
  );

  return response.data ?? null;
};
