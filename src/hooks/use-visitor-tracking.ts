"use client";

import { useEffect, useRef, useState } from "react";

export function useVisitorTracking() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasInitializedRef = useRef<boolean>(false);

  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const sessionId = sessionStorage.getItem("visitor_session_id") || 
      `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    sessionStorage.setItem("visitor_session_id", sessionId);
    sessionIdRef.current = sessionId;

    fetch("/api/visitors/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        action: "start",
      }),
    })
      .then(async (res) => {
        if (!res.ok) return null;
        try {
          return await res.json();
        } catch {
          return null;
        }
      })
      .then((data) => {
        if (data?.success && data.visitorId) {
          setVisitorId(data.visitorId);
          startTimeRef.current = Date.now();
        }
      })
      .catch(() => {});

    const handleBeforeUnload = () => {
      const currentVisitorId = visitorId || sessionStorage.getItem("visitor_id");
      if (currentVisitorId && startTimeRef.current) {
        fetch("/api/visitors/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            action: "end",
            visitorId: currentVisitorId,
          }),
          keepalive: true,
        }).catch(() => {});
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      const currentVisitorId = visitorId || sessionStorage.getItem("visitor_id");
      if (currentVisitorId && startTimeRef.current) {
        fetch("/api/visitors/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            action: "end",
            visitorId: currentVisitorId,
          }),
          keepalive: true,
        }).catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    if (visitorId) {
      sessionStorage.setItem("visitor_id", visitorId);
    }
  }, [visitorId]);

  return { visitorId };
}
