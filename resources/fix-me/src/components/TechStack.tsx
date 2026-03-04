import { useEffect, useRef, useState } from 'react';
import { Cloud, Shield, Zap, Code, Network, Database } from 'lucide-react';

const technologies = [
  {
    category: 'Cloud & Infrastructure',
    icon: Cloud,
    skills: ['AWS (SAA)', 'VPC', 'EC2', 'S3', 'Lambda'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    category: 'Security & Networking',
    icon: Shield,
    skills: ['Cisco IOS', 'IPv4/IPv6', 'Active Directory', 'Network Security', 'Firewalls'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    category: 'Backend Development',
    icon: Code,
    skills: ['Laravel', 'PHP', 'Node.js', 'Express', 'REST APIs'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    category: 'Frontend Development',
    icon: Zap,
    skills: ['React', 'Vue.js', 'Inertia JS', 'Tailwind CSS', 'TypeScript'],
    color: 'from-orange-500 to-red-500',
  },
  {
    category: 'Databases & Tools',
    icon: Database,
    skills: ['MySQL', 'Git', 'Docker', 'Linux', 'Automation'],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    category: 'Programming Languages',
    icon: Network,
    skills: ['Python', 'JavaScript', 'PHP', 'Bash', 'SQL'],
    color: 'from-cyan-500 to-blue-500',
  },
];

export default function TechStack() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const rawIndex = entry.target.getAttribute('data-card-index');
        const cardIndex = rawIndex ? Number(rawIndex) : NaN;

        if (!Number.isNaN(cardIndex)) {
          setVisibleCards((previous) => {
            const next = new Set(previous);
            next.add(cardIndex);
            return next;
          });
        }

        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -12% 0px',
    });

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {technologies.map((tech, index) => {
        const Icon = tech.icon;
        return (
          <div
            key={index}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            data-card-index={index}
            className={`group relative overflow-hidden rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] ${visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            {/* Glassmorphism Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative z-10">
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${tech.color} mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                {tech.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {tech.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 group-hover:bg-primary/20 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-primary via-transparent to-secondary blur-xl" />
          </div>
        );
      })}
    </div>
  );
}
