"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, RotateCw } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import halfPic from "@/assets/half.png";
import wholePic from "@/assets/whole.jpg";
import { StackOverflowIcon } from "@/modules/layout";
import { Button } from "@/modules/ui";
import { useInteractionTracking } from "@/hooks/use-interaction-tracking";
import { PROFILE_IMAGE_STORAGE_KEY } from "../constants";

const Hero = () => {
  const { trackInteraction } = useInteractionTracking();
  const [isDragging, setIsDragging] = useState(false);
  const [showWhole, setShowWhole] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(PROFILE_IMAGE_STORAGE_KEY);
    if (saved === "true") {
      setShowWhole(true);
    }
    isInitialLoad.current = false;
  }, []);

  useEffect(() => {
    if (isMounted && !isInitialLoad.current) {
      localStorage.setItem(PROFILE_IMAGE_STORAGE_KEY, showWhole.toString());
    }
  }, [showWhole, isMounted]);

  const handleToggle = () => {
    setShouldAnimate(true);
    setShowWhole(!showWhole);
    trackInteraction({
      type: "image_toggle",
      action: "profile_image_toggle",
      element: showWhole ? "half" : "whole",
    });
  };
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateXValue = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateYValue = useTransform(x, [-0.5, 0.5], [-15, 15]);
  
  const rotateX = useSpring(rotateXValue, {
    stiffness: isDragging ? 1000 : 300,
    damping: isDragging ? 20 : 30,
  });
  const rotateY = useSpring(rotateYValue, {
    stiffness: isDragging ? 1000 : 300,
    damping: isDragging ? 20 : 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleDrag = (_event: unknown, info: { delta: { x: number; y: number } }) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const sensitivity = 0.8;
    
    const deltaX = info.delta.x / rect.width * sensitivity;
    const deltaY = info.delta.y / rect.height * sensitivity;
    
    x.set(x.get() + deltaX);
    y.set(y.get() + deltaY);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </motion.div>

      <div className="container mx-auto px-6 pt-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div 
              ref={containerRef}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1000 }}
            >
              <motion.div 
                className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary/30 relative group cursor-grab active:cursor-grabbing"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.3}
                dragMomentum={false}
                onDrag={handleDrag}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                whileHover={{ scale: 1.05 }}
                whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                transition={isDragging ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={showWhole ? "whole" : "half"}
                    initial={shouldAnimate ? { 
                      opacity: 0, 
                      rotateY: -180,
                      scale: 0.8,
                    } : undefined}
                    animate={{ 
                      opacity: 1, 
                      rotateY: 0,
                      scale: 1,
                    }}
                    exit={shouldAnimate ? { 
                      opacity: 0, 
                      rotateY: 180,
                      scale: 0.8,
                    } : undefined}
                    transition={shouldAnimate ? { 
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1]
                    } : { duration: 0 }}
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Image
                      src={showWhole ? wholePic : halfPic}
                      alt="Profile photo"
                      fill
                      className="object-cover"
                      style={{ 
                        transform: "translateZ(20px)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.button
                onClick={handleToggle}
                className="absolute top-2 right-2 z-20 w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground flex items-center justify-center shadow-lg backdrop-blur-sm border border-primary/50"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <RotateCw className="w-3 h-3 md:w-3.5 md:h-3.5" />
              </motion.button>
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-primary/20 pointer-events-none"
                style={{ transform: "scale(1.1)" }}
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [1.1, 1.15, 1.1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            <motion.div 
              className="text-center lg:text-left flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.p 
                className="text-primary font-mono text-sm md:text-base mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Hello, I&apos;m
              </motion.p>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-foreground">Kenn</span>
                <br />
                <span className="text-gradient">Software Engineer</span>
              </motion.h1>

              <motion.p 
                className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                10+ years of experience building web applications. Passionate about clean code, 
                exceptional user experiences, and solving real-world problems with technology.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="gap-2 px-8"
                    onClick={() => {
                      document.querySelector("#works")?.scrollIntoView({ behavior: "smooth" });
                      trackInteraction({
                        type: "button_click",
                        action: "view_work",
                        element: "View My Work",
                      });
                    }}
                  >
                    View My Work
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 px-8 border-muted-foreground/30 hover:border-primary hover:text-primary"
                    onClick={() => {
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                      trackInteraction({
                        type: "button_click",
                        action: "get_in_touch",
                        element: "Get In Touch",
                      });
                    }}
                  >
                    Get In Touch
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex items-center justify-center lg:justify-start gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.a
                  href="https://github.com/kd-s-t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    trackInteraction({
                      type: "link_click",
                      action: "github_click",
                      element: "https://github.com/kd-s-t",
                    });
                  }}
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/kdst/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    trackInteraction({
                      type: "link_click",
                      action: "linkedin_click",
                      element: "https://www.linkedin.com/in/kdst/",
                    });
                  }}
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://stackoverflow.com/users/9037356/kd-s-t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  title="Stack Overflow"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    trackInteraction({
                      type: "link_click",
                      action: "stackoverflow_click",
                      element: "https://stackoverflow.com/users/9037356/kd-s-t",
                    });
                  }}
                >
                  <StackOverflowIcon className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="mailto:ollololl.ollooloo@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    trackInteraction({
                      type: "link_click",
                      action: "email_click",
                      element: "mailto:ollololl.ollooloo@gmail.com",
                    });
                  }}
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default Hero;

