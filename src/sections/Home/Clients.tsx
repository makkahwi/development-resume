import { clientsList } from "@/lib/data";

const ClientsSection = async ({ t }: { t: Function }) => {
  return (
    <div className="row">
      {clientsList
        .filter(
          ({ prominent, image }) => prominent && image && image.length > 0,
        )
        .map(({ url, image, label }, index) => (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="col-3 col-md-2 mb-4 d-flex align-items-center justify-content-center"
          >
            <img
              src={process.env.NEXT_PUBLIC_STORAGE_URL + image + "?alt=media"}
              alt={label}
              className="img-fluid"
            />
          </a>
        ))}
    </div>
  );
};

export default ClientsSection;
