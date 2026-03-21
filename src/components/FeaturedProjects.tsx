import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { FEATURED_PROJECTS } from '@/data/featuredProjects';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function FeaturedProjects() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {FEATURED_PROJECTS.map((project) => (
        <Link key={project.slug} href={`/projects/${project.slug}`} className="block h-full">
          <Card className="group relative h-full overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative p-6 flex flex-col h-full">
              <div className="mb-4 inline-block p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit">
                <span className="text-2xl" aria-hidden>
                  {project.icon}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow">
                {project.shortDesc}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2 mb-6 pt-4 border-t border-border/30">
                {project.highlights.slice(0, 3).map((metric) => (
                  <div key={metric} className="flex items-center text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 shrink-0" />
                    <span className="line-clamp-2">{metric}</span>
                  </div>
                ))}
              </div>

              <div className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-primary group-hover:text-secondary transition-colors">
                View project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
