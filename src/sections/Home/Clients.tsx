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
          .filter((client) => client.prominent)
          .map((client, index) => (
            <a
              key={index}
              href={client.link}
              target="_blank"
              rel="noopener noreferrer"
              className="col-6 col-md-3 mb-4 d-flex align-items-center justify-content-center"
            >
              <img src={client.img} alt={client.name} className="img-fluid" />
            </a>
          ))}
      </div>
    </PageSection>
  );
};

export default ClientsSection;
