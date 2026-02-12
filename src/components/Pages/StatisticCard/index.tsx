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
        className={`card h-100 ${short ? "border-0 bg-transparent" : "bg-light border-0 corners"}`}
      >
        <div className={`card-body text-center ${short ? "p-2" : ""}`}>
          <h2
            className={`${short ? "h5 mb-0 fw-normal" : "display-6 fw-bold mb-2"} ${short ? "text-muted" : "text-primary"}`}
          >
            {count}
          </h2>
          <p
            className={`mb-0 ${short ? "text-secondary" : "small fw-semibold"}`}
            style={short ? { fontSize: "0.75rem" } : {}}
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
