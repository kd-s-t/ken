import ProjectCard from "./ProjectCard";
import { projects } from "../constants";

const Works = () => {
  return (
    <section id="works" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm mb-2">MY PORTFOLIO</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for building exceptional web applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;

