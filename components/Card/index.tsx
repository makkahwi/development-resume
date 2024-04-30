import Typography from "@/components/typography";
import { Card, CardBody, CardTitle } from "react-bootstrap";

interface props {
  title?: string | React.ReactNode;
  color?: string;
  onClick?: () => void;
  image?: string;
  children: React.ReactNode;
  className?: string;
}

const CardComp = ({
  title,
  color = "white",
  onClick,
  image,
  children,
  className,
}: props) => {
  return (
    <Card
      className={
        `bg-transparent text-white w-100 my-2 border-${color} border-${
          onClick ? 1 : 5
        } rounded-5 ` + className
      }
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {image && (
        <img
          alt="Sample"
          src={image}
          width="100%"
          className="rounded-5 rounded-bottom-0"
        />
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
