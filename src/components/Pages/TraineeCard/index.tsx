import { TestimonialProps, TraineeProps } from "@/types/data";
import Image from "next/image";

const TraineeCard = ({ name, image, url }: TraineeProps) => {
  return (
    <div className="card">
      <div className="card-body text-center">
        <h2>{name}</h2>

        {url && image && image.length > 0 && (
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Image
              src={process.env.NEXT_PUBLIC_STORAGE_URL + image}
              alt={name}
              width={400}
              height={400}
            />
          </a>
        )}
      </div>
    </div>
  );
};
export default TraineeCard;
