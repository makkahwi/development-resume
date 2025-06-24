"use client";

import Typography from "@/components/typography";
import {
  faChevronDown,
  faChevronUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useRef, useState, useEffect } from "react";

interface Props {
  description: string[];
}

const ExperienceDetailsCollapse = ({ description }: Props) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (open) {
        contentRef.current.style.maxHeight =
          contentRef.current.scrollHeight + "px";
      } else {
        contentRef.current.style.maxHeight = "0px";
      }
    }
  }, [open]);

  return (
    <Fragment>
      <span
        role="button"
        onClick={() => setOpen(!open)}
        className="cursor-pointer user-select-none"
      >
        <Typography size={6} color="info">
          <FontAwesomeIcon icon={faInfoCircle} /> Details{" "}
          <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
        </Typography>
      </span>

      <ul
        ref={contentRef}
        className="transition-collapse overflow-hidden mt-2"
        style={{
          maxHeight: "0px",
          transition: "max-height 0.4s ease",
        }}
      >
        {description.map((point, j) => (
          <li key={j}>
            <Typography size="sm" color="info">
              {point}
            </Typography>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default ExperienceDetailsCollapse;
