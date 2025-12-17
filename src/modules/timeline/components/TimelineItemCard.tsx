"use client";

import { motion } from "framer-motion";
import type { TimelineItemData } from "../types";
import { TechBadges } from "./TechBadges";

interface TimelineItemCardProps {
  item: TimelineItemData;
  align?: "left" | "right";
}

export const TimelineItemCard = ({ item, align = "left" }: TimelineItemCardProps) => {
  const isSplitSafe = item.title === "SplitSafe";
  
  return (
    <motion.div
      className={`rounded-xl border hover-lift transition-all duration-300 hover:border-primary/50 ${
        isSplitSafe ? "border-[#303434]" : "border-border/50"
      }`}
      style={{ 
        background: isSplitSafe ? "#0D0D0D" : "var(--gradient-card)",
        padding: "24px"
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <span className={`font-mono text-sm ${isSplitSafe ? "text-[#FEB64D]" : "text-primary"}`}>{item.year}</span>
      <h3 className={`text-xl font-semibold mt-1 ${isSplitSafe ? "text-white" : "text-foreground"}`}>{item.title}</h3>
      {item.companyUrl ? (
        <a 
          href={item.companyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`text-sm mb-2 hover:text-primary transition-colors inline-block ${
            isSplitSafe ? "text-[#BCBCBC] hover:text-[#FEB64D]" : "text-muted-foreground"
          }`}
        >
          {item.company}
        </a>
      ) : (
        <p className={`text-sm mb-2 ${isSplitSafe ? "text-[#BCBCBC]" : "text-muted-foreground"}`}>{item.company}</p>
      )}
      {item.companyType && (
        <p className={`text-sm mb-2 ${isSplitSafe ? "text-[#BCBCBC]" : "text-muted-foreground"}`}>Type: {item.companyType}</p>
      )}
      <p className={`text-sm ${isSplitSafe ? "text-[#BCBCBC]" : "text-muted-foreground"}`}>{item.description}</p>
      <TechBadges 
        fe={item.fe} 
        be={item.be} 
        databases={item.databases} 
        devops={item.devops} 
        unitTest={item.unitTest} 
        misc={item.misc} 
        align={align} 
      />
    </motion.div>
  );
};
