import { StatisticProps } from "@/types/data";

const StatisticCard = async ({
  count,
  label,
  description,
  short = false,
}: StatisticProps & { short?: boolean }) => {
  return (
    <div className="col-6 col-md-4 col-lg-2">
      <div className={`card bg-light h-100 border-0 ${short ? "corners" : ""}`}>
        <div className="card-body text-center">
          <h2 className="display-6 text-primary fw-bold mb-2">{count}</h2>
          <p className="small fw-semibold mb-0">{label}</p>
          {!short && description && (
            <p className="text-muted small mt-2 mb-0">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
