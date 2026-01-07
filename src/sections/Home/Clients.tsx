import { clientsList } from "@/api/hardCodedData";
import PageSection from "@/components/PageSection";

const ClientsSection = async ({ t }: { t: Function }) => {
  return (
    <PageSection
      title={t("clients.title")}
      subtitle={t("clients.subtitle")}
      id="clients"
    >
      <div className="row">
        {clientsList
          .filter(({ prominent }) => prominent)
          .map(({ link, img, name }, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="col-6 col-md-3 mb-4 d-flex align-items-center justify-content-center"
            >
              <img src={img} alt={name} className="img-fluid" />
            </a>
          ))}
      </div>
    </PageSection>
  );
};

export default ClientsSection;
