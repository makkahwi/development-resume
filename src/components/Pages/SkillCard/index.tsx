import { SkillsProps } from "@/types/data";

const SkillCard = ({
  color,
  groups,
  icon,
  label,
  rate,
  subSkills,
  website,
  short = true,
}: SkillsProps & { short?: boolean }) => {
  return (
    <div className="card">
      <div className="card-body text-center">
        <h4>
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className={`fa-solid ${icon} me-1`} /> {label}
          </a>
        </h4>

        <h3>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <i
                className={`fa-solid fa-star text-${
                  rate >= i ? "muted" : "warning"
                }`}
                key={i}
              />
            ))}
        </h3>
      </div>
    </div>
  );
};
export default SkillCard;
