import dynamic from "next/dynamic";
import { Contact } from "@/modules/contact";
import { Footer } from "@/modules/layout";
import { Navbar } from "@/modules/layout";
import { Specializations } from "@/modules/specializations";
import { Works } from "@/modules/works";

const Hero = dynamic(() => import("@/modules/hero").then((mod) => mod.Hero), {
  ssr: true,
});

const Timeline = dynamic(() => import("@/modules/timeline").then((mod) => mod.Timeline), {
  ssr: true,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Specializations />
      <Works />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  );
}

