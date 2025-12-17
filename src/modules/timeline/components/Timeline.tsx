"use client";

import { motion, useInView } from "framer-motion";
import { Flag, Rocket } from "lucide-react";
import { useRef } from "react";

import { timelineData } from "../constants";
import { useTimelineGrouping } from "../hooks";
import type { TimelineItemProps } from "../types";
import { TimelineGroupItem } from "./TimelineGroupItem";
import { TimelineHeader } from "./TimelineHeader";
import { TimelineIcon } from "./TimelineIcon";
import { TimelineItemCard } from "./TimelineItemCard";

const TimelineItem = ({ year, title, company, description, type, index, companyUrl, companyType, isHackathon, fe, be, databases, devops, unitTest, misc }: TimelineItemProps) => {
  const isLeft = index % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex items-center gap-4 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
        <TimelineItemCard 
          item={{ year, title, company, description, type, companyUrl, companyType, isHackathon, fe, be, databases, devops, unitTest, misc }}
          align={isLeft ? "right" : "left"}
        />
      </div>

      <motion.div 
        className="relative z-10 flex-shrink-0"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.2, delay: index * 0.05 + 0.1 }}
      >
        <div className="w-12 h-12 rounded-full bg-primary timeline-icon-wrapper shadow-lg" style={{ boxShadow: "var(--glow-primary)" }}>
          <TimelineIcon companyType={companyType} isHackathon={isHackathon} type={type} />
        </div>
      </motion.div>

      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

const Timeline = () => {
  const groupedData = useTimelineGrouping(timelineData);

  return (
    <section id="timeline" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <TimelineHeader />

        <div className="max-w-6xl mx-auto relative pb-6">
          <div className="absolute left-1/2 top-0 w-0.5 bg-border -translate-x-1/2" style={{ height: 'calc(100% + 24px)' }} />
          
          <motion.div 
            className="absolute left-[48%] -top-8 -translate-x-1/2 z-10"
            initial={{ opacity: 0, scale: 0, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-12 rounded-full bg-primary timeline-icon-wrapper shadow-lg" style={{ boxShadow: "var(--glow-primary)" }}>
              <Rocket className="w-5 h-5 text-primary-foreground" />
            </div>
          </motion.div>

          <motion.div 
            className="absolute left-[48%] z-10"
            style={{ 
              bottom: '-24px',
              transform: 'translateX(calc(-50% - 5px))'
            }}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-12 h-12 rounded-full bg-primary timeline-icon-wrapper shadow-lg" style={{ boxShadow: "var(--glow-primary)" }}>
              <Flag className="w-5 h-5 text-primary-foreground" />
            </div>
          </motion.div>

          <div className="space-y-8 md:space-y-12 pt-12 pb-12">
            {groupedData.map((group, groupIndex) => {
              if (group.length > 1) {
                return <TimelineGroupItem key={groupIndex} group={group} groupIndex={groupIndex} />;
              } else {
                const globalIndex = timelineData.indexOf(group[0]);
                return <TimelineItem key={globalIndex} {...group[0]} index={globalIndex} />;
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
