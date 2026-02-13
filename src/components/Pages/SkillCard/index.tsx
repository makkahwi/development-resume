import { SkillsProps } from "@/types/data";

const SkillCard = ({
  color,
  groups,
  icon,
  label,
  rate,
  subSkills,
  url,
  short = false,
}: SkillsProps & { short?: boolean }) => {
  const normalizedIcon = (() => {
    const value = icon?.replace("fa-brand", "fa-brands") || "";
    const tokens = value.split(" ").filter(Boolean);
    const hasValidToken = tokens.some(
      (token) => token.startsWith("fa-") && token.length > 4,
    );
    return hasValidToken ? value : "fa-solid fa-code";
  })();

  if (short) {
    return (
      <div className="col-4 col-sm-3 col-xl-1">
        <div className="d-flex align-items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            <i
              className={`${normalizedIcon} fa-lg`}
              style={{ color: `#${color}` }}
            />{" "}
            <span className="text-dark" style={{ fontSize: "0.75rem" }}>
              {label}
            </span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 border-0 p-3 shadow-sm">
        <div className="card-body px-0">
          <div className="row">
            <div className="col-6">
              <h4 className="h6 fw-bold mb-3">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-dark"
                >
                  <i
                    className={`${normalizedIcon} fa-2x`}
                    style={{ color: `#${color}` }}
                  />{" "}
                  <span className="align-center">{label}</span>
                </a>
              </h4>

              <div className="d-flex gap-1 mb-3">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <i
                      className={`fa-solid fa-star ${
                        i < rate ? "text-warning" : "text-muted opacity-25"
                      }`}
                      style={{ fontSize: "10px" }}
                      key={i}
                    />
                  ))}
              </div>
            </div>

            <div className="col-6">
              {groups && groups.length > 0 && (
                <div className="mb-3">
                  <div className="d-flex flex-wrap gap-2 justify-content-end">
                    {groups.map((group, index) => (
                      <span
                        key={index}
                        className="badge bg-primary bg-opacity-10 text-primary corners px-3"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {subSkills && subSkills.length > 0 && (
            <div>
              <small className="gap-2">{subSkills.join(", ")}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SkillCard;
