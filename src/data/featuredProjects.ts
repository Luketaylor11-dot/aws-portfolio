/**
 * Featured projects shown on the home page and their detail pages.
 * Demo videos: place MP4 files in /public/videos/ (see video.src paths below).
 * The portfolio website project has no video section by design.
 */

export type ProjectSlug =
  | 'aws-portfolio-website'
  | 'punchyface'
  | 'wind-company-organisation-app';

export type ProjectVideoDemo = {
  /** Shown above the player */
  label: string;
  /** Public URL, e.g. /videos/punchyface-demo.mp4 */
  src: string;
};

export type FeaturedProject = {
  slug: ProjectSlug;
  title: string;
  icon: string;
  /** Card teaser on home */
  shortDesc: string;
  cardClass: string;
  overlayClass: string;
  iconClass: string;
  titleClass: string;
  /** Detail page */
  tagline: string;
  overview: string[];
  highlights: string[];
  techStack: string[];
  /** If false, no video block is shown (used for the portfolio site). */
  includeVideoSection: boolean;
  /** Shown when includeVideoSection is true; can be empty — UI shows upload hint */
  videoDemos: ProjectVideoDemo[];
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: 'punchyface',
    title: 'Punchyface',
    icon: '👊',
    shortDesc:
      'A mobile game built with Expo (developed with Cursor) where you punch your way upward through five floors, dodging obstacles along the way. Includes player lives, multiple enemy types, sound effects, and animations.',
    cardClass: 'border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-600/20',
    overlayClass: 'from-purple-500/5 to-pink-500/5',
    iconClass: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    titleClass: 'group-hover:text-purple-400',
    tagline: 'Arcade-style mobile game — punch, dodge, and climb through five floors.',
    overview: [
      'Punchyface is an Expo-built phone game where the player fights upward through five distinct floors, avoiding hazards and enemies.',
      'The focus is on tight feel: lives, varied enemy behaviour, audio feedback, and animated characters and effects.',
    ],
    highlights: [
      'Five-floor vertical progression with obstacle layouts',
      'Player lives and multiple enemy types',
      'Sound effects and animation-driven feedback',
      'Built with Expo / React Native; developed iteratively with Cursor',
    ],
    techStack: ['Expo', 'React Native', 'Cursor'],
    includeVideoSection: true,
    videoDemos: [{ label: 'Gameplay demo', src: '/videos/punchyface-demo.mp4' }],
  },
  {
    slug: 'wind-company-organisation-app',
    title: 'Company Organisation App',
    icon: '🗺️',
    shortDesc:
      'An Expo app for wind companies that hire contractors: live team locations on an interactive map, search for people not on active projects with filters by available courses, and per-team accommodation and vehicle tracking with alerts plus uploaded vehicle check documents.',
    cardClass: 'border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-cyan-600/20',
    overlayClass: 'from-cyan-500/5 to-blue-500/5',
    iconClass: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
    titleClass: 'group-hover:text-cyan-400',
    tagline: 'Field operations for wind contractors — map, availability, fleet, and compliance in one place.',
    overview: [
      'A mobile organisation app for wind-sector companies that engage contractors across sites. It gives ops and coordinators a live picture of where teams are and who is available.',
      'Beyond location, it supports resourcing decisions with course-based filters, and day-to-day logistics with accommodation and vehicle tracking, alerts, and document uploads for vehicle checks.',
    ],
    highlights: [
      'Interactive map showing team locations in the field',
      'Search contractors not currently on projects, filtered by available / relevant courses',
      'Per-team accommodation and vehicle assignment tracking',
      'Notifications and alerts for operational events',
      'Upload and associate vehicle check documents with teams or vehicles',
    ],
    techStack: ['Expo', 'React Native', 'Maps', 'Document uploads'],
    includeVideoSection: true,
    videoDemos: [{ label: 'App walkthrough', src: '/videos/wind-company-organisation-demo.mp4' }],
  },
  {
    slug: 'aws-portfolio-website',
    title: 'AWS Portfolio Website',
    icon: '🌐',
    shortDesc:
      'Built this website using Laravel and React, then hosted it fully on AWS with SSL/TLS, a secured EC2 web instance, and a knowledge base integrated with Amazon AI services.',
    cardClass: 'border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-600/20',
    overlayClass: 'from-blue-500/5 to-cyan-500/5',
    iconClass: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    titleClass: 'group-hover:text-blue-400',
    tagline: 'Full-stack portfolio with AWS hosting and an AI-powered knowledge assistant.',
    overview: [
      'This project is the site you are browsing: a Laravel backend serving a React (Vite) frontend, deployed on AWS with production-grade TLS and server configuration.',
      'I integrated Amazon AI services with a knowledge base so visitors can ask questions and get contextual answers about my experience and skills.',
    ],
    highlights: [
      'End-to-end SSL/TLS termination and secure EC2 web instance setup',
      'Laravel + React architecture with a built frontend bundle under public/dist',
      'Knowledge-base chat backed by Amazon AI (Bedrock / related services)',
      'Operational concerns: deployment, updates, and monitoring patterns suitable for a personal production site',
    ],
    techStack: ['Laravel', 'React', 'Vite', 'Tailwind CSS', 'AWS EC2', 'SSL/TLS', 'Amazon AI'],
    includeVideoSection: false,
    videoDemos: [],
  },
];

export function getProjectBySlug(slug: string): FeaturedProject | undefined {
  return FEATURED_PROJECTS.find((p) => p.slug === slug);
}
