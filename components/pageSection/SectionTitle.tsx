import Typography from "@/components/typography";
import { Fragment } from "react";

const SectionTitle = ({ title = "", subtitle = "", color = "" }) => {
  const textColor = () => {
    switch (color) {
      case "primary":
        return "dark";
      case "secondary":
        return "white";
      case "warning":
        return "white";
      case "light":
        return "warning";
      default:
        return "warning";
    }
  };

  return (
    <Fragment>
      <Typography size={6} justify="center" color={textColor()}>
        {subtitle}
      </Typography>

      <Typography
        size={2}
        justify="center"
        className="py-3 mb-5"
        color={textColor()}
      >
        {title}
      </Typography>
    </Fragment>
  );
};

export default SectionTitle;