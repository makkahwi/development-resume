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
  categoryLabel,
}: SkillsProps & { short?: boolean; categoryLabel: string }) => {
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
      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="card h-100 border-0 shadow-sm">
          <div className="card-body text-center">
            <div className="mb-3">
              <i
                className={`${normalizedIcon} fa-2x`}
                style={{ color: `#${color}` }}
              />
            </div>

            <h4 className="h6 fw-bold mb-0">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark"
              >
                {label}
              </a>
            </h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 border-0 shadow-sm">
        <div className="card-body">
          <div className="text-center mb-3">
            <i
              className={`${normalizedIcon} fa-2x`}
              style={{ color: `#${color}` }}
            />
          </div>

          <h4 className="h6 fw-bold text-center mb-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark"
            >
              {label}
            </a>
          </h4>

          <div className="d-flex justify-content-center gap-1 mb-3">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <i
                  className={`fa-solid fa-star ${
                    i < rate ? "text-warning" : "text-muted opacity-25"
                  }`}
                  key={i}
                />
              ))}
          </div>

          {groups && groups.length > 0 && (
            <div className="mb-3">
              <p className="text-uppercase small fw-semibold text-secondary mb-2">
                {categoryLabel}
              </p>

              <div className="d-flex flex-wrap gap-2">
                {groups.map((group, index) => (
                  <span
                    key={index}
                    className="badge bg-primary bg-opacity-10 text-primary"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
          )}

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
