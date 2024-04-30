interface props {
  size?: string | number;
  color?: string;
  justify?: string;
  className?: string;
  style?: object;
  children: React.ReactNode;
}

const Typography = ({
  size,
  color = "dark",
  justify = "justify",
  className,
  children,
  ...rest
}: props) => {
  const classes = `text-${color} text-${justify} ${className}`;

  switch (String(size)) {
    case "1":
      return (
        <h1 className={classes} {...rest}>
          {children}
        </h1>
      );
    case "2":
      return (
        <h2 className={classes} {...rest}>
          {children}
        </h2>
      );
    case "3":
      return (
        <h3 className={classes} {...rest}>
          {children}
        </h3>
      );
    case "4":
      return (
        <h4 className={classes} {...rest}>
          {children}
        </h4>
      );
    case "5":
      return (
        <h5 className={classes} {...rest}>
          {children}
        </h5>
      );
    case "6":
      return (
        <h6 className={classes} {...rest}>
          {children}
        </h6>
      );
    case "sm":
      return (
        <small className={classes} {...rest}>
          {children}
        </small>
      );
    default:
      return (
        <p className={classes} {...rest}>
          {children}
        </p>
      );
  }
};

export default Typography;
