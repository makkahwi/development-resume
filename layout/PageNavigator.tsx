import { faMobile, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

export default async function PageNavigator({
  sections = [{ id: "contact", label: "Contact", icon: faPhone }],
}) {
  return (
    <Fragment>
      <div className="position-fixed top-50 start-0 translate-middle-y d-flex flex-column z-3">
        {[...sections, { id: "contact", label: "Contact", icon: faMobile }].map(
          ({ id, label, icon }, index) => (
            <a
              key={index}
              href={`#${id}`}
              className="btn btn-dark ms-4 corners border-0 btn-sm p-2 my-2 text-decoration-none"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title={label}
            >
              <FontAwesomeIcon icon={icon} />
            </a>
          )
        )}
      </div>
    </Fragment>
  );
}
