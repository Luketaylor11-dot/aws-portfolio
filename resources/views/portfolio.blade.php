<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Luke Taylor - AWS Cloud Solutions Architect</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#3b82f6',
                        secondary: '#0ea5e9'
                    },
                    fontFamily: {
                        'outfit': ['Outfit', 'sans-serif'],
                        'poppins': ['Poppins', 'sans-serif'],
                    },
                    animation: {
                        'float-up': 'floatUp 3s ease-in-out infinite',
                        'slide-up': 'slideUp 0.8s ease-out forwards',
                        'bounce-in': 'bounceIn 0.6s ease-out forwards',
                        'scale-in': 'scaleIn 0.6s ease-out forwards',
                        'shimmer': 'shimmer 2s infinite',
                    },
                    keyframes: {
                        floatUp: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-10px)' },
                        },
                        slideUp: {
                            'from': { opacity: '0', transform: 'translateY(30px)' },
                            'to': { opacity: '1', transform: 'translateY(0)' },
                        },
                        bounceIn: {
                            'from': { opacity: '0', transform: 'scale(0.95)' },
                            'to': { opacity: '1', transform: 'scale(1)' },
                        },
                        scaleIn: {
                            'from': { opacity: '0', transform: 'scale(0.8)' },
                            'to': { opacity: '1', transform: 'scale(1)' },
                        },
                        shimmer: {
                            '0%, 100%': { opacity: '1' },
                            '50%': { opacity: '0.5' },
                        }
                    }
                }
            }
        }
    </script>
    <script>
        // Run parallax and reveal logic after DOM is ready
        window.addEventListener('DOMContentLoaded', function() {
            // Parallax for hero background
            (function() {
                const bg = document.getElementById('hero-bg');
                if (!bg) return;
                // stronger parallax multiplier on desktop, disabled on small screens
                const multiplier = window.innerWidth < 768 ? 0 : 0.35;
                let latestScroll = 0;
                let ticking = false;

                function update() {
                    bg.style.transform = `translateY(${latestScroll * multiplier}px)`;
                    ticking = false;
                }

                window.addEventListener('scroll', () => {
                    latestScroll = window.scrollY;
                    if (!ticking) {
                        window.requestAnimationFrame(update);
                        ticking = true;
                    }
                }, { passive: true });
            })();

            // Staggered reveal for sections
            (function() {
                const revealContainers = document.querySelectorAll('.reveal-on-scroll .reveal');
                if (!('IntersectionObserver' in window)) {
                    // Fallback: reveal immediately
                    revealContainers.forEach(c => c.classList.add('revealed'));
                    return;
                }

                const io = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (!entry.isIntersecting) return;
                        const container = entry.target;
                        container.classList.add('revealed');
                        // stagger children
                        const children = Array.from(container.children);
                        children.forEach((child, i) => {
                            child.style.transitionDelay = `${i * 80}ms`;
                            child.style.transitionProperty = 'opacity, transform';
                            child.style.transitionDuration = '600ms';
                            child.style.transitionTimingFunction = 'cubic-bezier(.2,.9,.2,1)';
                            // ensure visible
                            child.style.opacity = '';
                            child.style.transform = '';
                        });
                        obs.unobserve(container);
                    });
                }, { threshold: 0.12 });

                revealContainers.forEach(c => io.observe(c));
            })();
        });
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Outfit', sans-serif; letter-spacing: 0.3px; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Poppins', sans-serif; font-weight: 700; letter-spacing: -0.5px; }
        .gradient-purple { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .gradient-blue { background: linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%); }
        .gradient-orange { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); }
        .gradient-red { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
        .gradient-cyan { background: linear-gradient(135deg, #06b6d4 0%, #0284c7 100%); }
        .gradient-green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
        .shadow-glow { box-shadow: 0 0 30px rgba(59, 130, 246, 0.3); }

        /* Reveal / Staggered section styles */
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 700ms cubic-bezier(.2,.9,.2,1), transform 700ms cubic-bezier(.2,.9,.2,1); }
        .reveal.revealed { opacity: 1; transform: none; }
        .reveal > * { opacity: 0; transform: translateY(18px); }
        .reveal.revealed > * { opacity: 1; transform: none; }
        #hero-bg { will-change: transform; }
    </style>
</head>
<body class="bg-gray-900 text-white overflow-x-hidden">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="navbar">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 md:h-20">
                <!-- Logo -->
                <a href="#" class="flex items-center gap-2 group">
                    <div class="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300 hover:scale-110 transform">
                        <span class="text-white font-bold">LT</span>
                    </div>
                    <span class="hidden sm:inline font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:opacity-80 transition-opacity">
                        Luke Taylor
                    </span>
                </a>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center gap-8">
                    <a href="#" class="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium relative group">
                        Home
                        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                    <a href="#projects" class="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium relative group" style="animation-delay: 0.1s">
                        Projects
                        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                    <a href="#skills" class="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium relative group" style="animation-delay: 0.2s">
                        Skills
                        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                </div>

                <!-- Desktop CTA -->
                <div class="hidden md:flex items-center gap-4" style="animation-delay: 0.4s">
                    <a href="/resume.pdf" download class="px-4 py-2 border border-blue-500/50 rounded-lg hover:border-blue-500 text-white hover:bg-blue-500/10 transition-all duration-300 hover:scale-110 transform text-sm font-medium">
                        ↓ CV
                    </a>
                    <button class="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-glow transition-all duration-300 hover:scale-110 transform text-sm font-medium">
                        Contact
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <!-- Background -->
        <div class="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black opacity-80"></div>
        <div id="hero-bg" class="absolute inset-0 bg-[url('https://d2xsxph8kpxj0f.cloudfront.net/310519663399913629/RpYRqPmtR85bMvP4PX2aEA/bg-cloud-infrastructure-AGcVd2cpsE4PzdkN8Pa2T4.webp')] bg-cover bg-center opacity-30" style="will-change: transform;"></div>

        <!-- Content -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <!-- Left Side -->
                <div>
                    <div class="mb-8">
                        <div class="inline-block px-4 py-2 border border-blue-500/50 rounded-full mb-6 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                            <span class="text-sm font-semibold text-blue-400">AWS Cloud Solutions Architect</span>
                        </div>
                    </div>
                    <h1 class="text-6xl md:text-7xl font-bold mb-6 leading-tight text-white animate-slide-up animate-float-up">
                        Securing the Cloud
                    </h1>
                    <p class="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl animate-slide-up animate-float-up" style="animation-delay: 0.1s">
                        6 years of high-pressure technical expertise. Transitioning from military network engineering to cloud architecture with a focus on security, automation, and scalable solutions.
                    </p>
                    
                    <!-- Tech Icons -->
                    <div class="flex gap-4 mb-8 flex-wrap animate-slide-up animate-float-up" style="animation-delay: 0.2s">
                        <div class="w-14 h-14 rounded-lg gradient-orange flex items-center justify-center text-2xl shadow-lg hover:shadow-orange-500/70 transition-all duration-300 hover:scale-110">☁️</div>
                        <div class="w-14 h-14 rounded-lg gradient-red flex items-center justify-center text-2xl shadow-lg hover:shadow-red-500/70 transition-all duration-300 hover:scale-110">🔐</div>
                        <div class="w-14 h-14 rounded-lg gradient-cyan flex items-center justify-center text-2xl shadow-lg hover:shadow-cyan-500/70 transition-all duration-300 hover:scale-110">⚛️</div>
                        <div class="w-14 h-14 rounded-lg gradient-blue flex items-center justify-center text-2xl shadow-lg hover:shadow-blue-500/70 transition-all duration-300 hover:scale-110">🐍</div>
                        <div class="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-2xl shadow-lg hover:shadow-purple-600/70 transition-all duration-300 hover:scale-110">🔗</div>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row gap-4 animate-float-up">
                        <a href="#projects" class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-glow">
                            📊 View My Work
                        </a>
                        <a href="/resume.pdf" download class="inline-flex items-center justify-center border border-blue-500/50 hover:border-blue-500 text-white px-8 py-6 text-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30">
                            ⬇️ Download CV
                        </a>
                    </div>
                </div>

                <!-- Right Side - Metrics -->
                <div class="hidden lg:flex items-center justify-center animate-scale-in" style="animation-delay: 0.2s">
                    <div class="relative w-full h-96 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-2xl border border-blue-500/30 p-8 flex flex-col items-center justify-center gap-8 group hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300">
                        <div class="text-center" style="animation: bounceIn 0.6s ease-out forwards; animation-delay: 0.3s">
                            <div class="text-5xl font-bold text-blue-400 mb-2">6<span class="text-3xl">+</span></div>
                            <div class="text-gray-300 text-sm">Years Experience</div>
                        </div>
                        
                        <div class="text-center" style="animation: bounceIn 0.6s ease-out forwards; animation-delay: 0.4s">
                            <div class="text-5xl font-bold text-cyan-400 mb-2">15<span class="text-3xl">+</span></div>
                            <div class="text-gray-300 text-sm">Projects Completed</div>
                        </div>
                        
                        <div class="text-center" style="animation: bounceIn 0.6s ease-out forwards; animation-delay: 0.5s">
                            <div class="text-5xl font-bold text-blue-300 mb-2">3</div>
                            <div class="text-gray-300 text-sm">AWS Certifications</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Tech Stack Section -->
    <section id="skills" class="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-900 reveal-on-scroll">
        <div class="container mx-auto reveal">
            <div class="max-w-4xl mx-auto mb-20 text-center">
                <h2 class="text-5xl md:text-6xl font-bold mb-6 hover:text-blue-400 transition-colors duration-300">Tech Arsenal</h2>
                <p class="text-xl text-gray-400">Proficient in cloud, network, and web technologies</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <!-- Cloud & Infrastructure -->
                <div class="group relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gray-800/50 backdrop-blur-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="relative z-10">
                        <div class="inline-flex p-3 rounded-lg gradient-orange mb-4">
                            <span>☁️</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">Cloud & Infrastructure</h3>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-sm font-medium border border-blue-500/20">AWS (SAA)</span>
                            <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-sm font-medium border border-blue-500/20">VPC</span>
                            <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-sm font-medium border border-blue-500/20">EC2</span>
                            <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-sm font-medium border border-blue-500/20">S3</span>
                            <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-sm font-medium border border-blue-500/20">Lambda</span>
                        </div>
                    </div>
                </div>

                <!-- Security & Networking -->
                <div class="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gray-800/50 backdrop-blur-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/20">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="relative z-10">
                        <div class="inline-flex p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
                            <span>🔐</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">Security & Networking</h3>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm font-medium border border-purple-500/20">Cisco IOS</span>
                            <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm font-medium border border-purple-500/20">IPv4/IPv6</span>
                            <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm font-medium border border-purple-500/20">Active Directory</span>
                            <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm font-medium border border-purple-500/20">Security</span>
                            <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm font-medium border border-purple-500/20">Firewalls</span>
                        </div>
                    </div>
                </div>

                <!-- Backend Development -->
                <div class="group relative overflow-hidden rounded-2xl border border-green-500/20 bg-gray-800/50 backdrop-blur-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/20">
                    <div class="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="relative z-10">
                        <div class="inline-flex p-3 rounded-lg gradient-green mb-4">
                            <span>💻</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4 text-white group-hover:text-green-300 transition-colors">Backend Development</h3>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-sm font-medium border border-green-500/20">Laravel</span>
                            <span class="px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-sm font-medium border border-green-500/20">PHP</span>
                            <span class="px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-sm font-medium border border-green-500/20">Node.js</span>
                            <span class="px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-sm font-medium border border-green-500/20">Express</span>
                            <span class="px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-sm font-medium border border-green-500/20">REST APIs</span>
                        </div>
                    </div>
                </div>

                <!-- Frontend Development -->
                <div class="group relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gray-800/50 backdrop-blur-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-600/20">
                    <div class="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="relative z-10">
                        <div class="inline-flex p-3 rounded-lg gradient-orange mb-4">
                            <span>⚡</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4 text-white group-hover:text-orange-300 transition-colors">Frontend Development</h3>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-sm font-medium border border-orange-500/20">React</span>
                            <span class="px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-sm font-medium border border-orange-500/20">Vue.js</span>
                            <span class="px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-sm font-medium border border-orange-500/20">Inertia JS</span>
                            <span class="px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-sm font-medium border border-orange-500/20">Tailwind</span>
                            <span class="px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-sm font-medium border border-orange-500/20">TypeScript</span>
                        </div>
                    </div>
                </div>

                <!-- Databases & Tools -->
                <div class="group relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gray-800/50 backdrop-blur-xl p-6 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-600/20">
                    <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="relative z-10">
                        <div class="inline-flex p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 mb-4">
                            <span>💾</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors">Databases & Tools</h3>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20">MySQL</span>
                            <span class="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20">Git</span>
                            <span class="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20">Docker</span>
                            <span class="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20">Linux</span>
                            <span class="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20">Automation</span>
                        </div>
                    </div>
                </div>

                <!-- Programming Languages -->
                <div class="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gray-800/50 backdrop-blur-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-600/20">
                    <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="relative z-10">
                        <div class="inline-flex p-3 rounded-lg gradient-cyan mb-4">
                            <span>🔤</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors">Programming Languages</h3>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-sm font-medium border border-cyan-500/20">Python</span>
                            <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-sm font-medium border border-cyan-500/20">JavaScript</span>
                            <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-sm font-medium border border-cyan-500/20">PHP</span>
                            <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-sm font-medium border border-cyan-500/20">Bash</span>
                            <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-sm font-medium border border-cyan-500/20">SQL</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Hire Me Section -->
    <section class="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-900 reveal-on-scroll">
        <div class="container mx-auto reveal">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-5xl md:text-6xl font-bold mb-8 hover:text-blue-400 transition-colors duration-300 text-center">Why Hire Me</h2>
                <p class="text-xl text-gray-400 text-center mb-16">A unique blend of military discipline and cloud expertise</p>

                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Card 1 -->
                    <div class="group relative overflow-hidden border border-blue-500/20 bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20">
                        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="relative">
                            <div class="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                <span class="text-2xl">🏅</span>
                            </div>
                            <h3 class="text-lg font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">Military Discipline Meets Tech Excellence</h3>
                            <p class="text-gray-400 text-sm leading-relaxed">My 6 years in the Army taught me precision, reliability, and how to perform under pressure. I bring that same rigor to cloud architecture and infrastructure design.</p>
                            <div class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </div>

                    <!-- Card 2 -->
                    <div class="group relative overflow-hidden border border-purple-500/20 bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/20">
                        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="relative">
                            <div class="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                                <span class="text-2xl">🔒</span>
                            </div>
                            <h3 class="text-lg font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">Security-First Mindset</h3>
                            <p class="text-gray-400 text-sm leading-relaxed">From network security in the military to cloud security in AWS, I understand the importance of protecting critical infrastructure and data at every layer.</p>
                            <div class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </div>

                    <!-- Card 3 -->
                    <div class="group relative overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-600/20">
                        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="relative">
                            <div class="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                                <span class="text-2xl">🤝</span>
                            </div>
                            <h3 class="text-lg font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">Bridge Between Teams</h3>
                            <p class="text-gray-400 text-sm leading-relaxed">I speak both languages: military operations and cloud technology. I can translate complex technical concepts for stakeholders and lead cross-functional teams effectively.</p>
                            <div class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </div>

                    <!-- Card 4 -->
                    <div class="group relative overflow-hidden border border-green-500/20 bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/20">
                        <div class="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div class="relative">
                            <div class="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                                <span class="text-2xl">📈</span>
                            </div>
                            <h3 class="text-lg font-bold mb-3 text-white group-hover:text-green-400 transition-colors">Proven Problem Solver</h3>
                            <p class="text-gray-400 text-sm leading-relaxed">Whether managing network infrastructure for 1000+ users or architecting cloud solutions, I deliver scalable, cost-effective solutions that exceed expectations.</p>
                            <div class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Career Timeline Section -->
    <section class="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-900 reveal-on-scroll">
        <div class="container mx-auto max-w-5xl reveal">
            <div class="max-w-4xl mx-auto mb-20 text-center">
                <h2 class="text-5xl md:text-6xl font-bold mb-6 hover:text-blue-400 transition-colors duration-300">Career Development</h2>
                <p class="text-xl text-gray-400">From web development to cloud architecture</p>
            </div>

            <!-- Timeline -->
            <div class="relative">
                <!-- Vertical Line -->
                <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 opacity-30"></div>

                <div class="space-y-12">
                    <!-- 2016 - Apprentice -->
                    <div class="relative md:pr-1/2">
                        <div class="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div class="hidden md:block md:w-1/2 text-right pr-12">
                                <div class="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-gray-800/50 backdrop-blur-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20">
                                    <h3 class="text-2xl font-bold text-white mb-2">Apprentice Web Developer</h3>
                                    <p class="text-blue-400 font-semibold mb-3">Cedrec</p>
                                    <p class="text-gray-400 mb-4">Started apprenticeship in software development. Built full-stack web applications using Laravel, PHP, and MySQL. Created event booking systems, blogs, and inventory tracking solutions.</p>
                                    <div class="flex flex-wrap gap-2 justify-end">
                                        <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">Laravel</span>
                                        <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">PHP</span>
                                        <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">MySQL</span>
                                        <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">JavaScript</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-center">
                                <div class="w-6 h-6 rounded-full border-4 border-blue-500 bg-gray-900 shadow-lg shadow-blue-500/50 z-10 flex-shrink-0"></div>
                            </div>
                            <div class="w-full md:w-1/2 md:hidden">
                                <div class="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-gray-800/50 backdrop-blur-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20">
                                    <div class="flex items-start justify-between mb-2">
                                        <h3 class="text-2xl font-bold text-white">Apprentice Web Developer</h3>
                                        <span class="text-blue-400 font-bold text-lg">2016</span>
                                    </div>
                                    <p class="text-blue-400 font-semibold mb-3">Cedrec</p>
                                    <p class="text-gray-400 mb-4">Started apprenticeship in software development. Built full-stack web applications using Laravel, PHP, and MySQL.</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">Laravel</span>
                                        <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">PHP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2017 - Certification -->
                    <div class="relative md:pl-1/2">
                        <div class="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div class="flex justify-center">
                                <div class="w-6 h-6 rounded-full border-4 border-cyan-500 bg-cyan-500 shadow-lg shadow-cyan-500/50 z-10 flex-shrink-0"></div>
                            </div>
                            <div class="w-full md:w-1/2 md:pl-12">
                                <div class="group relative overflow-hidden rounded-xl border border-cyan-500/50 bg-cyan-500/5 backdrop-blur-xl p-6 hover:border-cyan-500/80 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-600/20">
                                    <div class="flex items-start justify-between mb-2">
                                        <h3 class="text-2xl font-bold text-white">Software Development Level 3</h3>
                                        <span class="text-cyan-400 font-bold text-lg">2017</span>
                                    </div>
                                    <p class="text-cyan-400 font-semibold mb-3">Certification</p>
                                    <p class="text-gray-400 mb-4">Completed apprenticeship and earned Microsoft Technical Associate certification. Proficient in full-stack web development.</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-medium border border-cyan-500/20">Full-Stack</span>
                                        <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-medium border border-cyan-500/20">Web Architecture</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2018 - Network Engineer -->
                    <div class="relative md:pr-1/2">
                        <div class="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div class="hidden md:block md:w-1/2 text-right pr-12">
                                <div class="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-gray-800/50 backdrop-blur-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/20">
                                    <h3 class="text-2xl font-bold text-white mb-2">Network Engineer</h3>
                                    <p class="text-purple-400 font-semibold mb-3">British Army - Royal Signals</p>
                                    <p class="text-gray-400 mb-4">Completed specialist training course. Managed LANs, WANs, SATCOM, and military radio systems. Led team of soldiers deploying secure global communication networks.</p>
                                    <div class="flex flex-wrap gap-2 justify-end">
                                        <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-medium border border-purple-500/20">Cisco IOS</span>
                                        <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-medium border border-purple-500/20">Active Directory</span>
                                        <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-medium border border-purple-500/20">Leadership</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-center">
                                <div class="w-6 h-6 rounded-full border-4 border-purple-500 bg-gray-900 shadow-lg shadow-purple-500/50 z-10 flex-shrink-0"></div>
                            </div>
                            <div class="w-full md:w-1/2 md:hidden">
                                <div class="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-gray-800/50 backdrop-blur-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/20">
                                    <div class="flex items-start justify-between mb-2">
                                        <h3 class="text-2xl font-bold text-white">Network Engineer</h3>
                                        <span class="text-purple-400 font-bold text-lg">2018</span>
                                    </div>
                                    <p class="text-purple-400 font-semibold mb-3">British Army - Royal Signals</p>
                                    <p class="text-gray-400 mb-4">Completed specialist training course. Managed LANs, WANs, SATCOM, and military radio systems.</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-medium border border-purple-500/20">Cisco IOS</span>
                                        <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-medium border border-purple-500/20">Leadership</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2018-2023 - Senior Network Engineer -->
                    <div class="relative md:pl-1/2">
                        <div class="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div class="flex justify-center">
                                <div class="w-6 h-6 rounded-full border-4 border-blue-500 bg-gray-900 shadow-lg shadow-blue-500/50 z-10 flex-shrink-0"></div>
                            </div>
                            <div class="w-full md:w-1/2 md:pl-12">
                                <div class="group relative overflow-hidden rounded-xl border border-blue-500/20 bg-gray-800/50 backdrop-blur-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20">
                                    <div class="flex items-start justify-between mb-2">
                                        <h3 class="text-2xl font-bold text-white">Senior Network Engineer</h3>
                                        <span class="text-blue-400 font-bold text-lg">2018-2023</span>
                                    </div>
                                    <p class="text-blue-400 font-semibold mb-3">British Army</p>
                                    <p class="text-gray-400 mb-4">Provided IT infrastructure for 400+ staff globally. Designed IPv4/IPv6 networks, configured Cisco routers, completed CCNA training. Deployed to Estonia for NATO exercises.</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">CCNA</span>
                                        <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">IPv4/IPv6</span>
                                        <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">Network Security</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2024 - Rope Access Technician -->
                    <div class="relative md:pr-1/2">
                        <div class="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div class="hidden md:block md:w-1/2 text-right pr-12">
                                <div class="group relative overflow-hidden rounded-xl border border-green-500/20 bg-gray-800/50 backdrop-blur-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/20">
                                    <h3 class="text-2xl font-bold text-white mb-2">Rope Access Technician</h3>
                                    <p class="text-green-400 font-semibold mb-3">Nordic Access</p>
                                    <p class="text-gray-400 mb-4">Contract work on wind turbine blade repair. Developed practical problem-solving skills in high-pressure environments.</p>
                                    <div class="flex flex-wrap gap-2 justify-end">
                                        <span class="px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-xs font-medium border border-green-500/20">Problem-Solving</span>
                                        <span class="px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-xs font-medium border border-green-500/20">Safety</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-center">
                                <div class="w-6 h-6 rounded-full border-4 border-green-500 bg-gray-900 shadow-lg shadow-green-500/50 z-10 flex-shrink-0"></div>
                            </div>
                            <div class="w-full md:w-1/2 md:hidden">
                                <div class="group relative overflow-hidden rounded-xl border border-green-500/20 bg-gray-800/50 backdrop-blur-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/20">
                                    <div class="flex items-start justify-between mb-2">
                                        <h3 class="text-2xl font-bold text-white">Rope Access Technician</h3>
                                        <span class="text-green-400 font-bold text-lg">2024</span>
                                    </div>
                                    <p class="text-green-400 font-semibold mb-3">Nordic Access</p>
                                    <p class="text-gray-400 mb-4">Contract work on wind turbine blade repair. Developed practical problem-solving skills.</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-xs font-medium border border-green-500/20">Problem-Solving</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2025 - AWS Cloud Solutions Architect -->
                    <div class="relative md:pl-1/2">
                        <div class="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div class="flex justify-center">
                                <div class="w-6 h-6 rounded-full border-4 border-cyan-500 bg-cyan-500 shadow-lg shadow-cyan-500/50 z-10 flex-shrink-0"></div>
                            </div>
                            <div class="w-full md:w-1/2 md:pl-12">
                                <div class="group relative overflow-hidden rounded-xl border border-cyan-500/50 bg-cyan-500/5 backdrop-blur-xl p-6 hover:border-cyan-500/80 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-600/20">
                                    <div class="flex items-start justify-between mb-2">
                                        <h3 class="text-2xl font-bold text-white">AWS Cloud Solutions Architect</h3>
                                        <span class="text-cyan-400 font-bold text-lg">2025</span>
                                    </div>
                                    <p class="text-cyan-400 font-semibold mb-3">In Progress</p>
                                    <p class="text-gray-400 mb-4">Transitioning back to IT with focus on AWS Cloud Architecture. Pursuing AWS Solutions Architect Associate certification. Building cloud-native solutions.</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-medium border border-cyan-500/20">AWS</span>
                                        <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-medium border border-cyan-500/20">Cloud Architecture</span>
                                        <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-medium border border-cyan-500/20">Security</span>
                                        <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-medium border border-cyan-500/20">Automation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Projects Section -->
    <section id="projects" class="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-900 reveal-on-scroll">
        <div class="container mx-auto reveal">
            <div class="max-w-4xl mx-auto mb-20 text-center">
                <h2 class="text-5xl md:text-6xl font-bold mb-6 hover:text-blue-400 transition-colors duration-300">Featured Projects</h2>
                <p class="text-xl text-gray-400">Real-world solutions that deliver impact</p>
            </div>

            <div class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <!-- Project 1 -->
                <div class="group relative overflow-hidden border border-blue-500/20 bg-gray-800/50 backdrop-blur-sm rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="relative p-6">
                        <div class="mb-4 inline-block p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                            <span class="text-2xl">🛡️</span>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">Secure VPC Architecture</h3>
                        <p class="text-gray-400 text-sm mb-4 leading-relaxed">Designed and implemented a multi-tier VPC with public/private subnets, NAT gateways, and security groups for a financial services client.</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">VPC</span>
                            <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">Security</span>
                            <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">Networking</span>
                        </div>
                        <div class="flex flex-wrap gap-2 text-xs text-gray-500">
                            <span>☑️ 99.9% Uptime</span>
                            <span>☑️ 50% Cost Reduction</span>
                            <span>☑️ 6-month project</span>
                        </div>
                    </div>
                </div>

                <!-- Project 2 -->
                <div class="group relative overflow-hidden border border-purple-500/20 bg-gray-800/50 backdrop-blur-sm rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/20">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="relative p-6">
                        <div class="mb-4 inline-block p-3 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                            <span class="text-2xl">⚡</span>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">Serverless API Platform</h3>
                        <p class="text-gray-400 text-sm mb-4 leading-relaxed">Built a scalable serverless API using Lambda, API Gateway, and DynamoDB. Implemented auto-scaling and monitoring with CloudWatch.</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-medium border border-purple-500/20">Lambda</span>
                            <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-medium border border-purple-500/20">API Gateway</span>
                            <span class="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-medium border border-purple-500/20">Automation</span>
                        </div>
                        <div class="flex flex-wrap gap-2 text-xs text-gray-500">
                            <span>☑️ 10M+ Requests/Month</span>
                            <span>☑️ Sub-100ms Latency</span>
                            <span>☑️ Zero Maintenance</span>
                        </div>
                    </div>
                </div>

                <!-- Project 3 -->
                <div class="group relative overflow-hidden border border-cyan-500/20 bg-gray-800/50 backdrop-blur-sm rounded-2xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-600/20">
                    <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="relative p-6">
                        <div class="mb-4 inline-block p-3 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                            <span class="text-2xl">☁️</span>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">Cloud Migration Strategy</h3>
                        <p class="text-gray-400 text-sm mb-4 leading-relaxed">Led migration of on-premises infrastructure to AWS. Implemented disaster recovery, backup strategies, and cost optimization.</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-medium border border-cyan-500/20">Migration</span>
                            <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-medium border border-cyan-500/20">DR/BC</span>
                            <span class="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-medium border border-cyan-500/20">Cost Optimization</span>
                        </div>
                        <div class="flex flex-wrap gap-2 text-xs text-gray-500">
                            <span>☑️ 40% Cost Savings</span>
                            <span>☑️ 3-month Timeline</span>
                            <span>☑️ 100+ Servers</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-900 reveal-on-scroll">
        <div class="container mx-auto max-w-3xl reveal">
            <div class="text-center mb-12">
                <h2 class="text-5xl md:text-6xl font-bold mb-6 hover:text-blue-400 transition-colors duration-300">Let's Work Together</h2>
                <p class="text-xl text-gray-400">Ready to build something amazing? Get in touch.</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 text-center">
                <a href="mailto:luke@example.com" class="group p-6 rounded-2xl border border-blue-500/20 bg-gray-800/50 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all duration-300">
                    <span class="text-4xl mb-4 block">✉️</span>
                    <h3 class="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">Email</h3>
                    <p class="text-gray-400 text-sm">luke@example.com</p>
                </a>

                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="group p-6 rounded-2xl border border-blue-500/20 bg-gray-800/50 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all duration-300">
                    <span class="text-4xl mb-4 block">🔗</span>
                    <h3 class="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">LinkedIn</h3>
                    <p class="text-gray-400 text-sm">Connect with me</p>
                </a>

                <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="group p-6 rounded-2xl border border-blue-500/20 bg-gray-800/50 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all duration-300">
                    <span class="text-4xl mb-4 block">🐙</span>
                    <h3 class="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">GitHub</h3>
                    <p class="text-gray-400 text-sm">View my repositories</p>
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-800 bg-gray-950 py-8 px-4">
        <div class="container mx-auto text-center text-gray-400">
            <p>&copy; 2024 Luke Taylor. All rights reserved. Built with Laravel & ❤️</p>
        </div>
    </footer>

    <!-- Navbar scroll effect -->
    <script>
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('bg-gray-900/80', 'backdrop-blur-xl', 'border-b', 'border-gray-800', 'shadow-lg');
            } else {
                navbar.classList.remove('bg-gray-900/80', 'backdrop-blur-xl', 'border-b', 'border-gray-800', 'shadow-lg');
            }
        });
    </script>
</body>
</html>
