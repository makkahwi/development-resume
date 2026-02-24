"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import PageSection from "../PageSection";
import { normalizeFaIcon } from "@/lib/icons";
import { ContactProps } from "@/types/data";

const ContactForm = ({ contactsList }: { contactsList: ContactProps[] }) => {
  const t = useTranslations("ContactForm");

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    message: "",
  });

  const inputs = [
    {
      label: t("Name"),
      type: "text",
      name: "name",
      required: true,
    },
    {
      label: t("Organization"),
      type: "text",
      name: "organization",
    },
    {
      label: t("Email"),
      type: "email",
      name: "email",
      required: true,
    },
    { label: t("Phone"), type: "tel", name: "phone" },
    {
      label: t("Message"),
      type: "textarea",
      name: "message",
      fullWidth: true,
      required: true,
    },
  ];

  return (
    <PageSection
      subtitle={t("Subtitle")}
      title={t("Title")}
      color="light"
      id="contact"
      card
    >
      <div className="bg-white rounded p-4 mb-5">
        <div className="row align-items-center">
          <div className="col-md-8 mb-3 mb-md-0">
            <h3 className="h6 mb-1">
              <i className="fa-solid fa-calendar-check text-primary me-2" />
              {t("Discovery.Title")}
            </h3>
            <p className="text-muted small mb-0">{t("Discovery.Subtitle")}</p>
          </div>
          <div className="col-md-4 text-md-end">
            <a
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ11WXpxIUv7ZmQSrHHpc5EhskFJ6_ROebTBChnDRYsMHfimOX40-KTTadUm2qH4DtYyO1957aIj"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary px-4 border-0 corners"
            >
              {t("Discovery.Cta")}
            </a>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-5">
        {contactsList.map(({ color, icon, label, url }, index) => (
          <div className="col-6 col-md-3" key={index}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-primary w-100 border-0 corners py-3 text-white text-decoration-none"
              style={{ backgroundColor: color }}
            >
              <i className={normalizeFaIcon(icon)} /> {label}
            </a>
          </div>
        ))}
      </div>

      <form className="row mt-5">
        {inputs.map(({ label, type, name, required, fullWidth }) => (
          <div
            key={name}
            className={`col-12 ${fullWidth ? "col-md-12" : "col-md-3"} mb-4`}
          >
            <label htmlFor={name} className="form-label">
              {label} {required && <span className="text-danger">*</span>}
            </label>

            {type === "textarea" ? (
              <textarea
                className="form-control border-0 px-4 shadow-sm"
                name={name}
                value={formData[name as keyof typeof formData]}
                required={required}
                onChange={(e) =>
                  setFormData({ ...formData, [name]: e.target.value })
                }
              />
            ) : (
              <input
                type={type}
                className="form-control border-0 px-4 shadow-sm"
                name={name}
                value={formData[name as keyof typeof formData]}
                required={required}
                onChange={(e) =>
                  setFormData({ ...formData, [name]: e.target.value })
                }
              />
            )}
          </div>
        ))}

        <div className="col-12 text-start mt-4">
          <button
            type="submit"
            className="btn btn-primary px-4 border-0 corners"
          >
            {t("Submit")}
          </button>
        </div>
      </form>
    </PageSection>
  );
};

export default ContactForm;
