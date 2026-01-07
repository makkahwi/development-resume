import { TestimonialProps } from "@/types/data";
import Image from "next/image";

const TestimonialCard = ({ author, content, image, url }: TestimonialProps) => {
  return (
    <div className="card">
      <div className="card-body text-center">
        <h2>{author}</h2>
        <p>{content}</p>

        {url && image && image.length > 0 && (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Image
              src={process.env.NEXT_PUBLIC_STORAGE_URL + image}
              alt={author}
              width={400}
              height={400}
            />
          </a>
        )}
      </div>
    </div>
  );
};
export default TestimonialCard;
