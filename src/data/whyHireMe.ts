import type { LucideIcon } from 'lucide-react';
import { Award, Laptop, Satellite, Target } from 'lucide-react';

export type WhyHireMeVariant = 'blue' | 'purple' | 'cyan' | 'green';

/** Single source of truth for “Why Hire Me” — used by Home.tsx and WhyHireMe.tsx */
export const WHY_HIRE_ME_ITEMS: Array<{
  title: string;
  description: string;
  emoji: string;
  Icon: LucideIcon;
  variant: WhyHireMeVariant;
}> = [
  {
    emoji: '🏅',
    Icon: Award,
    variant: 'blue',
    title: 'Military Experience and Discipline',
    description:
      'My five years of military service established a professional foundation of discipline, precision, and reliability. I am accustomed to performing under pressure and take pride in delivering stable, well-structured solutions that meet technical requirements and exceed expectations.',
  },
  {
    emoji: '🔒',
    Icon: Target,
    variant: 'purple',
    title: 'Security-First Mindset',
    description:
      'I build every project with a focus on security from the start. Whether developing web applications or managing network setups, I follow best practices to protect data and prevent unauthorized access. My goal is to ensure that systems are not just functional, but reliable and safe for users.',
  },
  {
    emoji: '💻',
    Icon: Laptop,
    variant: 'cyan',
    title: 'Web Dev Experience',
    description:
      'After completion of my apprenticeship at Cedrec I shipped real systems in Laravel and PHP — including a full database-driven site from scratch including event booking, blogs, inventory with barcode scanners, Mailchimp automation and user permissions',
  },
  {
    emoji: '🛰️',
    Icon: Satellite,
    variant: 'green',
    title: 'Networking Experience',
    description:
      'As a Royal Signals network engineer I worked on LANs, WANs, SATCOM, and radio systems; installed and hardened Cisco routers and switches; designed IPv4 schemes and IPv6 networks; and supported Active Directory for 400+ staff worldwide.',
  },
];

export const WHY_HIRE_ME_VARIANT_STYLES: Record<
  WhyHireMeVariant,
  {
    cardClass: string;
    overlayClass: string;
    iconBgClass: string;
    titleClass: string;
    lineClass: string;
  }
> = {
  blue: {
    cardClass: 'border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-600/20',
    overlayClass: 'from-blue-500/10 via-transparent to-cyan-500/10',
    iconBgClass: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    titleClass: 'group-hover:text-blue-400',
    lineClass: 'from-blue-500 to-cyan-500',
  },
  purple: {
    cardClass: 'border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-600/20',
    overlayClass: 'from-purple-500/10 via-transparent to-pink-500/10',
    iconBgClass: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    titleClass: 'group-hover:text-purple-400',
    lineClass: 'from-purple-500 to-pink-500',
  },
  cyan: {
    cardClass: 'border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-cyan-600/20',
    overlayClass: 'from-cyan-500/10 via-transparent to-blue-500/10',
    iconBgClass: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
    titleClass: 'group-hover:text-cyan-400',
    lineClass: 'from-cyan-500 to-blue-500',
  },
  green: {
    cardClass: 'border-green-500/20 hover:border-green-500/50 hover:shadow-green-600/20',
    overlayClass: 'from-green-500/10 via-transparent to-emerald-500/10',
    iconBgClass: 'bg-green-500/10 group-hover:bg-green-500/20',
    titleClass: 'group-hover:text-green-400',
    lineClass: 'from-green-500 to-emerald-500',
  },
};
