import { Cloud, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663399913629/RpYRqPmtR85bMvP4PX2aEA/bg-cloud-infrastructure-AGcVd2cpsE4PzdkN8Pa2T4.webp)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Content */}
          <div className="animate-float-up">
            <div className="mb-8 animate-bounce-in">
              <div className="inline-block px-4 py-2 border border-blue-500/50 rounded-full mb-6 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                <span className="text-sm font-semibold text-blue-400">AWS Cloud Solutions Architect</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up text-white">
              Securing the Cloud
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
              6 years of high-pressure technical expertise. Transitioning from military network engineering to cloud architecture with a focus on security, automation, and scalable solutions.
            </p>
            
            {/* Tech Stack Icons */}
            <div className="flex gap-4 mb-8 flex-wrap animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 hover:scale-110 animate-float" style={{ animationDelay: '0s' }}>☁️</div>
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-2xl shadow-lg shadow-red-500/50 hover:shadow-red-500/70 transition-all duration-300 hover:scale-110 animate-float" style={{ animationDelay: '0.1s' }}>🔴</div>
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 hover:scale-110 animate-float" style={{ animationDelay: '0.2s' }}>⚛️</div>
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 hover:scale-110 animate-float" style={{ animationDelay: '0.3s' }}>🐍</div>
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-2xl shadow-lg shadow-red-600/50 hover:shadow-red-600/70 transition-all duration-300 hover:scale-110 animate-float" style={{ animationDelay: '0.4s' }}>🔴</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/50 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                <Cloud className="w-5 h-5 mr-2" />
                View My Work
              </Button>
              <Button variant="outline" className="border-blue-500/50 hover:border-blue-500 text-white px-8 py-6 text-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30 animate-bounce-in" style={{ animationDelay: '0.3s' }}>
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </div>
          </div>

          {/* Right Side - Animated Metrics */}
          <div className="hidden lg:flex items-center justify-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-2xl border border-blue-500/30 backdrop-blur-sm p-8 flex flex-col items-center justify-center gap-8 group hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300">
              {/* Metric 1 */}
              <div className="text-center animate-bounce-in" style={{ animationDelay: '0.3s' }}>
                <div className="text-5xl font-bold text-blue-400 mb-2 animate-pulse-count">6<span className="text-3xl">+</span></div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </div>
              
              {/* Metric 2 */}
              <div className="text-center animate-bounce-in" style={{ animationDelay: '0.4s' }}>
                <div className="text-5xl font-bold text-cyan-400 mb-2 animate-pulse-count">15<span className="text-3xl">+</span></div>
                <div className="text-gray-300 text-sm">Projects Completed</div>
              </div>
              
              {/* Metric 3 */}
              <div className="text-center animate-bounce-in" style={{ animationDelay: '0.5s' }}>
                <div className="text-5xl font-bold text-blue-300 mb-2 animate-pulse-count">3</div>
                <div className="text-gray-300 text-sm">AWS Certifications</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
