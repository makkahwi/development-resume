import { SkillsProps } from "@/types/data";
import Image from "next/image";

const SkillCard = ({
  color,
  groups,
  icon,
  name,
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
            <i className={`bi ${icon} me-1`} /> {name}
          </a>
        </h4>

        <h3>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <i
                className={`bi star text-${rate >= i ? "muted" : "warning"}`}
                key={i}
              />
            ))}
        </h3>
      </div>
    </div>
  );
};
export default SkillCard;
