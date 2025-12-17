"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { specializations } from "../constants";

const Specializations = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="specializations" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm mb-2">EXPERTISE</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Specializes In
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Areas of expertise and technologies I work with.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {specializations.map((specialization, index) => {
              const IconComponent = specialization.icon;
              return (
                <motion.div
                  key={specialization.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-6 rounded-xl border border-border/50 hover-lift transition-all duration-300 hover:border-primary/50 text-center flex flex-col items-center justify-center gap-3 min-w-[140px]"
                  style={{ background: "var(--gradient-card)" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-foreground font-semibold text-lg">
                    {specialization.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specializations;
