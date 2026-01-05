import Image from "next/image";

export interface SkillsProps {
  title: string;
  level: number;
  icon: string;
  groups: string[];
  url?: string;
}

const SkillCard = ({
  title,
  level,
  icon,
  groups,
  url,
  short = true,
}: SkillsProps & { short?: boolean }) => {
  return (
    <div className="card">
      <div className="card-body text-center">
        <h4>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <i className={`bi ${icon} me-1`} /> {title}
          </a>
        </h4>

        <h3>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <i
                className={`bi star text-${level >= i ? "muted" : "warning"}`}
                key={i}
              />
            ))}
        </h3>
      </div>
    </div>
  );
};
export default SkillCard;
