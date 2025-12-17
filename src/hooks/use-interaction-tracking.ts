"use client";

import { useCallback } from "react";

export type InteractionType = 
  | "button_click"
  | "link_click"
  | "form_submit"
  | "section_view"
  | "image_toggle"
  | "download"
  | "navigation";

export interface TrackInteractionOptions {
  type: InteractionType;
  action: string;
  element?: string;
  metadata?: Record<string, unknown>;
}

export function useInteractionTracking() {
  const getSessionId = useCallback(() => {
    if (typeof window === "undefined") return null;
    const sessionId = sessionStorage.getItem("visitor_session_id");
    return sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const trackInteraction = useCallback(
    async (options: TrackInteractionOptions) => {
      const sessionId = getSessionId();
      if (!sessionId) return;

      try {
        await fetch("/api/interactions/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...options,
            sessionId,
          }),
        });
      } catch (error) {
      }
    },
    [getSessionId]
  );

  return { trackInteraction, getSessionId };
}
