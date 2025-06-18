import Typography from "@/components/typography";
import { Card, CardBody, CardTitle } from "react-bootstrap";

interface props {
  title?: string | React.ReactNode;
  color?: string;
  onClick?: () => void;
  image?: string;
  children: React.ReactNode;
  className?: string;
  tag?: string | React.ReactNode;
}

const CardComp = ({
  title,
  color = "white",
  onClick,
  image,
  children,
  className,
  tag,
}: props) => {
  return (
    <Card
      className={
        `bg-transparent text-white w-100 my-2 rounded-0 border-${color} border-${
          onClick ? 1 : 2
        } ` + className
      }
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {image && <img alt="Sample" src={image} width="100%" />}

      {tag && (
        <Typography
          size="sm"
          justify="center"
          className="m-2 position-absolute top-0 end-0 p-1 bg-dark text-white font"
        >
          {tag}
        </Typography>
      )}

      {title && (
        <CardTitle>
          <Typography size={3} justify="center" className="my-4" color={color}>
            {title}
          </Typography>
        </CardTitle>
      )}

      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default CardComp;
