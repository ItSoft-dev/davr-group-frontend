import {
  Truck, Clock, Shield, Users, MapPin, Package, Zap, Route, Headphones,
  Box, Wrench, Globe, Cpu, Eye, Handshake, Target, Award, TrendingUp,
  Flag, Radar, Gauge, Star, Phone, Mail, CheckCircle2, ArrowRight,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Truck, Clock, Shield, Users, MapPin, Package, Zap, Route, Headphones,
  Box, Wrench, Globe, Cpu, Eye, Handshake, Target, Award, TrendingUp,
  Flag, Radar, Gauge, Star, Phone, Mail, CheckCircle2, ArrowRight,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Package;
}
