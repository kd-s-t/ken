"use client";

import { useVisitorTracking } from "@/hooks/use-visitor-tracking";
import { useSectionTracking } from "@/hooks/use-section-tracking";

export function VisitorTracker() {
  useVisitorTracking();
  useSectionTracking();
  return null;
}
