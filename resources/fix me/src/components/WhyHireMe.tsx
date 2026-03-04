import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Award, Target, Users, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Military Discipline Meets Tech Excellence',
    description: 'My 6 years in the Army taught me precision, reliability, and how to perform under pressure. I bring that same rigor to cloud architecture and infrastructure design.',
  },
  {
    icon: Target,
    title: 'Security-First Mindset',
    description: 'From network security in the military to cloud security in AWS, I understand the importance of protecting critical infrastructure and data at every layer.',
  },
  {
    icon: Users,
    title: 'Bridge Between Teams',
    description: 'I speak both languages: military operations and cloud technology. I can translate complex technical concepts for stakeholders and lead cross-functional teams effectively.',
  },
  {
    icon: TrendingUp,
    title: 'Proven Problem Solver',
    description: 'Whether managing network infrastructure for 1000+ users or architecting cloud solutions, I deliver scalable, cost-effective solutions that exceed expectations.',
  },
];

export default function WhyHireMe() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisibleCards(new Set(reasons.map((_, index) => index)));
      return;
    }

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
    <div className="grid md:grid-cols-2 gap-6">
      {reasons.map((reason, index) => {
        const IconComponent = reason.icon;
        return (
          <div
            key={index}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            data-card-index={index}
            className={`transition-all duration-300 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] ${visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            <Card className="group relative overflow-hidden border-primary/20 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative p-6">
                {/* Icon with background */}
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
