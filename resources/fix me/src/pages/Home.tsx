import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Github, Linkedin, Mail, Shield, Zap, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TechStack from '@/components/TechStack';
import Timeline from '@/components/Timeline';
import ProjectVault from '@/components/ProjectVault';
import ContactForm from '@/components/ContactForm';
import WhyHireMe from '@/components/WhyHireMe';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const techRef = useScrollAnimation();
  const whyRef = useScrollAnimation();
  const timelineRef = useScrollAnimation();
  const projectsRef = useScrollAnimation();
  const contactRef = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <HeroSection />

      {/* TECH STACK SECTION - Timeline Flow */}
      <section ref={techRef.ref} className={`relative py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-900 ${techRef.isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 hover:text-blue-400 transition-colors duration-300">Tech Arsenal</h2>
            <p className="text-xl text-gray-400">Proficient in cloud, network, and web technologies</p>
          </div>
          <TechStack />
        </div>
      </section>

      {/* WHY HIRE ME - Alternating Layout */}
      <section ref={whyRef.ref} className={`relative py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-900 ${whyRef.isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2 text-center lg:text-left">
              <h2 className="text-5xl md:text-6xl font-bold mb-8 hover:text-blue-400 transition-colors duration-300">Why Hire Me</h2>
              <p className="text-lg text-gray-400 mb-8">A unique blend of military discipline and cloud expertise</p>
              <WhyHireMe />
            </div>
            <div className="lg:order-1">
              <div className="relative h-96 bg-gray-900/50 rounded-2xl border border-gray-800 flex items-center justify-center group hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300">
                <Shield className="w-32 h-32 text-blue-500/20 group-hover:text-blue-500/40 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION - Vertical Flow */}
      <section ref={timelineRef.ref} className={`relative py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-900 ${timelineRef.isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 hover:text-blue-400 transition-colors duration-300">Military to Tech</h2>
            <p className="text-xl text-gray-400">6 years of technical progression</p>
          </div>
          <Timeline />
        </div>
      </section>

      {/* PROJECTS SECTION - Split Grid */}
      <section ref={projectsRef.ref} className={`relative py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-900 ${projectsRef.isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 hover:text-blue-400 transition-colors duration-300">Cloud Project Vault</h2>
            <p className="text-xl text-gray-400">AWS architecture and cloud solutions</p>
          </div>
          <ProjectVault />
        </div>
      </section>

      {/* CONTACT SECTION - Constrained Width */}
      <section ref={contactRef.ref} className={`relative py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-900 ${contactRef.isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <div className="container mx-auto max-w-2xl">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 hover:text-blue-400 transition-colors duration-300">Get In Touch</h2>
            <p className="text-xl text-gray-400">Ready to discuss your next project or opportunity</p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Luke Taylor</h3>
              <p className="text-gray-400">AWS Cloud Solutions Architect</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link>
                <Link href="/projects" className="text-gray-400 hover:text-blue-400 transition-colors">Projects</Link>
                <Link href="/resources" className="text-gray-400 hover:text-blue-400 transition-colors">Resources</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Luke Taylor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
