import { clientsList } from "@/api/hardCodedData";
import PageSection from "@/components/PageSection";

const ClientsSection = async ({ t }: { t: Function }) => {
  return (
    <PageSection
      title={t("Clients.Title")}
      subtitle={t("Clients.Subtitle")}
      id="clients"
    >
      <div className="row">
        {clientsList
          .filter(
            ({ prominent, image }) => prominent && image && image.length > 0
          )
          .map(({ url, image, label }, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="col-6 col-md-3 mb-4 d-flex align-items-center justify-content-center"
            >
              <img
                src={process.env.NEXT_PUBLIC_STORAGE_URL + image}
                alt={label}
                className="img-fluid"
              />
            </a>
          ))}
      </div>
    </PageSection>
  );
};

export default ClientsSection;
