import SiteFooter from '@/components/SiteFooter';
import { CV_DOWNLOAD_FILENAME, CV_DOWNLOAD_URL } from '@/const';
import { FEATURED_PROJECTS } from '@/data/featuredProjects';
import { WHY_HIRE_ME_ITEMS, WHY_HIRE_ME_VARIANT_STYLES } from '@/data/whyHireMe';
import { useEffect, useState } from 'react';
import { Link } from 'wouter';

const heroParticles = Array.from({ length: 96 }, (_, index) => ({
  left: 2 + ((index * 7) % 96),
  top: 6 + ((index * 11) % 88),
  size: 2 + (index % 5),
  delay: (index % 18) * 0.28,
  duration: 4.6 + (index % 8) * 0.58,
}));

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);
  const [metricsAnimated, setMetricsAnimated] = useState(false);
  const [metricCounts, setMetricCounts] = useState({ years: 0, projects: 0 });
  const [metricTilt, setMetricTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setHeroScrollY(window.scrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const headingNodes = Array.from(document.querySelectorAll<HTMLElement>('.js-heading-reveal'));
    const staggerGroups = Array.from(document.querySelectorAll<HTMLElement>('.js-stagger-group'));
    const selfRevealItems = Array.from(document.querySelectorAll<HTMLElement>('.js-reveal-self'));

    if (!('IntersectionObserver' in window)) {
      headingNodes.forEach((node) => {
        node.classList.remove('opacity-0', 'translate-y-8');
        node.classList.add('opacity-100', 'translate-y-0');
      });

      staggerGroups.forEach((group) => {
        const items = Array.from(group.querySelectorAll<HTMLElement>('.js-stagger-item'));
        items.forEach((item) => {
          item.classList.remove('opacity-0', 'translate-y-8');
          item.classList.add('opacity-100', 'translate-y-0');
        });
      });

      selfRevealItems.forEach((item) => {
        item.classList.remove('opacity-0', 'translate-y-8');
        item.classList.add('opacity-100', 'translate-y-0');
      });

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }

    const headingObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const node = entry.target as HTMLElement;
        node.classList.remove('opacity-0', 'translate-y-8');
        node.classList.add('opacity-100', 'translate-y-0');
        obs.unobserve(node);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -12% 0px',
    });

    const staggerObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const group = entry.target as HTMLElement;
        const items = Array.from(group.querySelectorAll<HTMLElement>('.js-stagger-item'));

        items.forEach((item, index) => {
          item.style.transitionDelay = `${index * 180}ms`;
          item.style.transitionDuration = '1200ms';
          item.style.transitionTimingFunction = 'cubic-bezier(0.25,0.46,0.45,0.94)';
          item.classList.remove('opacity-0', 'translate-y-8');
          item.classList.add('opacity-100', 'translate-y-0');
        });

        obs.unobserve(group);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -12% 0px',
    });

    const selfRevealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const item = entry.target as HTMLElement;
        const indexValue = item.getAttribute('data-timeline-index');
        const index = indexValue ? Number(indexValue) : 0;

        item.style.transitionProperty = 'opacity, transform';
        item.style.transitionDuration = '1300ms';
        item.style.transitionTimingFunction = 'cubic-bezier(0.25,0.46,0.45,0.94)';
        item.style.transitionDelay = `${Math.max(0, index) * 120}ms`;
        item.classList.remove('opacity-0', 'translate-y-8');
        item.classList.add('opacity-100', 'translate-y-0');

        obs.unobserve(item);
      });
    }, {
      threshold: 0.35,
      rootMargin: '0px 0px -5% 0px',
    });

    headingNodes.forEach((node) => headingObserver.observe(node));
    staggerGroups.forEach((group) => staggerObserver.observe(group));
    selfRevealItems.forEach((item) => selfRevealObserver.observe(item));

    let metricsObserver: IntersectionObserver | null = null;
    const metricsCard = document.querySelector<HTMLElement>('.js-hero-metrics');

    if (metricsCard) {
      if (!('IntersectionObserver' in window)) {
        setMetricsAnimated(true);
      } else {
        metricsObserver = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            setMetricsAnimated(true);
            obs.unobserve(entry.target);
          });
        }, {
          threshold: 0.35,
        });

        metricsObserver.observe(metricsCard);
      }
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      headingObserver.disconnect();
      staggerObserver.disconnect();
      selfRevealObserver.disconnect();
      metricsObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!metricsAnimated) {
      return;
    }

    const targets = { years: 6, projects: 10 };

    const duration = 1700;
    let frameId = 0;
    let startedAt = 0;

    const tick = (timestamp: number) => {
      if (!startedAt) {
        startedAt = timestamp;
      }

      const elapsed = timestamp - startedAt;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setMetricCounts({
        years: Math.round(targets.years * eased),
        projects: Math.round(targets.projects * eased),
      });

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [metricsAnimated]);

  const handleMetricsMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xRatio = (event.clientX - rect.left) / rect.width;
    const yRatio = (event.clientY - rect.top) / rect.height;

    const rotateY = (xRatio - 0.5) * 5;
    const rotateX = (0.5 - yRatio) * 4;

    setMetricTilt({ x: rotateX, y: rotateY });
  };

  const handleMetricsMouseLeave = () => {
    setMetricTilt({ x: 0, y: 0 });
  };

  const handleNavScroll = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();

    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetNode = document.getElementById(targetId);
    if (!targetNode) {
      return;
    }

    // Keep section headings clear of the fixed navbar after scroll completes.
    const navHeight = document.getElementById('navbar')?.offsetHeight ?? 80;
    const targetTop = targetNode.getBoundingClientRect().top + window.scrollY - navHeight - 8;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 shadow-lg' : ''}`}
        id="navbar"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" onClick={(event) => handleNavScroll(event, 'top')} className="flex items-center gap-2 group">
              <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300 hover:scale-110 transform">
                <span className="text-white font-bold">LT</span>
              </div>
              <span className="hidden sm:inline font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:opacity-80 transition-opacity">
                Luke Taylor
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              <a href="#" onClick={(event) => handleNavScroll(event, 'top')} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#projects" onClick={(event) => handleNavScroll(event, 'projects')} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium relative group">
                Projects
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#skills" onClick={(event) => handleNavScroll(event, 'skills')} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium relative group">
                Skills
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a
                href={CV_DOWNLOAD_URL}
                download={CV_DOWNLOAD_FILENAME}
                className="px-4 py-2 border border-blue-500/50 rounded-lg hover:border-blue-500 text-white hover:bg-blue-500/10 transition-all duration-300 hover:scale-110 transform text-sm font-medium"
              >
                ↓ CV
              </a>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-glow transition-all duration-300 hover:scale-110 transform text-sm font-medium">
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black opacity-80"></div>
        <div
          className="absolute inset-0 bg-[url('https://d2xsxph8kpxj0f.cloudfront.net/310519663399913629/RpYRqPmtR85bMvP4PX2aEA/bg-cloud-infrastructure-AGcVd2cpsE4PzdkN8Pa2T4.webp')] bg-cover bg-center opacity-30 will-change-transform"
          style={{ transform: `translateY(${heroScrollY * 0.16}px)` }}
        ></div>
        <div className="absolute inset-0 hero-vignette"></div>
        <div className="absolute inset-0 pointer-events-none z-[1]">
          {heroParticles.map((particle, index) => (
            <span
              key={index}
              className="hero-particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="mb-8">
                <div className="inline-block px-4 py-2 border border-blue-500/50 rounded-full mb-6 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                  <span className="text-sm font-semibold text-blue-400">AWS Cloud Solutions Architect</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="hero-gradient-reveal">Cloud Architect / AWS / Web Applications</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                6 years of high-pressure technical expertise. Transitioning from military network engineering to cloud architecture with a focus on security, automation, and scalable solutions.
              </p>

              <div className="flex gap-4 mb-8 flex-wrap">
                <div className="w-14 h-14 rounded-lg gradient-orange flex items-center justify-center text-2xl shadow-lg hover:shadow-orange-500/70 transition-all duration-300 hover:scale-110">☁️</div>
                <div className="w-14 h-14 rounded-lg gradient-red flex items-center justify-center text-2xl shadow-lg hover:shadow-red-500/70 transition-all duration-300 hover:scale-110">🔐</div>
                <div className="w-14 h-14 rounded-lg gradient-cyan flex items-center justify-center text-2xl shadow-lg hover:shadow-cyan-500/70 transition-all duration-300 hover:scale-110">⚛️</div>
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-2xl shadow-lg hover:shadow-purple-600/70 transition-all duration-300 hover:scale-110">🔗</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 hero-button-float">
                <a href="#projects" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-glow">
                  📊 View My Work
                </a>
                <a
                  href={CV_DOWNLOAD_URL}
                  download={CV_DOWNLOAD_FILENAME}
                  className="inline-flex items-center justify-center border border-blue-500/50 hover:border-blue-500 text-white px-8 py-6 text-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30"
                >
                  ⬇️ Download CV
                </a>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-center justify-center">
              <img
                src="/img/profile.jpg"
                alt="Profile"
                className="w-80 h-80 mt-36 rounded-full filter brightness-[0.9] object-cover border-4 border-white/10 shadow-lg mb-6 will-change-transform"
                style={{ transform: `translateY(${heroScrollY * 0.1}px)` }}
              />
              <div
                className="relative w-full max-w-md min-h-[280px] py-12 px-8 bg-gradient-to-br from-blue-600/10 rounded-2xl border border-blue-500/20 flex flex-col items-center justify-center gap-8 group hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-600/30 transition-transform duration-300 [transform-style:preserve-3d] js-hero-metrics"
                style={{
                  transform: `translateY(${heroScrollY * 0.06}px) perspective(900px) rotateX(${metricTilt.x}deg) rotateY(${metricTilt.y}deg)`,
                }}
                onMouseMove={handleMetricsMouseMove}
                onMouseLeave={handleMetricsMouseLeave}
              >
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-400 mb-2 hero-metric-glow">{metricCounts.years}<span className="text-3xl">+</span></div>
                  <div className="text-gray-300 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-cyan-400 mb-2 hero-metric-glow">{metricCounts.projects}<span className="text-3xl">+</span></div>
                  <div className="text-gray-300 text-sm">Projects Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        <div className="absolute inset-0 pointer-events-none z-[1] section-bg-aurora-global"></div>

      <section id="skills" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto mb-20 text-center transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] opacity-0 translate-y-8 js-heading-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 hover:text-blue-400 transition-colors duration-300">Tech Arsenal</h2>
            <p className="text-xl text-gray-400">Proficient in cloud, network, and web technologies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto js-stagger-group">
            {[
              {
                title: 'Cloud & Infrastructure',
                icon: '☁️',
                skills: ['S3', 'EC2', 'Workmail', 'Knowledgebase', 'Bedrock'],
                cardClass: 'border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-600/20',
                overlayClass: 'from-blue-500/10 to-cyan-500/10',
                iconClass: 'gradient-orange',
                titleClass: 'group-hover:text-blue-400',
                tagClass: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
              },
              {
                title: 'Security & Networking',
                icon: '🔐',
                skills: ['Cisco IOS', 'IPv4/IPv6', 'Active Directory', 'Security', 'Firewalls'],
                cardClass: 'border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-600/20',
                overlayClass: 'from-purple-500/10 to-pink-500/10',
                iconClass: 'bg-gradient-to-br from-purple-500 to-pink-500',
                titleClass: 'group-hover:text-purple-300',
                tagClass: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
              },
              {
                title: 'Backend Development',
                icon: '💻',
                skills: ['Laravel', 'PHP', 'REST APIs'],
                cardClass: 'border-green-500/20 hover:border-green-500/50 hover:shadow-green-600/20',
                overlayClass: 'from-green-500/10 to-emerald-500/10',
                iconClass: 'gradient-green',
                titleClass: 'group-hover:text-green-300',
                tagClass: 'bg-green-500/10 text-green-300 border-green-500/20',
              },
              {
                title: 'Frontend Development',
                icon: '⚡',
                skills: ['React', 'Inertia JS', 'Tailwind'],
                cardClass: 'border-orange-500/20 hover:border-orange-500/50 hover:shadow-orange-600/20',
                overlayClass: 'from-orange-500/10 to-red-500/10',
                iconClass: 'gradient-orange',
                titleClass: 'group-hover:text-orange-300',
                tagClass: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
              },
              {
                title: 'Databases & Tools',
                icon: '💾',
                skills: ['MySQL', 'Git', 'Linux', 'Automation'],
                cardClass: 'border-indigo-500/20 hover:border-indigo-500/50 hover:shadow-indigo-600/20',
                overlayClass: 'from-indigo-500/10 to-purple-500/10',
                iconClass: 'bg-gradient-to-br from-indigo-500 to-purple-500',
                titleClass: 'group-hover:text-indigo-300',
                tagClass: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
              },
              {
                title: 'Programming Languages',
                icon: '🔤',
                skills: ['HTML', 'CSS', 'JavaScript', 'PHP'],
                cardClass: 'border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-cyan-600/20',
                overlayClass: 'from-cyan-500/10 to-blue-500/10',
                iconClass: 'gradient-cyan',
                titleClass: 'group-hover:text-cyan-300',
                tagClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
              },
            ].map((tech) => (
              <div key={tech.title} className={`group relative overflow-hidden rounded-2xl border bg-gray-800/50 backdrop-blur-xl p-6 transition-all duration-[900ms] hover:shadow-lg opacity-0 translate-y-8 js-stagger-item ${tech.cardClass}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.overlayClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-lg mb-4 ${tech.iconClass}`}><span>{tech.icon}</span></div>
                  <h3 className={`text-xl font-bold mb-4 text-white transition-colors ${tech.titleClass}`}>{tech.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {tech.skills.map((skill) => (
                      <span key={skill} className={`px-3 py-1 rounded-full text-sm font-medium border ${tech.tagClass}`}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-16 transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] opacity-0 translate-y-8 js-heading-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 hover:text-blue-400 transition-colors duration-300">Why Hire Me</h2>
            <p className="text-xl text-gray-400">A unique blend of military discipline and cloud expertise</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 js-stagger-group">
            {WHY_HIRE_ME_ITEMS.map((reason) => {
              const styles = WHY_HIRE_ME_VARIANT_STYLES[reason.variant];
              return (
                <div
                  key={reason.title}
                  className={`group relative overflow-hidden border bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 transition-all duration-[900ms] hover:shadow-lg opacity-0 translate-y-8 js-stagger-item ${styles.cardClass}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${styles.overlayClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative">
                    <div className={`mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg transition-colors ${styles.iconBgClass}`}>
                      <span className="text-2xl">{reason.emoji}</span>
                    </div>
                    <h3 className={`text-lg font-bold mb-3 text-white transition-colors ${styles.titleClass}`}>{reason.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{reason.description}</p>
                    <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${styles.lineClass} group-hover:w-full transition-all duration-300`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="max-w-4xl mx-auto mb-20 text-center transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] opacity-0 translate-y-8 js-heading-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 hover:text-blue-400 transition-colors duration-300">Career Development</h2>
            <p className="text-xl text-gray-400">From web development to cloud architecture</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 opacity-30"></div>
            <div className="space-y-4">
              {[
                {
                  year: '2016',
                  role: 'Apprentice Web Developer',
                  company: 'Cedrec',
                  summary: 'Started apprenticeship in software development. Built full-stack web applications using Laravel, PHP, and MySQL. Created event booking systems, blogs, and inventory tracking solutions.',
                  dotClass: 'border-blue-500 bg-gray-900 shadow-blue-500/50',
                  cardClass: 'border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-600/20 bg-gray-800/50',
                  yearClass: 'text-blue-400',
                  companyClass: 'text-blue-400',
                },
                {
                  year: '2017',
                  role: 'Software Development Level 3',
                  company: 'Certification',
                  summary: 'Completed apprenticeship and earned Microsoft Technical Associate certification. Proficient in full-stack web development.',
                  dotClass: 'border-cyan-500 bg-cyan-500 shadow-cyan-500/50',
                  cardClass: 'border-cyan-500/50 hover:border-cyan-500/80 hover:shadow-cyan-600/20 bg-cyan-500/5',
                  yearClass: 'text-cyan-400',
                  companyClass: 'text-cyan-400',
                },
                {
                  year: '2018',
                  role: 'Network Engineer',
                  company: 'British Army - Royal Signals',
                  summary: 'Completed specialist training course. Managed LANs, WANs, SATCOM, and military radio systems. Led team of soldiers deploying secure global communication networks.',
                  dotClass: 'border-purple-500 bg-gray-900 shadow-purple-500/50',
                  cardClass: 'border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-600/20 bg-gray-800/50',
                  yearClass: 'text-purple-400',
                  companyClass: 'text-purple-400',
                },
                {
                  year: '2018-2023',
                  role: 'Senior Network Engineer',
                  company: 'British Army',
                  summary: 'Provided IT infrastructure for 400+ staff globally. Designed IPv4/IPv6 networks, configured Cisco routers, completed CCNA training. Deployed to Estonia for NATO exercises.',
                  dotClass: 'border-blue-500 bg-gray-900 shadow-blue-500/50',
                  cardClass: 'border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-600/20 bg-gray-800/50',
                  yearClass: 'text-blue-400',
                  companyClass: 'text-blue-400',
                },
                {
                  year: '2024',
                  role: 'Rope Access Technician',
                  company: 'Nordic Access',
                  summary: 'Contract work on wind turbine blade repair. Developed practical problem-solving skills in high-pressure environments.',
                  dotClass: 'border-green-500 bg-gray-900 shadow-green-500/50',
                  cardClass: 'border-green-500/20 hover:border-green-500/50 hover:shadow-green-600/20 bg-gray-800/50',
                  yearClass: 'text-green-400',
                  companyClass: 'text-green-400',
                },
                {
                  year: '2025',
                  role: 'AWS Cloud Solutions Architect',
                  company: 'In Progress',
                  summary: 'Transitioning back to IT with focus on AWS Cloud Architecture. Pursuing AWS Solutions Architect Associate certification. Building cloud-native solutions.',
                  dotClass: 'border-cyan-500 bg-cyan-500 shadow-cyan-500/50',
                  cardClass: 'border-cyan-500/50 hover:border-cyan-500/80 hover:shadow-cyan-600/20 bg-cyan-500/5',
                  yearClass: 'text-cyan-400',
                  companyClass: 'text-cyan-400',
                },
              ].map((item, index) => (
                <div
                  key={item.role}
                  data-timeline-index={index}
                  className="relative js-reveal-self transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] opacity-0 translate-y-8"
                >
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    {index % 2 === 0 ? (
                      <>
                        <div className="hidden md:block md:w-1/2 text-right pr-2">
                          <div className={`group relative overflow-hidden rounded-xl border backdrop-blur-xl p-6 transition-all duration-[900ms] hover:shadow-lg ${item.cardClass}`}>
                            <div className="flex items-start justify-between mb-2">
                              <span className={`font-bold text-lg ${item.yearClass}`}>{item.year}</span>
                              <h3 className="text-2xl font-bold text-white">{item.role}</h3>
                            </div>
                            <p className={`font-semibold mb-3 ${item.companyClass}`}>{item.company}</p>
                            <p className="text-gray-400 mb-4">{item.summary}</p>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <div className={`w-6 h-6 rounded-full border-4 shadow-lg z-10 flex-shrink-0 ${item.dotClass}`}></div>
                        </div>

                        <div className="hidden md:block md:w-1/2 md:pl-2"></div>

                        <div className="w-full md:w-1/2 md:hidden">
                          <div className={`group relative overflow-hidden rounded-xl border backdrop-blur-xl p-6 transition-all duration-[900ms] hover:shadow-lg ${item.cardClass}`}>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-2xl font-bold text-white">{item.role}</h3>
                              <span className={`font-bold text-lg ${item.yearClass}`}>{item.year}</span>
                            </div>
                            <p className={`font-semibold mb-3 ${item.companyClass}`}>{item.company}</p>
                            <p className="text-gray-400 mb-4">{item.summary}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="hidden md:block md:w-1/2"></div>

                        <div className="flex justify-center">
                          <div className={`w-6 h-6 rounded-full border-4 shadow-lg z-10 flex-shrink-0 ${item.dotClass}`}></div>
                        </div>

                        <div className="w-full md:w-1/2 md:pl-2">
                          <div className={`group relative overflow-hidden rounded-xl border backdrop-blur-xl p-6 transition-all duration-[900ms] hover:shadow-lg ${item.cardClass}`}>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-2xl font-bold text-white">{item.role}</h3>
                              <span className={`font-bold text-lg ${item.yearClass}`}>{item.year}</span>
                            </div>
                            <p className={`font-semibold mb-3 ${item.companyClass}`}>{item.company}</p>
                            <p className="text-gray-400 mb-4">{item.summary}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto mb-20 text-center transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] opacity-0 translate-y-8 js-heading-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 hover:text-blue-400 transition-colors duration-300">Featured Projects</h2>
            <p className="text-xl text-gray-400">Real-world solutions that deliver impact</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto js-stagger-group">
            {FEATURED_PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`group relative block overflow-hidden border bg-gray-800/50 backdrop-blur-sm rounded-2xl transition-all duration-[900ms] hover:shadow-lg hover:ring-2 hover:ring-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 opacity-0 translate-y-8 js-stagger-item ${project.cardClass}`}
                aria-label={`View project: ${project.title}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.overlayClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative p-6">
                  <div className={`mb-4 inline-block p-3 rounded-lg transition-colors ${project.iconClass}`}>
                    <span className="text-2xl">{project.icon}</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 text-white transition-colors ${project.titleClass}`}>{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.shortDesc}</p>
                  <span className="inline-flex items-center text-sm font-medium text-blue-400 group-hover:text-cyan-400 transition-colors">
                    View project
                    <span className="ml-1 group-hover:translate-x-0.5 transition-transform" aria-hidden>
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gray-900 overflow-hidden">
        <div className="container mx-auto max-w-3xl relative z-10">
          <div className="text-center mb-12 transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] opacity-0 translate-y-8 js-heading-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 hover:text-blue-400 transition-colors duration-300">Let's Work Together</h2>
            <p className="text-xl text-gray-400">Ready to build something amazing? Get in touch.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center js-stagger-group">
            {[
              { icon: '✉️', title: 'Email', text: 'luke@luketaylor.de', href: 'mailto:luke@luketaylor.de' },
              {
                icon: '🔗',
                title: 'LinkedIn',
                text: 'Connect with me',
                href: 'https://www.linkedin.com/in/luke-taylor-6355a53aa/',
              },
              {
                icon: '🐙',
                title: 'GitHub',
                text: 'View my repositories',
                href: 'https://github.com/Luketaylor11-dot',
              },
            ].map((contact) => (
              <a
                key={contact.title}
                href={contact.href}
                {...(contact.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="group p-6 rounded-2xl border border-blue-500/20 bg-gray-800/50 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all duration-[900ms] opacity-0 translate-y-8 js-stagger-item"
              >
                <span className="text-4xl mb-4 block">{contact.icon}</span>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">{contact.title}</h3>
                <p className="text-gray-400 text-sm">{contact.text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      </div>
    </div>
  );
}
