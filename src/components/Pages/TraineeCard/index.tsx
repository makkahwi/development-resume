import { TestimonialProps, TraineeProps } from "@/types/data";
import Image from "next/image";

const TraineeCard = ({ name, image, url }: TraineeProps) => {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="card bg-light h-100 border-0 shadow-sm">
        <div className="card-body text-center p-4">
          {url && image && image.length > 0 && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="d-block mb-3"
            >
              <Image
                src={process.env.NEXT_PUBLIC_STORAGE_URL + image + "?alt=media"}
                alt={name}
                className="rounded-circle"
                width={150}
                height={150}
                style={{ objectFit: "cover" }}
              />
            </a>
          )}
          <h3 className="h5 fw-bold mb-0">{name}</h3>
        </div>
      </div>
    </div>
  );
};
export default TraineeCard;
