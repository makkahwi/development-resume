import { contactsList } from "@/api/hardCodedData";
import ContactForm from "@/components/ContactForm";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Layout.Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-5 pt-4 border-top bg-transparent">
      <ContactForm />

      <div className="container text-center">
        <hr className="px-5 mx-5" />

        <img src="/images/LogoC.png" width={200} className="mt-5" alt="Logo" />

        <h2 className="text-dark my-3 text-uppercase">{t("Title")}</h2>

        <p className="text-muted mt-5 mb-2">
          {t("AllRightsReserved")} © 2018 - {year}
        </p>

        <div className="d-flex justify-content-center gap-3 my-3">
          {contactsList.map(({ color, icon, label, link, name }, i) => (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              style={{ color }}
              key={i}
            >
              <i className={`fa-solid ${icon}`} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
