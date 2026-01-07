import { TestimonialProps } from "@/types/data";
import Image from "next/image";

const TestimonialCard = ({ author, content, img, link }: TestimonialProps) => {
  return (
    <div className="card">
      <div className="card-body text-center">
        <h2>{author}</h2>
        <p>{content}</p>

        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Image src={img} alt={author} width={400} height={400} />
          </a>
        )}
      </div>
    </div>
  );
};
export default TestimonialCard;
