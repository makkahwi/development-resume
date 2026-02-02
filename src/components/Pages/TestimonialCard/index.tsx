import { TestimonialProps } from "@/types/data";
import Image from "next/image";

const TestimonialCard = ({ author, content, image, url }: TestimonialProps) => {
  return (
    <div className="card h-100 border-0 shadow-sm testimonial-card">
      <div className="card-body d-flex flex-column">
        <div className="mb-4">
          <svg
            className="text-primary mb-3"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.5-3-7-3s-7 1.75-7 3v7c0 7 4 8 7 8z" />
          </svg>
          <p className="card-text lead mb-0">{content}</p>
        </div>

        <div className="mt-auto">
          <div className="d-flex align-items-center">
            {url && image && image.length > 0 && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 testimonial-image-link"
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_STORAGE_URL + image + "?alt=media"
                  }
                  alt={author}
                  width={56}
                  height={56}
                  className="rounded-circle"
                  style={{ objectFit: "cover" }}
                />
              </a>
            )}
            <div>
              <h6 className="card-title mb-0 fw-bold">{author}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TestimonialCard;
