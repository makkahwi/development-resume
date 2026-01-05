import Image from "next/image";

export interface TestimonialProps {
  name: string;
  content: string;
  image: string;
  url?: string;
}

const TestimonialCard = ({ name, content, image, url }: TestimonialProps) => {
  return (
    <div className="card">
      <div className="card-body text-center">
        <h2>{name}</h2>
        <p>{content}</p>

        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Image src={image} alt={name} width={400} height={400} />
          </a>
        )}
      </div>
    </div>
  );
};
export default TestimonialCard;
