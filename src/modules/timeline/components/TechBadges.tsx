import type { TechBadgesProps } from "../types";

export const TechBadges = ({ fe, be, databases, devops, unitTest, misc, align }: TechBadgesProps) => {
  const rows = [
    { label: "fe", badges: fe || [] },
    { label: "be", badges: be || [] },
    { label: "databases", badges: databases || [] },
    { label: "devops", badges: devops || [] },
    { label: "unitTest", badges: unitTest || [] },
    { label: "misc", badges: misc || [] },
  ];
  
  const hasAnyBadges = rows.some(row => row.badges.length > 0);
  if (!hasAnyBadges) return null;
  
  return (
    <div className={`mt-4 space-y-2 ${align === "right" ? "text-right" : align === "left" ? "text-left" : ""}`}>
      {rows.map((row, rowIdx) => {
        if (row.badges.length === 0) return null;
        return (
          <div key={rowIdx} className={`flex flex-wrap gap-1.5 ${align === "right" ? "justify-end" : align === "left" ? "justify-start" : ""}`}>
            {row.badges.map((badge, idx) => (
              <img
                key={idx}
                src={badge}
                alt=""
                className="h-5"
                style={{ imageRendering: "auto" }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
