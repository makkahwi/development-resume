import { StatisticProps } from "@/types/data";

const StatisticCard = async ({
  count,
  label,
  description,
  short = false,
}: StatisticProps & { short?: boolean }) => {
  return (
    <div className="col-6 col-md-4 col-lg-2 mb-4 text-center">
      <h2 className="display-6">{count}</h2>
      <p>{label}</p>

      {!short && description && <p className="text-muted">{description}</p>}
    </div>
  );
};

export default StatisticCard;
