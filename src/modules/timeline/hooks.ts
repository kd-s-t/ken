import { useMemo } from "react";
import type { TimelineItemData } from "./types";

interface YearRange {
  start: number;
  end: number;
}

const extractYearRange = (yearString: string): YearRange | null => {
  const yearRegex = /(\d{4})/g;
  const matches = yearString.match(yearRegex);
  if (matches && matches.length > 0) {
    const startYear = parseInt(matches[0]);
    const endYear = matches.length > 1 ? parseInt(matches[1]) : startYear;
    return { start: startYear, end: endYear };
  }
  return null;
};

const hasOverlap = (year1: string, year2: string): boolean => {
  const range1 = extractYearRange(year1);
  const range2 = extractYearRange(year2);
  
  if (!range1 || !range2) return false;
  
  const overlapStart = Math.max(range1.start, range2.start);
  const overlapEnd = Math.min(range1.end, range2.end);
  
  const hasActualOverlap = overlapStart < overlapEnd;
  
  if (!hasActualOverlap) return false;
  
  const overlapDuration = overlapEnd - overlapStart;
  
  return overlapDuration >= 1;
};

export const useTimelineGrouping = (timelineData: TimelineItemData[]) => {
  return useMemo(() => {
    const groupedData: TimelineItemData[][] = [];
    const processed = new Set<number>();

    timelineData.forEach((item, index) => {
      if (processed.has(index)) return;

      const group = [item];
      processed.add(index);

      timelineData.forEach((otherItem, otherIndex) => {
        if (otherIndex !== index && !processed.has(otherIndex)) {
          if (hasOverlap(item.year, otherItem.year)) {
            group.push(otherItem);
            processed.add(otherIndex);
          }
        }
      });

      groupedData.push(group);
    });

    return groupedData;
  }, [timelineData]);
};
