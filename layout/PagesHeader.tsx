import Typography from "@/components/typography";

interface props {
  title: string;
}

const PagesHeader = ({ title }: props) => {
  const Content = () => (
    <div
      style={{
        // background:
        //   "linear-gradient(0deg, rgba(23, 162, 184, 0.5), rgba(23, 162, 184, 0.5)), url(/images/bg.jpg)",
        // backgroundSize: "cover",
        // backgroundPosition: "center center",
        padding: "12.5vh 10vw",
        // margin: 0,
        // width: "100%",
      }}
      className="bg-info"
    >
      <Typography
        size={1}
        justify="center"
        className="py-3 px-0 m-0"
        color="white"
      >
        {title}
      </Typography>
    </div>
  );

  return <Content />;
};

export default PagesHeader;
