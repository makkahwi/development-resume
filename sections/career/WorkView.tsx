import CardComp from "@/components/Card";
import Typography from "@/components/typography";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WorkView = ({
  image = "",
  title = "",
  description = "",
  url = "",
  category = "",
}) => {
  return (
    <CardComp image={image}>
      <Typography size={4} justify="center" color="white">
        {title}
      </Typography>

      {/* <Typography size={6} className="my-3" color="white">
                  {category}
                </Typography> */}

      {/* <Typography size={6} className="my-3" color="white">
                  {roles}
                </Typography> */}

      <Typography size={6} className="my-3" color="white">
        {description}

        {url !== "" ? (
          <a href={url} target="_blank" className="mx-1">
            <FontAwesomeIcon icon={faLink} />
          </a>
        ) : (
          ""
        )}
      </Typography>
    </CardComp>
  );
};

export default WorkView;
