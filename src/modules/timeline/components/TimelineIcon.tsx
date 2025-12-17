import { Briefcase, Building2, CircleDollarSign, Dices, GraduationCap, HeartPulse, LucideIcon, Plane, Scale, Shield, ShoppingCart, Trophy } from "lucide-react";

interface TimelineIconProps {
  companyType?: string;
  isHackathon?: boolean;
  type?: "work" | "education";
}

const getCompanyTypeIcon = (companyType: string): LucideIcon => {
  const type = companyType.toLowerCase().split(',')[0].trim();
  
  switch (type) {
    case 'fintech':
      return CircleDollarSign;
    case 'legaltech':
      return Scale;
    case 'healthtech':
      return HeartPulse;
    case 'insurtech':
      return Shield;
    case 'e-commerce':
    case 'ecommerce':
      return ShoppingCart;
    case 'traveltech':
      return Plane;
    case 'education':
      return GraduationCap;
    case 'marketplace':
      return Building2;
    case 'bpo':
      return Building2;
    case 'randomtech':
      return Dices;
    default:
      return Building2;
  }
};

export const TimelineIcon = ({ companyType, isHackathon, type }: TimelineIconProps) => {
  let IconComponent: LucideIcon;

  if (companyType) {
    IconComponent = getCompanyTypeIcon(companyType);
  } else if (isHackathon) {
    IconComponent = Trophy;
  } else if (type === "work") {
    IconComponent = Briefcase;
  } else {
    IconComponent = GraduationCap;
  }

  return <IconComponent className="w-5 h-5 text-primary-foreground" />;
};
