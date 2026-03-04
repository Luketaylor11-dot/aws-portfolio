import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Resources', href: '/resources' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-primary/20 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer animate-float-up">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-primary/70 transition-all duration-300 group-hover:scale-110 transform">
              <span className="text-white font-bold">LT</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:animate-shimmer">
              Luke Taylor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground/70 hover:text-primary transition-colors duration-200 font-medium relative group animate-float-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4 animate-float-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="outline" size="sm" className="gap-2 hover:scale-110 transform transition-all duration-300" asChild>
              <a href="/resume.pdf" download>
                <Download className="w-4 h-4" />
                CV
              </a>
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:shadow-primary/70 transition-all duration-300 hover:scale-110 transform">
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-card transition-colors hover:scale-110 transform duration-300"
          >
            {isOpen ? <X className="w-6 h-6 animate-rotate-in" /> : <Menu className="w-6 h-6 animate-rotate-in" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 rounded-lg text-foreground/70 hover:bg-card hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border/30 space-y-2">
                <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                  <a href="/resume.pdf" download>
                    <Download className="w-4 h-4" />
                    Download CV
                  </a>
                </Button>
                <Button size="sm" className="w-full bg-gradient-to-r from-primary to-secondary">
                  Contact
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
