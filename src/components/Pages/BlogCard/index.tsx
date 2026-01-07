import { BlogProps } from "@/types/data";
import Image from "next/image";

const BlogPostCard = ({
  category,
  date,
  id,
  tags,
  versions,
  image,
  short = true,
}: BlogProps & { short?: boolean }) => {
  return (
    <div className="card">
      <div className="card-body text-center">
        {image && image.length > 0 && (
          <Image
            src={process.env.NEXT_PUBLIC_STORAGE_URL + image}
            alt={id}
            width={400}
            height={400}
          />
        )}

        <h2>{versions.en.title}</h2>

        <p>
          {short
            ? `${versions.en.short[0].text?.slice(0, 70)}...`
            : versions.en.long.join("")}
        </p>
      </div>
    </div>
  );
};
export default BlogPostCard;
