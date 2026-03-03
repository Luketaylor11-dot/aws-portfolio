import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, FileText, Link as LinkIcon } from 'lucide-react';

const resources = [
  {
    category: 'AWS Services',
    items: [
      {
        title: 'EC2 Fundamentals',
        description: 'Understanding Elastic Compute Cloud instances, security groups, and networking.',
        icon: FileText,
      },
      {
        title: 'S3 & Storage Solutions',
        description: 'Object storage, bucket policies, versioning, and lifecycle management.',
        icon: FileText,
      },
      {
        title: 'VPC & Networking',
        description: 'Virtual Private Cloud, subnets, routing, and security.',
        icon: FileText,
      },
      {
        title: 'Lambda & Serverless',
        description: 'Serverless computing, event-driven architecture, and cost optimization.',
        icon: FileText,
      },
    ],
  },
  {
    category: 'Security & Compliance',
    items: [
      {
        title: 'IAM Best Practices',
        description: 'Identity and Access Management, roles, policies, and least privilege.',
        icon: FileText,
      },
      {
        title: 'Network Security',
        description: 'Security groups, NACLs, VPN, and DDoS protection.',
        icon: FileText,
      },
      {
        title: 'Data Protection',
        description: 'Encryption at rest and in transit, key management, and compliance.',
        icon: FileText,
      },
      {
        title: 'Monitoring & Logging',
        description: 'CloudWatch, CloudTrail, and security monitoring strategies.',
        icon: FileText,
      },
    ],
  },
  {
    category: 'Architecture Patterns',
    items: [
      {
        title: 'High Availability Design',
        description: 'Multi-AZ deployments, load balancing, and auto-scaling.',
        icon: FileText,
      },
      {
        title: 'Disaster Recovery',
        description: 'RTO, RPO, backup strategies, and failover mechanisms.',
        icon: FileText,
      },
      {
        title: 'Microservices Architecture',
        description: 'ECS, EKS, service mesh, and container orchestration.',
        icon: FileText,
      },
      {
        title: 'Infrastructure as Code',
        description: 'Terraform, CloudFormation, and automated deployments.',
        icon: FileText,
      },
    ],
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen pt-24 pb-20" style={{
      background: 'linear-gradient(135deg, #0f1a2e 0%, #1a2a4a 25%, #0d1f3c 50%, #1a2a4a 75%, #0f1a2e 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <Button variant="ghost" size="sm" className="gap-2 mb-6 justify-center mx-auto" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
            AWS Study Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive notes and guides for AWS certification preparation and cloud architecture best practices.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="space-y-16">
          {resources.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="flex items-center gap-3 mb-8 justify-center">
                <BookOpen className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground text-center">{section.category}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={itemIndex}
                      className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card/50 backdrop-blur-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer animate-in fade-in slide-in-from-bottom-4"
                      style={{ animationDelay: `${itemIndex * 100}ms` }}
                    >
                      {/* Glassmorphism Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors mb-4 w-fit">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-4">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                          <span>Coming Soon</span>
                          <LinkIcon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Hover Glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-primary via-transparent to-secondary blur-xl" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-xl p-12 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                More Resources Coming Soon
              </h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                I'm continuously updating this section with detailed study guides, code examples, and architecture diagrams for AWS certification preparation.
              </p>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-white" asChild>
                <Link href="/">
                  Back to Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
