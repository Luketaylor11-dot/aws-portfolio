import { Cloud, Lock, Zap, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Static Site Hosting on S3',
    description: 'Deployed a high-performance static website using AWS S3 with CloudFront CDN distribution. Implemented automated deployments via CI/CD pipeline.',
    tags: ['Architecture', 'Security', 'Automation'],
    technologies: ['S3', 'CloudFront', 'Route53', 'CI/CD'],
    status: 'Planned',
    icon: Cloud,
  },
  {
    title: 'Serverless API with Lambda',
    description: 'Built a scalable REST API using AWS Lambda and API Gateway. Integrated with DynamoDB for data persistence and implemented API authentication.',
    tags: ['Architecture', 'Automation'],
    technologies: ['Lambda', 'API Gateway', 'DynamoDB', 'IAM'],
    status: 'Planned',
    icon: Zap,
  },
  {
    title: 'VPC Peering & Network Security',
    description: 'Designed and implemented VPC peering between multiple AWS accounts. Configured security groups, NACLs, and VPN connections for secure inter-network communication.',
    tags: ['Architecture', 'Security'],
    technologies: ['VPC', 'Security Groups', 'VPN', 'Route53'],
    status: 'Planned',
    icon: Lock,
  },
  {
    title: 'Automated Infrastructure as Code',
    description: 'Created Infrastructure as Code templates using Terraform. Automated provisioning of EC2 instances, RDS databases, and load balancers with version control.',
    tags: ['Automation', 'Architecture'],
    technologies: ['Terraform', 'CloudFormation', 'Git', 'Jenkins'],
    status: 'Planned',
    icon: Cloud,
  },
  {
    title: 'Multi-Region Disaster Recovery',
    description: 'Implemented a disaster recovery solution across multiple AWS regions. Configured automated failover, backup strategies, and recovery time objectives (RTO).',
    tags: ['Architecture', 'Security'],
    technologies: ['RDS', 'S3', 'Route53', 'CloudWatch'],
    status: 'Planned',
    icon: Lock,
  },
  {
    title: 'Microservices Architecture',
    description: 'Designed and deployed a microservices architecture using ECS containers. Implemented service mesh for inter-service communication and monitoring.',
    tags: ['Architecture', 'Automation'],
    technologies: ['ECS', 'Docker', 'Service Mesh', 'CloudWatch'],
    status: 'Planned',
    icon: Zap,
  },
];

export default function ProjectVault() {
  return (
    <div id="projects" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => {
        const Icon = project.icon;
        return (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-xl hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/40 group-hover:to-secondary/40 transition-all duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.status === 'Planned' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 flex-grow">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Technologies */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2 font-semibold">Technologies</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-xs bg-secondary/10 text-secondary border border-secondary/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 border-primary/30 hover:border-primary/80 hover:bg-primary/10 transition-all duration-300"
              >
                <span>Learn More</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-primary via-transparent to-secondary blur-xl" />
          </div>
        );
      })}
    </div>
  );
}
