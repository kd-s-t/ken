"use client";

import { Download, FileText } from "lucide-react";

import { Button } from "@/modules/ui";
import { useInteractionTracking } from "@/hooks/use-interaction-tracking";
import { RESUME_FILENAME, RESUME_PDF_PATH } from "../constants";

const ResumeDownload = () => {
  const { trackInteraction } = useInteractionTracking();

  const handleDownload = async () => {
    try {
      await fetch("/api/resume/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
    }

    trackInteraction({
      type: "download",
      action: "resume_download",
      element: "resume_section_download",
    });

    const link = document.createElement("a");
    link.href = RESUME_PDF_PATH;
    link.download = RESUME_FILENAME;
    link.click();
  };

  return (
    <section id="resume" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div
          className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl border border-border/50 relative overflow-hidden"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Want a copy of my resume?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Download my full resume to learn more about my experience, skills, and qualifications.
            </p>

            <Button size="lg" className="gap-2 px-8" onClick={handleDownload}>
              <Download className="w-5 h-5" />
              Download Resume (PDF)
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeDownload;

