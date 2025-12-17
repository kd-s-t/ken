import { Brain, Cpu, Globe, Link, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Specialization {
  name: string;
  icon: LucideIcon;
}

export const specializations: Specialization[] = [
  { name: "Web", icon: Globe },
  { name: "Mobile", icon: Smartphone },
  { name: "Blockchain", icon: Link },
  { name: "AI", icon: Brain },
  { name: "IoT", icon: Cpu },
];
