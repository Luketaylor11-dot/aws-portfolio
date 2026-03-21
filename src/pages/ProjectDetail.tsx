import SiteFooter from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import { FEATURED_PROJECTS, getProjectBySlug, type ProjectVideoDemo } from '@/data/featuredProjects';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, Redirect, useRoute } from 'wouter';

function ProjectVideoPlayer({ demo }: { demo: ProjectVideoDemo }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="max-w-md sm:max-w-lg mx-auto rounded-xl border border-dashed border-gray-600 bg-gray-800/60 p-8 text-center">
        <p className="text-gray-300 text-sm mb-2 font-medium">{demo.label}</p>
        <p className="text-gray-500 text-sm leading-relaxed">
          Could not load this video. Add your MP4 to{' '}
          <code className="text-cyan-400 text-xs bg-gray-900/80 px-1.5 py-0.5 rounded">
            public/videos/
          </code>{' '}
          using the filename from{' '}
          <code className="text-cyan-400 text-xs bg-gray-900/80 px-1.5 py-0.5 rounded break-all">
            {demo.src}
          </code>{' '}
          (path after <span className="text-gray-400">public</span>), then refresh.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-w-xs sm:max-w-sm md:max-w-md mx-auto">
      <p className="text-sm font-medium text-gray-400">{demo.label}</p>
      <video
        className="w-full rounded-xl border border-gray-700 bg-black shadow-lg"
        controls
        playsInline
        preload="metadata"
        src={demo.src}
        onError={() => setFailed(true)}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default function ProjectDetail() {
  const [, params] = useRoute<{ slug: string }>('/projects/:slug');
  const slug = params?.slug;

  const project = useMemo(() => (slug ? getProjectBySlug(slug) : undefined), [slug]);

  if (!slug || !project) {
    return <Redirect to="/404" />;
  }

  const otherProjects = FEATURED_PROJECTS.filter((p) => p.slug !== project.slug);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white -ml-2">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Link>
          </Button>
          <span className="text-gray-600 hidden sm:inline">/</span>
          <span className="text-sm text-gray-400 truncate">Projects</span>
          <span className="text-gray-600 hidden sm:inline">/</span>
          <span className="text-sm font-medium text-blue-400 truncate">{project.title}</span>
        </div>
      </div>

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{project.title}</h1>
          <p className="text-lg text-gray-400 leading-relaxed">{project.tagline}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-invert prose-gray max-w-none space-y-6 mb-12">
          {project.overview.map((paragraph, i) => (
            <p key={i} className="text-gray-300 leading-relaxed text-base">
              {paragraph}
            </p>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">What I built</h2>
          <ul className="space-y-3">
            {project.highlights.map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                <span className="text-blue-400 mt-1 shrink-0">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {project.includeVideoSection && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6">Demo video</h2>
            {project.videoDemos.length > 0 ? (
              <div className="space-y-8">
                {project.videoDemos.map((demo) => (
                  <ProjectVideoPlayer key={demo.src} demo={demo} />
                ))}
              </div>
            ) : null}
          </section>
        )}

        {otherProjects.length > 0 && (
          <section className="pt-8 border-t border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">Other projects</h2>
            <ul className="space-y-2">
              {otherProjects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-gray-800 bg-gray-800/40 px-4 py-3 text-sm text-gray-300 hover:border-blue-500/40 hover:bg-gray-800/80 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{p.icon}</span>
                      {p.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <SiteFooter />
    </div>
  );
}
