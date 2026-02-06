import { BlogPostView } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const BlogPostCard = ({
  title,
  excerpt,
  publishedAt,
  tags,
  category,
  slug,
  image,
  locale,
  ctaLabel,
  short = true,
}: BlogPostView & { locale: string; ctaLabel: string; short?: boolean }) => {
  const formattedDate =
    locale === "ar"
      ? new Date(publishedAt).toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date(publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

  const formattedCategory = category
    ? category.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    : "";

  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 border-0 shadow-sm">
        {image && image.length > 0 && (
          <Image
            src={process.env.NEXT_PUBLIC_STORAGE_URL + image + "?alt=media"}
            alt={title}
            width={600}
            height={400}
            className="card-img-top"
            style={{ objectFit: "cover", height: "200px" }}
          />
        )}

        <div className="card-body d-flex flex-column">
          <p className="text-muted small mb-2">
            {formattedDate}
            {formattedCategory ? ` • ${formattedCategory}` : ""}
          </p>

          <h3 className="h5 fw-bold mb-3">{title}</h3>

          <p className="text-muted mb-3 flex-grow-1">
            {short && excerpt.length > 180
              ? `${excerpt.slice(0, 180)}...`
              : excerpt}
          </p>

          {tags?.length ? (
            <div className="d-flex flex-wrap gap-2 mb-3">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="badge bg-primary bg-opacity-10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <Link
            href={`/${locale}/blog/${slug}`}
            className="btn btn-primary btn-sm w-100 mt-auto px-4 border-0 corners"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BlogPostCard;
