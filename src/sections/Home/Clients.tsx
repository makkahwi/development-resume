import PageSection from "@/components/PageSection";
import { clientsList } from "@/lib/data";
import Image from "next/image";

const ClientsSection = async (): Promise<React.ReactNode> => {
  return (
    <PageSection id="clients" noPadding>
      <div className="row g-1 g-lg-3 g-xl-1 justify-content-center align-items-center">
        {clientsList
          .filter(
            ({ prominent, image }) => prominent && image && image.length > 0,
          )
          .map(({ url, image, label }, index) => (
            <div key={index} className="col-3 col-md-2 col-xl-1">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center justify-content-center px-3 client-logo-link"
                style={{ minHeight: "100px" }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image}?alt=media`}
                  alt={label}
                  width={100}
                  height={100}
                  className="img-fluid client-logo"
                  style={{ maxHeight: "80px", width: "auto" }}
                />
              </a>
            </div>
          ))}
      </div>
    </PageSection>
  );
};

export default ClientsSection;
