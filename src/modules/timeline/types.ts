export interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education";
  index: number;
  companyUrl?: string;
  companyType?: string;
  isHackathon?: boolean;
  fe?: string[];
  be?: string[];
  databases?: string[];
  devops?: string[];
  unitTest?: string[];
  misc?: string[];
}

export interface TechBadgesProps {
  fe?: string[];
  be?: string[];
  databases?: string[];
  devops?: string[];
  unitTest?: string[];
  misc?: string[];
  align?: "left" | "right";
}

export type TimelineItemData = Omit<TimelineItemProps, "index">;
