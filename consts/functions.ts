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

export const colsCount = (cols = 0) => {
  switch (cols) {
    case 1:
      return 12;
    case 2:
      return 6;
    default:
      return 4;
  }
};
