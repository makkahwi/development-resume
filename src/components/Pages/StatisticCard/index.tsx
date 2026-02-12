import { StatisticProps } from "@/types/data";

const StatisticCard = async ({
  count,
  label,
  description,
  short = false,
}: StatisticProps & { short?: boolean }) => {
  return (
    <div className="col-6 col-md-4 col-lg-2">
      <div
        className={`card h-100 border-0 ${short ? "bg-white corners" : "bg-light"}`}
      >
        <div className={`card-body text-center ${short ? "p-3" : ""}`}>
          <h2
            className={`${short ? "h4 mb-1 fw-semibold" : "display-6 fw-bold mb-2"} text-primary`}
          >
            {count}
          </h2>
          <p
            className={`mb-0 ${short ? "text-primary" : "small fw-semibold"}`}
            style={short ? { fontSize: "0.8rem" } : {}}
          >
            {label}
          </p>
          {!short && description && (
            <p className="text-muted small mt-2 mb-0">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
