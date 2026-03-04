import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const timelineEvents = [
  {
    year: '2016',
    title: 'Apprentice Web Developer',
    company: 'Cedrec',
    description: 'Started apprenticeship in software development. Built full-stack web applications using Laravel, PHP, and MySQL. Created event booking systems, blogs, and inventory tracking solutions.',
    skills: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Git'],
    highlight: false,
  },
  {
    year: '2017',
    title: 'Software Development Level 3 Certification',
    company: 'Certification',
    description: 'Completed apprenticeship and earned Microsoft Technical Associate certification. Proficient in full-stack web development.',
    skills: ['Full-Stack Development', 'Web Architecture'],
    highlight: true,
  },
  {
    year: '2018',
    title: 'Network Engineer',
    company: 'British Army - Royal Signals',
    description: 'Completed specialist training course. Managed LANs, WANs, SATCOM, and military radio systems. Led team of soldiers deploying secure global communication networks.',
    skills: ['Cisco IOS', 'Network Administration', 'Active Directory', 'Leadership'],
    highlight: false,
  },
  {
    year: '2018-2023',
    title: 'Senior Network Engineer',
    company: 'British Army',
    description: 'Provided IT infrastructure for 400+ staff globally. Designed IPv4/IPv6 networks, configured Cisco routers, completed CCNA training. Deployed to Estonia for NATO exercises. Supported COVID-19 response.',
    skills: ['CCNA', 'IPv4/IPv6', 'Cisco', 'Network Security', 'Leadership'],
    highlight: false,
  },
  {
    year: '2024',
    title: 'Rope Access Technician',
    company: 'Nordic Access',
    description: 'Contract work on wind turbine blade repair. Developed practical problem-solving skills in high-pressure environments.',
    skills: ['Technical Problem-Solving', 'Safety Protocols'],
    highlight: false,
  },
  {
    year: '2025',
    title: 'AWS Cloud Solutions Architect',
    company: 'In Progress',
    description: 'Transitioning back to IT with focus on AWS Cloud Architecture. Pursuing AWS Solutions Architect Associate certification. Building cloud-native solutions.',
    skills: ['AWS', 'Cloud Architecture', 'Security', 'Automation'],
    highlight: true,
  },
];

export default function Timeline() {
  const [visibleEvents, setVisibleEvents] = useState<Set<number>>(new Set());
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const rawIndex = entry.target.getAttribute('data-event-index');
        const eventIndex = rawIndex ? Number(rawIndex) : NaN;

        if (!Number.isNaN(eventIndex)) {
          setVisibleEvents((previous) => {
            const next = new Set(previous);
            next.add(eventIndex);
            return next;
          });
        }

        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -12% 0px',
    });

    eventRefs.current.forEach((eventElement) => {
      if (eventElement) {
        observer.observe(eventElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-primary opacity-30" />

      <div className="space-y-12">
        {timelineEvents.map((event, index) => (
          <div
            key={index}
            ref={(element) => {
              eventRefs.current[index] = element;
            }}
            data-event-index={index}
            className={`relative ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              {/* Left side - for even indices */}
              {index % 2 === 0 && (
                <div className="hidden md:block md:w-1/2 text-right pr-12">
                  <div className={`group relative overflow-hidden rounded-xl border ${event.highlight ? 'border-primary/50 bg-primary/5' : 'border-primary/20 bg-card/50'} backdrop-blur-xl p-6 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] ${visibleEvents.has(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: `${index * 60}ms` }}>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-primary font-semibold mb-3">{event.company}</p>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {event.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Center - Timeline dot */}
              <div className="flex justify-center">
                <div className={`w-6 h-6 rounded-full border-4 ${event.highlight ? 'border-primary bg-secondary' : 'border-primary bg-background'} shadow-lg shadow-primary/50 z-10 flex-shrink-0`} />
              </div>

              {/* Right side - for odd indices and mobile */}
              {index % 2 === 1 || window.innerWidth < 768 ? (
                <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:pl-12' : ''}`}>
                  <div className={`group relative overflow-hidden rounded-xl border ${event.highlight ? 'border-primary/50 bg-primary/5' : 'border-primary/20 bg-card/50'} backdrop-blur-xl p-6 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] ${visibleEvents.has(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: `${index * 60}ms` }}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold text-foreground">{event.title}</h3>
                      <span className="text-primary font-bold text-lg">{event.year}</span>
                    </div>
                    <p className="text-primary font-semibold mb-3">{event.company}</p>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {event.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Year badge - mobile only */}
              <div className="md:hidden text-primary font-bold text-lg">{event.year}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
