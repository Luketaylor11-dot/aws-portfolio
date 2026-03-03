import { Card } from '@/components/ui/card';
import { Award, Target, Users, TrendingUp } from 'lucide-react';

export default function WhyHireMe() {
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

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {reasons.map((reason, index) => {
        const IconComponent = reason.icon;
        return (
          <Card 
            key={index} 
            className="group relative overflow-hidden border-primary/20 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
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
        );
      })}
    </div>
  );
}
