import * as brands from "@fortawesome/free-brands-svg-icons";
import * as solid from "@fortawesome/free-solid-svg-icons";

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

export const iconMap: Record<string, any> = {
  ...solid,
  ...brands,
};
