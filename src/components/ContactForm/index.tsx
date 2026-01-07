"use client";

import { contactsList } from "@/api/hardCodedData";
import { useTranslations } from "next-intl";
import { useState } from "react";
import PageSection from "../PageSection";

const ContactForm = () => {
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
      <div className="row">
        {contactsList.map(({ color, icon, label, link, name }, index) => (
          <div className="col-6 col-md-3" key={index}>
            <button
              type="button"
              className="btn w-100 corners py-3 mb-4"
              onClick={() => window.open(link, "_blank")}
              style={{ backgroundColor: color, color: "#ffffff" }}
            >
              <h5>
                <i className={`fa-solid ${icon}`} /> {label}
              </h5>
            </button>
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
                className="form-control border-0 corners mt-2"
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
                className="form-control border-0 corners mt-2"
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
          <button type="submit" className="btn btn-primary corners px-4">
            {t("Submit")}
          </button>
        </div>
      </form>
    </PageSection>
  );
};

export default ContactForm;
