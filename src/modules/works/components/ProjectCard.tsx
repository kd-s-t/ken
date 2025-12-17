"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

import { Button } from "@/modules/ui";
import { useInteractionTracking } from "@/hooks/use-interaction-tracking";
import type { ProjectCardProps } from "../types";

const ProjectCard = ({ title, description, tags, liveUrl, githubUrl, image, index }: ProjectCardProps) => {
  const { trackInteraction } = useInteractionTracking();
  const isSiargao = title === "Siargao Trading Road";
  const isSeery = title === "Seery";
  const isSplitSafe = title === "SplitSafe";
  
  return (
    <div
      className={`group relative rounded-xl overflow-hidden hover-lift hover-glow border border-border/50 ${
        isSiargao ? "bg-white" : isSeery ? "" : isSplitSafe ? "" : "bg-card"
      }`}
      style={{
        animationDelay: `${index * 0.2}s`,
        ...(isSiargao 
          ? {} 
          : isSeery 
          ? { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }
          : isSplitSafe
          ? { background: "#0D0D0D", borderColor: "#303434" }
          : { background: "var(--gradient-card)" }
        ),
      }}
    >
      <div className={`relative h-48 md:h-56 overflow-hidden flex items-center justify-center ${
        isSiargao ? "bg-white" : isSeery ? "bg-transparent" : isSplitSafe ? "bg-[#0D0D0D]" : "bg-card/50"
      }`}>
        <Image
          src={image}
          alt={title}
          style={{padding:40}}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        {!isSiargao && !isSeery && !isSplitSafe && (
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />
        )}
      </div>

      <div className="p-6">
        <h3 className={`text-xl font-semibold mb-2 group-hover:text-primary transition-colors ${
          isSiargao ? "text-gray-900" : isSeery ? "text-white" : isSplitSafe ? "text-white" : "text-foreground"
        }`}>
          {title}
        </h3>
        <p className={`text-sm mb-4 line-clamp-2 ${
          isSiargao ? "text-gray-600" : isSeery ? "text-white/90" : isSplitSafe ? "text-[#BCBCBC]" : "text-muted-foreground"
        }`}>
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-mono px-2 py-1 rounded-md ${
                isSeery 
                  ? "bg-white/20 text-white border border-white/30" 
                  : isSplitSafe
                  ? "bg-[#222222] text-[#FEB64D] border border-[#303434]"
                  : "bg-muted text-primary"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {liveUrl && (
            <Button 
              variant={isSiargao ? "default" : isSplitSafe ? "default" : "outline"} 
              size="sm" 
              asChild 
              className={`gap-2 seery-live-btn ${
                isSiargao 
                  ? "bg-[#1e3a5f] text-white hover:bg-[#2a4d73] border-[#1e3a5f]" 
                  : isSeery
                  ? "border-white/30 text-white hover:border-white hover:bg-white/10"
                  : isSplitSafe
                  ? "bg-[#FEB64D] text-[#0D0D0D] hover:bg-[#EC8E05] border-[#FEB64D]"
                  : "border-muted-foreground/30 hover:border-primary hover:text-primary"
              }`}
            >
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => {
                  trackInteraction({
                    type: "link_click",
                    action: "project_live_demo",
                    element: liveUrl,
                    metadata: { project: title },
                  });
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button 
              variant={isSiargao ? "default" : isSeery ? "outline" : isSplitSafe ? "outline" : "ghost"} 
              size="sm" 
              asChild 
              className={`gap-2 seery-code-btn ${
                isSiargao 
                  ? "bg-[#0d9488] text-white hover:bg-[#0f7d73] border-[#0d9488]" 
                  : isSeery
                  ? "border-white/30 text-white hover:border-white hover:bg-white/10"
                  : isSplitSafe
                  ? "border-[#303434] bg-[#222222] text-white hover:bg-[#303434] hover:border-[#FEB64D]"
                  : "hover:text-primary"
              }`}
            >
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => {
                  trackInteraction({
                    type: "link_click",
                    action: "project_github",
                    element: githubUrl,
                    metadata: { project: title },
                  });
                }}
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

