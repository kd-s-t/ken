"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { TimelineItemData } from "../types";
import { TimelineIcon } from "./TimelineIcon";
import { TimelineItemCard } from "./TimelineItemCard";

interface TimelineGroupItemProps {
  group: TimelineItemData[];
  groupIndex: number;
}

export const TimelineGroupItem = ({ group, groupIndex }: TimelineGroupItemProps) => {
  const groupRef = useRef(null);
  const isGroupInView = useInView(groupRef, { once: true, margin: "-100px" });
  
  const leftItem = group.find(item => item.company === "Urbanstems") || group[0];
  const rightItem = group.find(item => item.company === "Ancileo Pte. Ltd.") || group[1];
  
  return (
    <motion.div 
      ref={groupRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isGroupInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.3, delay: groupIndex * 0.05 }}
      className="relative"
    >
      <div className="flex items-center gap-4 md:gap-8 md:flex-row">
        <div className="flex-1 md:text-right">
          <TimelineItemCard item={leftItem} align="right" />
        </div>
        <motion.div 
          className="relative z-10 flex-shrink-0"
          initial={{ scale: 0 }}
          animate={isGroupInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.2, delay: groupIndex * 0.05 + 0.1 }}
        >
          <div className="w-12 h-12 rounded-full bg-primary timeline-icon-wrapper shadow-lg" style={{ boxShadow: "var(--glow-primary)" }}>
            <TimelineIcon 
              companyType={leftItem.companyType || rightItem.companyType} 
              isHackathon={leftItem.isHackathon || rightItem.isHackathon}
              type={leftItem.type}
            />
          </div>
        </motion.div>
        <div className="flex-1 md:text-left">
          <TimelineItemCard item={rightItem} align="left" />
        </div>
      </div>
    </motion.div>
  );
};
