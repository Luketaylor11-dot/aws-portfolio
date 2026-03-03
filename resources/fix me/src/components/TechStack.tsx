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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {technologies.map((tech, index) => {
        const Icon = tech.icon;
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
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
