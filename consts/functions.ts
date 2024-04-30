import {
  faBriefcase,
  faCode,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";

export const iconsRendered = (icon = "") => {
  switch (icon) {
    case "faBriefcase":
      return faBriefcase;
    case "faCode":
      return faCode;
    case "faPaintBrush":
      return faPaintBrush;
    default:
      return faPaintBrush;
  }
};
