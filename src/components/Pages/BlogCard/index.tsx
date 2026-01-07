import { BlogProps } from "@/types/data";
import Image from "next/image";

const BlogPostCard = ({
  title,
  content,
  image,
  short = true,
}: BlogProps & { short?: boolean }) => {
  return (
    <div className="card">
      <div className="card-body text-center">
        <Image src={image} alt={title} width={400} height={400} />

        <h2>{title}</h2>

        <p>{short ? `${content.slice(0, 70)}...` : content}</p>
      </div>
    </div>
  );
};
export default BlogPostCard;
