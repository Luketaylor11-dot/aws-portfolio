import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cloud, Shield, Zap } from 'lucide-react';

export default function FeaturedProjects() {
  const projects = [
    {
      title: 'Secure VPC Architecture',
      description: 'Designed and implemented a multi-tier VPC with public/private subnets, NAT gateways, and security groups for a financial services client.',
      tags: ['VPC', 'Security', 'Networking'],
      icon: Shield,
      metrics: ['99.9% Uptime', '50% Cost Reduction', '6-month project'],
    },
    {
      title: 'Serverless API Platform',
      description: 'Built a scalable serverless API using Lambda, API Gateway, and DynamoDB. Implemented auto-scaling and monitoring with CloudWatch.',
      tags: ['Lambda', 'API Gateway', 'Automation'],
      icon: Zap,
      metrics: ['10M+ Requests/Month', 'Sub-100ms Latency', 'Zero Maintenance'],
    },
    {
      title: 'Cloud Migration Strategy',
      description: 'Led migration of on-premises infrastructure to AWS. Implemented disaster recovery, backup strategies, and cost optimization.',
      tags: ['Migration', 'DR/BC', 'Cost Optimization'],
      icon: Cloud,
      metrics: ['40% Cost Savings', '3-month Timeline', '100+ Servers'],
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {projects.map((project, index) => {
        const IconComponent = project.icon;
        return (
          <Card key={index} className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative p-6">
              {/* Icon */}
              <div className="mb-4 inline-block p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <IconComponent className="w-6 h-6 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Metrics */}
              <div className="space-y-2 mb-6 pt-4 border-t border-border/30">
                {project.metrics.map((metric) => (
                  <div key={metric} className="flex items-center text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                    {metric}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full group/btn text-primary hover:text-secondary"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
