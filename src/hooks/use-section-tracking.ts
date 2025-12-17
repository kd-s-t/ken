"use client";

import { useEffect, useRef } from "react";
import { useInteractionTracking } from "./use-interaction-tracking";

const sections = ["home", "works", "timeline", "resume", "contact"];

export function useSectionTracking() {
  const { trackInteraction } = useInteractionTracking();
  const viewedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId) => {
      const element = document.querySelector(`#${sectionId}`);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !viewedSections.current.has(sectionId)) {
              viewedSections.current.add(sectionId);
              trackInteraction({
                type: "section_view",
                action: "section_viewed",
                element: sectionId,
              });
            }
          });
        },
        {
          threshold: 0.3,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [trackInteraction]);
}
