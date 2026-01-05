import PageSection from "@/components/PageSection";

export interface ClientProps {
  name: string;
  logo: string;
  url: string;
}

const ClientsSection = async ({ t }: { t: Function }) => {
  const clients: ClientProps[] = [
    {
      name: "Client A",
      logo: "client-a-logo.png",
      url: "https://client-a.com",
    },
  ];

  return (
    <PageSection
      title={t("clients.title")}
      subtitle={t("clients.subtitle")}
      id="clients"
    >
      <div className="row">
        {clients.map((client, index) => (
          <a
            key={index}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="col-6 col-md-3 mb-4 d-flex align-items-center justify-content-center"
          >
            <img src={client.logo} alt={client.name} className="img-fluid" />
          </a>
        ))}
      </div>
    </PageSection>
  );
};

export default ClientsSection;
