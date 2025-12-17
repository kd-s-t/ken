"use client";

import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/modules/ui";
import { useInteractionTracking } from "@/hooks/use-interaction-tracking";
import { navLinks, RESUME_FILENAME, RESUME_PDF_PATH } from "../constants";

const Navbar = () => {
  const { trackInteraction } = useInteractionTracking();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
    trackInteraction({
      type: "navigation",
      action: "nav_click",
      element: href,
    });
  };

  const handleDownload = async () => {
    await fetch("/api/resume/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    trackInteraction({
      type: "download",
      action: "resume_download",
      element: "navbar_resume",
    });
    const link = document.createElement("a");
    link.href = RESUME_PDF_PATH;
    link.download = RESUME_FILENAME;
    link.click();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="#home" className="text-2xl font-bold text-gradient">
            Eat Ramen and Build Apps
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <Button variant="default" size="sm" className="gap-2" onClick={handleDownload}>
              <Download className="w-4 h-4" />
              Resume
            </Button>
          </div>

          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border animate-fade-in">
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-lg text-muted-foreground hover:text-foreground transition-colors py-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.label}
                </button>
              ))}
              <Button variant="default" className="gap-2 mt-4" onClick={handleDownload}>
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

