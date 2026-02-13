import { BlogPostView } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const BlogSidebarPostCard = ({
  title,
  slug,
  image,
  publishedAt,
  locale,
}: Pick<BlogPostView, "title" | "slug" | "image" | "publishedAt"> & {
  locale: string;
}) => {
  const formattedDate = new Date(publishedAt).toLocaleDateString(
    locale === "ar" ? "ar-EG" : "en-GB",
    { year: "numeric", month: "short", day: "numeric" },
  );

  return (
    <div className="blog-sidebar-post-card">
      {image && (
        <div className="blog-sidebar-post-image">
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image}?alt=media`}
            alt={title}
            width={100}
            height={80}
            className="img-fluid rounded"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
      )}
      <div className="blog-sidebar-post-content">
        <h6 className="blog-sidebar-post-title">
          <Link href={`/${locale}/blog/${slug}`}>{title}</Link>
        </h6>
        <p className="blog-sidebar-post-date">{formattedDate}</p>
      </div>
    </div>
  );
};

export default BlogSidebarPostCard;
