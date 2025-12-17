"use client";

import { motion } from "framer-motion";
import type { TimelineItemData } from "../types";
import { TechBadges } from "./TechBadges";

interface TimelineItemCardProps {
  item: TimelineItemData;
  align?: "left" | "right";
}

export const TimelineItemCard = ({ item, align = "left" }: TimelineItemCardProps) => {
  return (
    <motion.div
      className="bg-card rounded-xl border border-border/50 hover-lift transition-all duration-300 hover:border-primary/50"
      style={{ 
        background: "var(--gradient-card)",
        padding: "24px"
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-primary font-mono text-sm">{item.year}</span>
      <h3 className="text-xl font-semibold text-foreground mt-1">{item.title}</h3>
      {item.companyUrl ? (
        <a 
          href={item.companyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground text-sm mb-2 hover:text-primary transition-colors inline-block"
        >
          {item.company}
        </a>
      ) : (
        <p className="text-muted-foreground text-sm mb-2">{item.company}</p>
      )}
      {item.companyType && (
        <p className="text-muted-foreground text-sm mb-2">Type: {item.companyType}</p>
      )}
      <p className="text-muted-foreground text-sm">{item.description}</p>
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
