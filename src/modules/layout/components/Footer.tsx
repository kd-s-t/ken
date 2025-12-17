"use client";

import { Github, Linkedin, Mail } from "lucide-react";

import { StackOverflowIcon } from "@/modules/layout";
import { useInteractionTracking } from "@/hooks/use-interaction-tracking";

const Footer = () => {
  const { trackInteraction } = useInteractionTracking();

  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © Developer Since 2014
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/kd-s-t"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              onClick={() => {
                trackInteraction({
                  type: "link_click",
                  action: "footer_github_click",
                  element: "https://github.com/kd-s-t",
                });
              }}
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/kdst/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              onClick={() => {
                trackInteraction({
                  type: "link_click",
                  action: "footer_linkedin_click",
                  element: "https://www.linkedin.com/in/kdst/",
                });
              }}
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://stackoverflow.com/users/9037356/kd-s-t"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              title="Stack Overflow"
              onClick={() => {
                trackInteraction({
                  type: "link_click",
                  action: "footer_stackoverflow_click",
                  element: "https://stackoverflow.com/users/9037356/kd-s-t",
                });
              }}
            >
              <StackOverflowIcon className="w-5 h-5" />
            </a>
            <a
              href="mailto:ollololl.ollooloo@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              onClick={() => {
                trackInteraction({
                  type: "link_click",
                  action: "footer_email_click",
                  element: "mailto:ollololl.ollooloo@gmail.com",
                });
              }}
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

