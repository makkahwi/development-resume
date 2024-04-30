"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const LandingPopUp = () => {
  const [open, setOpen] = useState(true);

  return open ? (
    <div
      className="alert alert-info position-fixed bottom-0 mb-5 mx-5"
      role="alert"
      style={{ zIndex: 9999 }}
    >
      This is still under development, so the best is yet to come
      <FontAwesomeIcon
        icon={faClose}
        onClick={() => setOpen(false)}
        className="mx-2"
        role="button"
      />
    </div>
  ) : (
    ""
  );
};

export default LandingPopUp;
