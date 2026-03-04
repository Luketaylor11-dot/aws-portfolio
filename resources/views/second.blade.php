<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AWS Solutions Architect | Cloud Infrastructure Portfolio</title>
    <meta name="description" content="Architecting secure, scalable cloud infrastructures. Portfolio of an AWS Solutions Architect and Network Engineer transitioning from Army Network Engineering.">
    <style>
        :root {
            --background: #0a0f1c;
            --foreground: #f8fafc;
            --card: #0a0f1c;
            --card-foreground: #f8fafc;
            --primary: #3882f6;
            --primary-foreground: #0a0f1c;
            --muted-foreground: #71717a;
            --border: #27272a;
            --glass-border: rgba(255, 255, 255, 0.1);
            --glass: rgba(255, 255, 255, 0.05);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        body {
            background-color: var(--background);
            color: var(--foreground);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            font-size: 16px;
        }

        canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
        }

        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 50;
            transition: all 0.5s ease;
        }

        header.scrolled {
            background-color: rgba(8, 12, 24, 0.8);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--glass-border);
            box-shadow: 0 4px 30px rgba(56, 130, 246, 0.05);
        }

        nav {
            max-width: 1280px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 24px;
            position: relative;
            z-index: 10;
        }

        .nav-logo {
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            color: var(--foreground);
        }

        .nav-logo-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 8px;
            background-color: rgba(56, 130, 246, 0.1);
            border: 1px solid rgba(56, 130, 246, 0.2);
            transition: border-color 0.3s ease;
        }

        .nav-logo:hover .nav-logo-icon {
            border-color: rgba(56, 130, 246, 0.4);
        }

        .nav-logo-icon::after {
            content: '🛡️';
            font-size: 20px;
        }

        .nav-logo span {
            font-weight: 600;
            letter-spacing: -0.5px;
        }

        .nav-desktop {
            display: none;
            align-items: center;
            gap: 4px;
        }

        .nav-desktop.show {
            display: flex;
        }

        .nav-item {
            position: relative;
            padding: 8px 16px;
            font-size: 14px;
            color: var(--muted-foreground);
            text-decoration: none;
            border-radius: 8px;
            transition: color 0.3s ease;
            display: block;
        }

        .nav-item:hover {
            color: var(--foreground);
            background-color: var(--glass);
        }

        .nav-item::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            height: 1px;
            width: 0;
            background-color: var(--primary);
            transition: width 0.3s ease;
        }

        .nav-item:hover::after {
            width: 75%;
        }

        .nav-cta {
            display: none;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 500;
            color: var(--primary);
            text-decoration: none;
            border: 1px solid rgba(56, 130, 246, 0.3);
            background-color: rgba(56, 130, 246, 0.1);
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .nav-cta:hover {
            background-color: rgba(56, 130, 246, 0.2);
            border-color: rgba(56, 130, 246, 0.5);
            box-shadow: 0 0 20px rgba(56, 130, 246, 0.15);
        }

        .nav-cta.show {
            display: inline-flex;
        }

        .mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background: transparent;
            border: none;
            color: var(--muted-foreground);
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 20px;
        }

        .mobile-menu-btn:hover {
            color: var(--foreground);
            background-color: var(--glass);
        }

        .mobile-menu-btn.hide {
            display: none;
        }

        .mobile-menu {
            display: none;
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background-color: rgba(8, 12, 24, 0.95);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--glass-border);
            z-index: 40;
        }

        .mobile-menu.show {
            display: block;
        }

        .mobile-menu ul {
            display: flex;
            flex-direction: column;
            list-style: none;
            padding: 16px 24px;
            gap: 4px;
        }

        .mobile-menu a {
            display: block;
            padding: 12px 16px;
            font-size: 14px;
            color: var(--muted-foreground);
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .mobile-menu a:hover {
            color: var(--foreground);
            background-color: var(--glass);
        }

        main {
            position: relative;
            z-index: 10;
        }

        section {
            position: relative;
            min-height: auto;
        }

        .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 24px;
            position: relative;
            z-index: 1;
        }

        /* Hero Section */
        #hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            margin-top: 60px;
            padding-top: 40px;
            opacity: 1 !important;
            visibility: visible !important;
        }

        .hero-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            height: 600px;
            background: rgba(56, 130, 246, 0.05);
            border-radius: 50%;
            filter: blur(120px);
            pointer-events: none;
        }

        .hero-content {
            max-width: 896px;
            margin: 0 auto;
            text-align: center;
            position: relative;
            z-index: 2;
            opacity: 1;
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 16px;
            margin-bottom: 32px;
            border-radius: 24px;
            border: 1px solid rgba(56, 130, 246, 0.2);
            background-color: rgba(56, 130, 246, 0.05);
            animation: fadeInUp 0.8s ease 0.1s both;
        }

        .status-dot {
            display: inline-flex;
            position: relative;
        }

        .status-dot::before {
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--primary);
            animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .status-dot::after {
            content: '';
            position: relative;
            display: inline-flex;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: var(--primary);
        }

        .status-text {
            font-size: 12px;
            font-weight: 500;
            color: var(--primary);
            letter-spacing: 0.8px;
            text-transform: uppercase;
        }

        h1 {
            font-size: 48px;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 24px;
            color: var(--foreground);
            animation: fadeInUp 0.8s ease 0.2s both;
            letter-spacing: -1px;
        }

        h1 .highlight {
            position: relative;
            display: inline-block;
            color: var(--primary);
        }

        h1 .highlight-bg {
            position: absolute;
            inset: -4px;
            background-color: rgba(56, 130, 246, 0.1);
            border-radius: 8px;
            filter: blur(16px);
        }

        .hero-description {
            font-size: 18px;
            color: var(--muted-foreground);
            max-width: 672px;
            margin: 24px auto;
            line-height: 1.8;
            animation: fadeInUp 0.8s ease 0.4s both;
        }

        .hero-buttons {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-top: 40px;
            animation: fadeInUp 0.8s ease 0.6s both;
        }

        @media (min-width: 640px) {
            .hero-buttons {
                flex-direction: row;
                justify-content: center;
            }
        }

        .btn {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 14px 32px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 12px;
            text-decoration: none;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-primary {
            background-color: var(--primary);
            color: var(--primary-foreground);
        }

        .btn-primary:hover {
            box-shadow: 0 0 30px rgba(56, 130, 246, 0.3);
            transform: scale(1.02);
        }

        .btn-primary:active {
            transform: scale(0.98);
        }

        .btn-secondary {
            border: 1px solid var(--glass-border);
            background-color: var(--glass);
            color: var(--foreground);
            backdrop-filter: blur(12px);
        }

        .btn-secondary:hover {
            border-color: rgba(56, 130, 246, 0.3);
            background-color: rgba(56, 130, 246, 0.05);
            box-shadow: 0 0 20px rgba(56, 130, 246, 0.1);
        }

        .hero-icons {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 32px;
            margin-top: 64px;
            animation: fadeInUp 0.8s ease 0.8s both;
        }

        @media (max-width: 768px) {
            h1 {
                font-size: 32px;
            }

            .hero-description {
                font-size: 16px;
            }

            .hero-icons {
                gap: 16px;
            }
        }

        .icon-box {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 56px;
            height: 56px;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            background-color: var(--glass);
            backdrop-filter: blur(12px);
            transition: all 0.5s ease;
            animation: float 3s ease-in-out infinite;
            font-size: 28px;
        }

        .icon-box:nth-child(2) {
            animation-delay: 0.5s;
        }

        .icon-box:nth-child(3) {
            animation-delay: 1s;
        }

        .icon-box:hover {
            border-color: rgba(56, 130, 246, 0.4);
            box-shadow: 0 0 20px rgba(56, 130, 246, 0.15);
        }

        /* Section dividers */
        .section-divider {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 192px;
            height: 1px;
            background: linear-gradient(to right, transparent, rgba(56, 130, 246, 0.3), transparent);
        }

        section.content-section {
            padding: 128px 24px;
            position: relative;
        }

        .section-glow {
            position: absolute;
            width: 800px;
            height: 400px;
            background: rgba(56, 130, 246, 0.03);
            border-radius: 50%;
            filter: blur(150px);
            pointer-events: none;
        }

        .section-glow.top-glow {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .section-glow.bottom-glow {
            bottom: 0;
            left: 0;
            width: 600px;
            height: 400px;
        }

        .section-header {
            text-align: center;
            margin-bottom: 64px;
        }

        .section-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 16px;
            margin-bottom: 16px;
            border-radius: 24px;
            border: 1px solid rgba(56, 130, 246, 0.2);
            background-color: rgba(56, 130, 246, 0.05);
            font-size: 12px;
            font-weight: 600;
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 0.8px;
        }

        .section-badge::before {
            content: '⚙️';
            font-size: 12px;
        }

        h2 {
            font-size: 42px;
            font-weight: 700;
            color: var(--foreground);
            margin-bottom: 16px;
            letter-spacing: -0.5px;
        }

        .section-description {
            font-size: 18px;
            color: var(--muted-foreground);
            max-width: 672px;
            margin: 16px auto 0;
            line-height: 1.8;
        }

        /* Skills Section */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 32px;
            max-width: 1280px;
            margin: 0 auto;
        }

        .skill-category {
            padding: 32px;
            border-radius: 24px;
            border: 1px solid var(--glass-border);
            background-color: var(--glass);
            backdrop-filter: blur(12px);
            transition: all 0.5s ease;
        }

        .skill-category:hover {
            border-color: rgba(56, 130, 246, 0.2);
            box-shadow: 0 0 30px rgba(56, 130, 246, 0.06);
        }

        .skill-category h3 {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 18px;
            font-weight: 600;
            color: var(--foreground);
            margin-bottom: 24px;
        }

        .skill-category h3::before {
            font-size: 20px;
        }

        .skill-item {
            margin-bottom: 16px;
        }

        .skill-item:last-child {
            margin-bottom: 0;
        }

        .skill-name {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            font-weight: 500;
            color: var(--foreground);
            margin-bottom: 6px;
        }

        .skill-level {
            font-size: 13px;
            color: var(--primary);
            font-weight: 600;
        }

        .skill-bar {
            width: 100%;
            height: 6px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            overflow: hidden;
        }

        .skill-progress {
            height: 100%;
            background: linear-gradient(90deg, var(--primary), rgba(56, 130, 246, 0.6));
            border-radius: 3px;
            animation: expand 1.5s ease-out;
            transition: width 0.3s ease;
        }

        /* Projects Section */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 32px;
            max-width: 1280px;
            margin: 0 auto;
        }

        .project-card {
            position: relative;
            padding: 32px;
            border-radius: 24px;
            border: 1px solid var(--glass-border);
            background-color: var(--glass);
            backdrop-filter: blur(12px);
            cursor: pointer;
            transition: all 0.5s ease;
        }

        .project-card:hover {
            border-color: rgba(56, 130, 246, 0.3);
            box-shadow: 0 0 30px rgba(56, 130, 246, 0.1);
            transform: translateY(-2px);
        }

        .project-icon {
            font-size: 32px;
            margin-bottom: 16px;
        }

        .project-title {
            font-size: 20px;
            font-weight: 700;
            color: var(--foreground);
            margin-bottom: 4px;
        }

        .project-subtitle {
            font-size: 14px;
            color: var(--primary);
            margin-bottom: 16px;
            font-weight: 500;
        }

        .project-description {
            font-size: 14px;
            color: var(--muted-foreground);
            line-height: 1.6;
            margin-bottom: 16px;
        }

        .project-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .project-tag {
            padding: 4px 12px;
            background-color: rgba(56, 130, 246, 0.1);
            border: 1px solid rgba(56, 130, 246, 0.2);
            border-radius: 20px;
            font-size: 12px;
            color: var(--primary);
            font-weight: 500;
        }

        .project-highlights {
            padding-top: 16px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .project-highlight {
            font-size: 13px;
            color: var(--muted-foreground);
            margin-bottom: 8px;
            padding-left: 12px;
            position: relative;
        }

        .project-highlight::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--primary);
            font-weight: bold;
        }

        /* Experience Section */
        .timeline {
            position: relative;
            max-width: 896px;
            margin: 0 auto;
        }

        .timeline::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 1px;
            background-color: var(--glass-border);
        }

        @media (min-width: 768px) {
            .timeline::before {
                left: 32px;
            }
        }

        .timeline-item {
            position: relative;
            padding-left: 32px;
            margin-bottom: 48px;
        }

        @media (min-width: 768px) {
            .timeline-item {
                padding-left: 80px;
            }
        }

        .timeline-dot {
            position: absolute;
            left: -8px;
            top: 4px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: var(--background);
            border: 2px solid var(--primary);
            box-shadow: 0 0 12px rgba(56, 130, 246, 0.3);
        }

        @media (min-width: 768px) {
            .timeline-dot {
                left: 16px;
            }
        }

        .timeline-content {
            padding: 20px;
            border-radius: 16px;
            border: 1px solid var(--glass-border);
            background-color: var(--glass);
            backdrop-filter: blur(12px);
            transition: all 0.5s ease;
        }

        .timeline-content:hover {
            border-color: rgba(56, 130, 246, 0.2);
            box-shadow: 0 0 20px rgba(56, 130, 246, 0.06);
        }

        .timeline-role {
            font-size: 18px;
            font-weight: 700;
            color: var(--foreground);
        }

        .timeline-company {
            font-size: 14px;
            color: var(--primary);
            margin-top: 2px;
        }

        .timeline-period {
            display: flex;
            gap: 16px;
            margin-top: 8px;
            font-size: 13px;
            color: var(--muted-foreground);
        }

        .timeline-period::before {
            content: '📅';
        }

        .timeline-location::before {
            content: '📍';
        }

        .timeline-description {
            margin-top: 12px;
            font-size: 14px;
            color: var(--muted-foreground);
            line-height: 1.6;
        }

        .timeline-highlights {
            margin-top: 12px;
            font-size: 13px;
        }

        .timeline-highlight {
            color: var(--muted-foreground);
            margin-bottom: 6px;
            padding-left: 12px;
            position: relative;
        }

        .timeline-highlight::before {
            content: '→';
            position: absolute;
            left: 0;
            color: var(--primary);
        }

        /* Contact Section */
        #contact {
            padding-bottom: 64px;
        }

        .contact-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 700px;
            height: 500px;
            background: rgba(56, 130, 246, 0.03);
            border-radius: 50%;
            filter: blur(180px);
            pointer-events: none;
        }

        .contact-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
            gap: 32px;
            max-width: 1280px;
            margin: 0 auto;
        }

        .contact-form {
            padding: 32px;
            border-radius: 32px;
            border: 1px solid var(--glass-border);
            background-color: var(--glass);
            backdrop-filter: blur(12px);
            transition: all 0.5s ease;
            animation: fadeInUp 0.8s ease 0.1s both;
        }

        .contact-form:hover {
            border-color: rgba(56, 130, 246, 0.2);
            box-shadow: 0 0 30px rgba(56, 130, 246, 0.06);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: var(--foreground);
            margin-bottom: 8px;
        }

        .form-input,
        .form-textarea {
            width: 100%;
            padding: 12px 16px;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            background-color: rgba(39, 39, 42, 0.3);
            color: var(--foreground);
            font-size: 14px;
            transition: all 0.3s ease;
            font-family: inherit;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
            color: var(--muted-foreground);
        }

        .form-input:focus,
        .form-textarea:focus {
            outline: none;
            border-color: rgba(56, 130, 246, 0.4);
            ring: 1px solid rgba(56, 130, 246, 0.2);
            box-shadow: 0 0 12px rgba(56, 130, 246, 0.1);
        }

        .form-textarea {
            resize: none;
            min-height: 120px;
        }

        .success-message {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
            padding: 48px 32px;
            text-align: center;
            min-height: 280px;
        }

        .success-icon {
            font-size: 48px;
        }

        .success-title {
            font-size: 20px;
            font-weight: 600;
            color: var(--foreground);
        }

        .success-text {
            font-size: 14px;
            color: var(--muted-foreground);
        }

        .contact-sidebar {
            display: flex;
            flex-direction: column;
            gap: 24px;
            animation: fadeInUp 0.8s ease 0.2s both;
        }

        .contact-box {
            padding: 24px;
            border-radius: 24px;
            border: 1px solid var(--glass-border);
            background-color: var(--glass);
            backdrop-filter: blur(12px);
            transition: all 0.5s ease;
        }

        .contact-box:hover {
            border-color: rgba(56, 130, 246, 0.2);
            box-shadow: 0 0 20px rgba(56, 130, 246, 0.06);
        }

        .contact-box h3 {
            font-size: 12px;
            font-weight: 700;
            color: var(--foreground);
            text-transform: uppercase;
            letter-spacing: 1.2px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .contact-box h3::before {
            font-size: 14px;
        }

        .social-links {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .social-link {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 8px;
            text-decoration: none;
            color: var(--muted-foreground);
            transition: all 0.3s ease;
            font-size: 14px;
        }

        .social-link:hover {
            color: var(--foreground);
            background-color: rgba(56, 130, 246, 0.1);
        }

        .social-link::before {
            font-size: 16px;
        }

        /* Footer */
        footer {
            position: relative;
            z-index: 10;
            border-top: 1px solid var(--glass-border);
            background-color: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(12px);
            padding: 32px 24px;
        }

        .footer-content {
            max-width: 1280px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 32px;
            text-align: center;
        }

        @media (min-width: 768px) {
            .footer-content {
                grid-template-columns: auto 1fr auto;
                text-align: left;
            }
        }

        .footer-brand {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 14px;
            color: var(--muted-foreground);
        }

        @media (min-width: 768px) {
            .footer-brand {
                justify-content: flex-start;
            }
        }

        .footer-brand::before {
            content: '🛡️';
            font-size: 16px;
        }

        .footer-tagline {
            font-size: 12px;
            color: var(--muted-foreground);
            line-height: 1.6;
        }

        .footer-links {
            display: flex;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
        }

        @media (min-width: 768px) {
            .footer-links {
                justify-content: flex-end;
            }
        }

        .footer-link {
            font-size: 12px;
            color: var(--muted-foreground);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-link:hover {
            color: var(--foreground);
        }

        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-8px);
            }
        }

        @keyframes ping {
            75%, 100% {
                opacity: 0;
                transform: scale(2);
            }
        }

        @keyframes expand {
            from {
                width: 0;
            }
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.7;
            }
        }

        @keyframes glow {
            0% {
                box-shadow: 0 0 5px rgba(56, 130, 246, 0.5);
            }
            50% {
                box-shadow: 0 0 20px rgba(56, 130, 246, 0.8);
            }
            100% {
                box-shadow: 0 0 5px rgba(56, 130, 246, 0.5);
            }
        }

        @keyframes shimmer {
            0% {
                background-position: -1000px 0;
            }
            100% {
                background-position: 1000px 0;
            }
        }


        body.reveal-init section.content-section {
            opacity: 0;
            transform: translateY(36px);
            transition: opacity 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        section.content-section.visible {
            opacity: 1;
            transform: translateY(0);
        }

        body.reveal-init .skill-category,
        body.reveal-init .project-card,
        body.reveal-init .timeline-item,
        body.reveal-init #skills .section-header,
        body.reveal-init #projects .section-header,
        body.reveal-init #experience .section-header,
        body.reveal-init #contact .section-header,
        body.reveal-init #contact .contact-container {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
            transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transition-delay: var(--reveal-delay, 0ms);
            will-change: opacity, transform;
        }

        .skill-category.visible,
        .project-card.visible,
        .timeline-item.visible,
        #skills .section-header.visible,
        #projects .section-header.visible,
        #experience .section-header.visible,
        #contact .section-header.visible,
        #contact .contact-container.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        body.reveal-init .project-card {
            transform: translateY(32px) scale(0.98);
        }

        body.reveal-init .project-card:nth-child(even) {
            transform: translateX(20px) translateY(20px);
        }

        .project-card:nth-child(even).visible {
            transform: translateX(0) translateY(0);
        }

        body.reveal-init .timeline-item {
            transform: translateX(-20px);
        }

        .timeline-item.visible {
            transform: translateX(0);
        }

        .btn {
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            overflow: hidden;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            transition: left 0.5s ease;
        }

        .btn:hover::before {
            left: 100%;
        }

        .nav-item {
            position: relative;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .icon-box {
            position: relative;
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .icon-box:hover {
            transform: scale(1.1) rotate(5deg);
            animation: bounce 0.6s ease;
        }

        .skill-category:hover {
            transform: translateY(-5px);
            animation: glow 1.5s ease;
        }

        .project-card:hover {
            transform: translateY(-8px) rotate(0.5deg);
            animation: glow 1.5s ease;
        }

        .timeline-item:hover .timeline-content {
            transform: translateY(-4px);
            animation: glow 1.5s ease;
        }

        .form-input:focus,
        .form-textarea:focus {
            animation: glow 1s ease;
        }

        .social-link:hover {
            transform: translateX(4px);
            animation: bounce 0.4s ease;
        }

    </style>
</head>
<body>
    <!-- Canvas Background -->
    <canvas id="starfield"></canvas>

    <!-- Navigation -->
    <header>
        <nav>
            <a href="/" class="nav-logo">
                <div class="nav-logo-icon"></div>
                <span>CloudArch</span>
            </a>
            <ul class="nav-desktop" id="nav-desktop">
                <li><a href="#hero" class="nav-item">Home</a></li>
                <li><a href="#skills" class="nav-item">Skills</a></li>
                <li><a href="#projects" class="nav-item">Projects</a></li>
                <li><a href="#experience" class="nav-item">Experience</a></li>
                <li><a href="#contact" class="nav-item">Contact</a></li>
            </ul>
            <a href="#contact" class="nav-cta" id="nav-cta">Get in Touch</a>
            <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">☰</button>
        </nav>
    </header>

    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobile-menu">
        <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </div>

    <!-- Main Content -->
    <main>
        <!-- Hero Section -->
        <section id="hero">
            <div class="hero-glow"></div>
            <div class="container">
                <div class="hero-content">
                    <div class="status-badge">
                        <span class="status-dot"></span>
                        <span class="status-text">Available for Opportunities</span>
                    </div>

                    <h1>
                        Architecting
                        <span class="highlight">
                            <span>Secure</span>
                            <span class="highlight-bg"></span>
                        </span>
                        , Scalable Cloud Infrastructures
                    </h1>

                    <p class="hero-description">
                        Army Network Engineer turned AWS Solutions Architect. Building resilient,
                        mission-critical cloud systems with military-grade precision and security.
                    </p>

                    <div class="hero-buttons">
                        <a href="#projects" class="btn btn-primary">
                            <span>View Projects</span>
                            <span>↓</span>
                        </a>
                        <a href="#contact" class="btn btn-secondary">Let's Connect</a>
                    </div>

                    <div class="hero-icons">
                        <div class="icon-box" title="AWS Cloud">☁️</div>
                        <div class="icon-box" title="Infrastructure">🖥️</div>
                        <div class="icon-box" title="Security">🔒</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Skills Section -->
        <div class="relative">
            <div class="section-divider"></div>
        </div>

        <section id="skills" class="content-section">
            <div class="section-glow top-glow"></div>
            <div class="container">
                <div class="section-header">
                    <div class="section-badge">Career Path</div>
                    <h2>Skills & Expertise</h2>
                    <p class="section-description">
                        Comprehensive technical proficiency across cloud architecture, network engineering, and modern development practices.
                    </p>
                </div>

                <div class="skills-grid">
                    <!-- AWS Cloud -->
                    <div class="skill-category">
                        <h3>☁️ AWS Cloud</h3>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>EC2</span>
                                <span class="skill-level">95%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 95%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>VPC</span>
                                <span class="skill-level">90%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 90%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>S3</span>
                                <span class="skill-level">92%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 92%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Route 53</span>
                                <span class="skill-level">88%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 88%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>IAM</span>
                                <span class="skill-level">93%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 93%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>CloudFormation</span>
                                <span class="skill-level">85%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 85%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Network Engineering -->
                    <div class="skill-category">
                        <h3>🌐 Network Engineering</h3>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>TCP/IP</span>
                                <span class="skill-level">95%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 95%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>DNS</span>
                                <span class="skill-level">92%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 92%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>OSPF/BGP</span>
                                <span class="skill-level">88%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 88%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>VPN/IPSec</span>
                                <span class="skill-level">90%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 90%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Firewalls</span>
                                <span class="skill-level">93%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 93%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Subnetting</span>
                                <span class="skill-level">95%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 95%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Development -->
                    <div class="skill-category">
                        <h3>💻 Development</h3>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Laravel</span>
                                <span class="skill-level">88%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 88%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>PHP</span>
                                <span class="skill-level">85%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 85%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>MySQL</span>
                                <span class="skill-level">82%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 82%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>REST APIs</span>
                                <span class="skill-level">87%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 87%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Git</span>
                                <span class="skill-level">90%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 90%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Docker</span>
                                <span class="skill-level">80%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 80%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Security -->
                    <div class="skill-category">
                        <h3>🔒 Security</h3>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Network Security</span>
                                <span class="skill-level">93%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 93%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Encryption</span>
                                <span class="skill-level">88%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 88%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Compliance</span>
                                <span class="skill-level">85%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 85%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Pen Testing</span>
                                <span class="skill-level">78%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 78%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>SIEM</span>
                                <span class="skill-level">82%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 82%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Zero Trust</span>
                                <span class="skill-level">86%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 86%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Infrastructure -->
                    <div class="skill-category">
                        <h3>🖥️ Infrastructure</h3>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Linux Admin</span>
                                <span class="skill-level">90%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 90%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Windows Server</span>
                                <span class="skill-level">85%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 85%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Active Directory</span>
                                <span class="skill-level">88%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 88%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Ansible</span>
                                <span class="skill-level">78%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 78%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Terraform</span>
                                <span class="skill-level">82%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 82%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>CI/CD</span>
                                <span class="skill-level">80%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 80%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Services & Tools -->
                    <div class="skill-category">
                        <h3>⚙️ Services & Tools</h3>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>CloudWatch</span>
                                <span class="skill-level">85%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 85%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>Lambda</span>
                                <span class="skill-level">82%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 82%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>RDS</span>
                                <span class="skill-level">88%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 88%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>ELB</span>
                                <span class="skill-level">86%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 86%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>SNS/SQS</span>
                                <span class="skill-level">80%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 80%"></div>
                            </div>
                        </div>
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>ElastiCache</span>
                                <span class="skill-level">78%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-progress" style="width: 78%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Projects Section -->
        <div class="relative">
            <div class="section-divider"></div>
        </div>

        <section id="projects" class="content-section">
            <div class="section-glow top-glow"></div>
            <div class="container">
                <div class="section-header">
                    <div class="section-badge">Portfolio</div>
                    <h2>Featured Projects</h2>
                    <p class="section-description">
                        A selection of enterprise cloud architectures and infrastructure solutions designed and implemented for mission-critical deployments.
                    </p>
                </div>

                <div class="projects-grid">
                    <!-- Project 1 -->
                    <div class="project-card">
                        <div class="project-icon">☁️</div>
                        <h3 class="project-title">Laravel on AWS</h3>
                        <p class="project-subtitle">Full-Stack Cloud Deployment</p>
                        <p class="project-description">
                            End-to-end deployment of a Laravel application on AWS infrastructure. Configured EC2 instances with auto-scaling groups, RDS for MySQL, S3 for asset storage, and CloudFront CDN. Implemented CI/CD pipeline with CodePipeline and CodeDeploy for zero-downtime deployments.
                        </p>
                        <div class="project-tags">
                            <span class="project-tag">AWS EC2</span>
                            <span class="project-tag">RDS</span>
                            <span class="project-tag">S3</span>
                            <span class="project-tag">CloudFront</span>
                            <span class="project-tag">Laravel</span>
                        </div>
                        <div class="project-highlights">
                            <div class="project-highlight">99.9% uptime with auto-scaling</div>
                            <div class="project-highlight">60% reduction in deployment time</div>
                            <div class="project-highlight">SSL/TLS encryption end-to-end</div>
                        </div>
                    </div>

                    <!-- Project 2 -->
                    <div class="project-card">
                        <div class="project-icon">🌐</div>
                        <h3 class="project-title">Enterprise VPC Architecture</h3>
                        <p class="project-subtitle">Multi-Tier Network Design</p>
                        <p class="project-description">
                            Designed and implemented a multi-tier VPC architecture with public, private, and isolated subnets across multiple Availability Zones. Configured NAT Gateways, VPC Peering, and Transit Gateway for inter-VPC communication. Implemented VPC Flow Logs and GuardDuty for security monitoring.
                        </p>
                        <div class="project-tags">
                            <span class="project-tag">VPC</span>
                            <span class="project-tag">Transit Gateway</span>
                            <span class="project-tag">NAT</span>
                            <span class="project-tag">Flow Logs</span>
                        </div>
                        <div class="project-highlights">
                            <div class="project-highlight">Multi-AZ high availability</div>
                            <div class="project-highlight">Network segmentation & isolation</div>
                            <div class="project-highlight">Real-time threat detection</div>
                        </div>
                    </div>

                    <!-- Project 3 -->
                    <div class="project-card">
                        <div class="project-icon">🖥️</div>
                        <h3 class="project-title">Serverless API Gateway</h3>
                        <p class="project-subtitle">Microservices Architecture</p>
                        <p class="project-description">
                            Built a serverless microservices architecture using API Gateway, Lambda functions, and DynamoDB. Implemented authentication with Cognito, request throttling, and custom authorizers. Created CloudFormation templates for infrastructure-as-code deployment.
                        </p>
                        <div class="project-tags">
                            <span class="project-tag">API Gateway</span>
                            <span class="project-tag">Lambda</span>
                            <span class="project-tag">DynamoDB</span>
                            <span class="project-tag">Cognito</span>
                        </div>
                        <div class="project-highlights">
                            <div class="project-highlight">Sub-100ms response times</div>
                            <div class="project-highlight">Auto-scaling to 10K+ requests/sec</div>
                            <div class="project-highlight">Infrastructure as Code</div>
                        </div>
                    </div>

                    <!-- Project 4 -->
                    <div class="project-card">
                        <div class="project-icon">🔒</div>
                        <h3 class="project-title">Network Security Lab</h3>
                        <p class="project-subtitle">Penetration Testing & Hardening</p>
                        <p class="project-description">
                            Comprehensive network security laboratory environment for testing firewall configurations, IDS/IPS systems, and security policies. Includes automated vulnerability scanning, compliance checking against CIS benchmarks, and incident response playbooks.
                        </p>
                        <div class="project-tags">
                            <span class="project-tag">Firewall</span>
                            <span class="project-tag">IDS/IPS</span>
                            <span class="project-tag">CIS Benchmarks</span>
                            <span class="project-tag">Monitoring</span>
                        </div>
                        <div class="project-highlights">
                            <div class="project-highlight">Automated vulnerability assessment</div>
                            <div class="project-highlight">CIS benchmark compliance</div>
                            <div class="project-highlight">Incident response automation</div>
                        </div>
                    </div>

                    <!-- Project 5 -->
                    <div class="project-card">
                        <div class="project-icon">📦</div>
                        <h3 class="project-title">Hybrid Cloud Migration</h3>
                        <p class="project-subtitle">On-Prem to AWS Migration</p>
                        <p class="project-description">
                            Led the migration of legacy on-premises infrastructure to AWS hybrid cloud architecture. Utilized AWS Migration Hub, DMS for database migration, and Direct Connect for secure hybrid connectivity. Reduced infrastructure costs by 40% while improving performance.
                        </p>
                        <div class="project-tags">
                            <span class="project-tag">Migration Hub</span>
                            <span class="project-tag">DMS</span>
                            <span class="project-tag">Direct Connect</span>
                            <span class="project-tag">DocString</span>
                        </div>
                        <div class="project-highlights">
                            <div class="project-highlight">40% cost reduction</div>
                            <div class="project-highlight">Zero data loss migration</div>
                            <div class="project-highlight">Hybrid connectivity via Direct Connect</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Experience Section -->
        <div class="relative">
            <div class="section-divider"></div>
        </div>

        <section id="experience" class="content-section">
            <div class="section-glow bottom-glow"></div>
            <div class="container">
                <div class="section-header">
                    <div class="section-badge">Career Path</div>
                    <h2>Experience</h2>
                    <p class="section-description">
                        From Army network operations to architecting cloud solutions -- a journey rooted in discipline, security, and continuous growth.
                    </p>
                </div>

                <div class="timeline">
                    <!-- Experience 1 -->
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <div class="timeline-role">AWS Solutions Architect</div>
                            <div class="timeline-company">Cloud Architecture Consulting</div>
                            <div class="timeline-period">
                                <span>2023 - Present</span>
                                <span class="timeline-location">Remote</span>
                            </div>
                            <p class="timeline-description">
                                Design and implement enterprise cloud architectures on AWS. Lead migration strategies for on-premises workloads, optimize cost structures, and ensure security compliance across multi-account environments.
                            </p>
                            <div class="timeline-highlights">
                                <div class="timeline-highlight">Architected 15+ production environments on AWS</div>
                                <div class="timeline-highlight">Reduced client infrastructure costs by an average of 35%</div>
                                <div class="timeline-highlight">Implemented zero-trust security across all deployments</div>
                            </div>
                        </div>
                    </div>

                    <!-- Experience 2 -->
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <div class="timeline-role">Network Engineer</div>
                            <div class="timeline-company">United States Army</div>
                            <div class="timeline-period">
                                <span>2019 - 2023</span>
                                <span class="timeline-location">Multiple Duty Stations</span>
                            </div>
                            <p class="timeline-description">
                                Managed and secured tactical and garrison network infrastructure supporting mission-critical operations. Responsible for network design, implementation, and maintenance across classified and unclassified environments.
                            </p>
                            <div class="timeline-highlights">
                                <div class="timeline-highlight">Maintained 99.99% uptime for mission-critical networks</div>
                                <div class="timeline-highlight">Managed infrastructure supporting 2,000+ users</div>
                                <div class="timeline-highlight">Led network modernization initiatives across post</div>
                            </div>
                        </div>
                    </div>

                    <!-- Experience 3 -->
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <div class="timeline-role">Signal Support Systems Specialist</div>
                            <div class="timeline-company">United States Army</div>
                            <div class="timeline-period">
                                <span>2017 - 2019</span>
                                <span class="timeline-location">Fort Hood, TX</span>
                            </div>
                            <p class="timeline-description">
                                Installed, operated, and maintained tactical communication systems. Configured routers, switches, and secure communication equipment. Earned Security+ and Network+ certifications while on active duty.
                            </p>
                            <div class="timeline-highlights">
                                <div class="timeline-highlight">Earned CompTIA Security+ and Network+</div>
                                <div class="timeline-highlight">Configured and maintained SIPR/NIPR networks</div>
                                <div class="timeline-highlight">Trained 20+ soldiers on network operations</div>
                            </div>
                        </div>
                    </div>

                    <!-- Experience 4 -->
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <div class="timeline-role">IT Support & Early Career</div>
                            <div class="timeline-company">Pre-Military Service</div>
                            <div class="timeline-period">
                                <span>2015 - 2017</span>
                                <span class="timeline-location">Various</span>
                            </div>
                            <p class="timeline-description">
                                Built foundational IT skills through hands-on technical support roles. Developed passion for networking and infrastructure that led to pursuing a career in military network engineering.
                            </p>
                            <div class="timeline-highlights">
                                <div class="timeline-highlight">Help desk and tier-2 technical support</div>
                                <div class="timeline-highlight">Hardware and software troubleshooting</div>
                                <div class="timeline-highlight">Earned CompTIA A+ certification</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <div class="relative">
            <div class="section-divider"></div>
        </div>

        <section id="contact" class="content-section">
            <div class="contact-glow"></div>
            <div class="container">
                <div class="section-header">
                    <div class="section-badge">Get in Touch</div>
                    <h2>Let's Build Together</h2>
                    <p class="section-description">
                        Have a cloud project in mind? Looking for an AWS Solutions Architect?<br>
                        Let's connect and make it happen.
                    </p>
                </div>

                <div class="contact-container">
                    <!-- Contact Form -->
                    <div class="contact-form" style="grid-column: span 2;">
                        <form id="contact-form">
                            <div class="form-group">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                    <div>
                                        <label class="form-label">Name</label>
                                        <input type="text" class="form-input" placeholder="Your name" required>
                                    </div>
                                    <div>
                                        <label class="form-label">Email</label>
                                        <input type="email" class="form-input" placeholder="you@example.com" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Subject</label>
                                <input type="text" class="form-input" placeholder="Project inquiry" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Message</label>
                                <textarea class="form-textarea" placeholder="Tell me about your project..." required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary" style="width: 100%; gap: 8px;">
                                <span>✉️</span>
                                <span>Send Message</span>
                            </button>
                        </form>
                        <div id="success-message" class="success-message" style="display: none;">
                            <div class="success-icon">✓</div>
                            <h3 class="success-title">Message Sent</h3>
                            <p class="success-text">Thank you for reaching out. I'll get back to you soon.</p>
                        </div>
                    </div>

                    <!-- Contact Info -->
                    <div class="contact-sidebar">
                        <div class="contact-box">
                            <h3>📱 Connect</h3>
                            <div class="social-links">
                                <a href="https://github.com" class="social-link">GitHub</a>
                                <a href="https://linkedin.com" class="social-link">LinkedIn</a>
                                <a href="mailto:example@example.com" class="social-link">Email</a>
                            </div>
                        </div>
                        <div class="contact-box">
                            <h3>💬 Let's Talk</h3>
                            <p style="font-size: 14px; color: var(--muted-foreground); line-height: 1.6;">
                                Ready to discuss your cloud architecture needs? I'm available for consultations, partnerships, and exciting new projects.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <div class="footer-brand">CloudArch &copy; 2024</div>
            <p class="footer-tagline">Architecting the future of cloud infrastructure, one deployment at a time.</p>
            <div class="footer-links">
                <a href="#hero" class="footer-link">Home</a>
                <a href="#skills" class="footer-link">Skills</a>
                <a href="#projects" class="footer-link">Projects</a>
                <a href="#contact" class="footer-link">Contact</a>
            </div>
        </div>
    </footer>

    <script>
        console.log('Script loaded');
        
        // ============ FRAMER MOTION-LIKE EASING CURVES ============
        const easing = {
            default: [0.25, 0.46, 0.45, 0.94],
            easeOut: [0.16, 1, 0.3, 1],
            spring: [0.34, 1.56, 0.64, 1]
        };

        // Helper to convert cubic-bezier to CSS
        function createEasing(x1, y1, x2, y2) {
            return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
        }

        // ============ SCROLL REVEAL (FRAMER-LIKE) ============
        function initScrollReveal() {
            const revealTargets = [
                ...document.querySelectorAll('section.content-section, .skill-category, .project-card, .timeline-item, #skills .section-header, #projects .section-header, #experience .section-header, #contact .section-header, #contact .contact-container')
            ];

            if (!revealTargets.length) {
                return;
            }

            document.body.classList.add('reveal-init');

            revealTargets.forEach((element, index) => {
                element.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`);
            });

            if (!('IntersectionObserver' in window)) {
                revealTargets.forEach((element) => element.classList.add('visible'));
                return;
            }

            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -12% 0px'
            });

            revealTargets.forEach((element) => {
                revealObserver.observe(element);
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initScrollReveal);
        } else {
            initScrollReveal();
        }

        // ============ HERO PARALLAX SCROLL TRANSFORMS ============
        const heroSection = document.getElementById('hero');
        const heroContent = document.querySelector('.hero-content');

        window.addEventListener('scroll', () => {
            if (heroSection) {
                const rect = heroSection.getBoundingClientRect();
                const scrollProgress = Math.max(0, Math.min(1, 1 - (rect.bottom / window.innerHeight)));
                
                if (heroContent) {
                    const y1Transform = scrollProgress * -150;
                    const opacityValue = Math.max(0, 1 - scrollProgress * 2.5);
                    const scaleValue = 0.95 + (1 - scrollProgress) * 0.05;
                    
                    heroContent.style.transform = `translateY(${y1Transform}px) scale(${scaleValue})`;
                    heroContent.style.opacity = opacityValue;
                }

                const iconContainer = document.querySelector('.hero-icons');
                if (iconContainer) {
                    const y2Transform = scrollProgress * -80;
                    iconContainer.style.transform = `translateY(${y2Transform}px)`;
                }
            }
        });

        // ============ FLOATING ANIMATION ============
        document.querySelectorAll('.icon-box').forEach((box, idx) => {
            const duration = 3 + idx * 0.5;
            const style = document.createElement('style');
            style.textContent = `
                @keyframes float-${idx} {
                    0%, 100% { transform: translateY(0px) rotateZ(0deg); }
                    50% { transform: translateY(-12px) rotateZ(${2 + idx}deg); }
                }
                .icon-box:nth-child(${idx + 1}) {
                    animation: float-${idx} ${duration}s ease-in-out infinite;
                }
            `;
            document.head.appendChild(style);
        });

        // ============ ADVANCED HOVER EFFECTS ============
        document.querySelectorAll('.skill-category, .project-card, .timeline-content, .contact-box').forEach((el) => {
            el.addEventListener('mouseenter', function() {
                this.style.transition = `all 0.4s ${createEasing(...easing.spring)}`;
                this.style.transform = 'translateY(-8px)';
            });

            el.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // ============ BUTTON HOVER WITH SPRING PHYSICS ============
        document.querySelectorAll('.btn').forEach((button) => {
            button.addEventListener('mouseenter', function() {
                this.style.transition = `all 0.3s ${createEasing(...easing.spring)}`;
                this.style.transform = 'scale(1.02)';
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });

            button.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });

            button.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1.02)';
            });
        });

        // ============ ICON BOX HOVER WITH SCALE ============
        document.querySelectorAll('.icon-box').forEach((box) => {
            box.addEventListener('mouseenter', function() {
                this.style.transition = `all 0.5s ${createEasing(...easing.spring)}`;
                this.style.transform = 'scale(1.1) rotate(5deg)';
                this.style.borderColor = 'rgba(56, 130, 246, 0.4)';
                this.style.boxShadow = '0 0 20px rgba(56, 130, 246, 0.15)';
            });

            box.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0)';
                this.style.borderColor = 'var(--glass-border)';
                this.style.boxShadow = 'none';
            });
        });

        // ============ SKILL PROGRESS BAR ANIMATION ============
        const skillBarsAnimationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach((bar, idx) => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        bar.style.transition = `width 1.5s ${createEasing(...easing.default)} ${idx * 0.1}s`;
                        
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 50);
                    });
                    skillBarsAnimationObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.skill-category').forEach((category) => {
            skillBarsAnimationObserver.observe(category);
        });

        // ============ FORM INPUT ANIMATIONS ============
        document.querySelectorAll('.form-input, .form-textarea').forEach((input) => {
            input.addEventListener('focus', function() {
                this.style.transition = `all 0.3s ${createEasing(...easing.spring)}`;
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 0 12px rgba(56, 130, 246, 0.2)';
            });

            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });

        // ============ SOCIAL LINK ANIMATIONS ============
        document.querySelectorAll('.social-link').forEach((link) => {
            link.addEventListener('mouseenter', function() {
                this.style.transition = `all 0.3s ${createEasing(...easing.spring)}`;
                this.style.transform = 'translateX(8px)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });

        // ============ NAV ITEM UNDERLINE ANIMATION ============
        document.querySelectorAll('.nav-item').forEach((item) => {
            item.style.position = 'relative';
            item.addEventListener('mouseenter', function() {
                this.style.transition = `all 0.3s ${createEasing(...easing.default)}`;
            });
        });

        // ============ SCROLL INDICATOR ANIMATION ============
        const scrollIndicator = document.querySelector('[role="scroll-indicator"]');
        if (scrollIndicator) {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes scrollBounce {
                    0%, 100% { opacity: 1; transform: translateY(0); }
                    50% { opacity: 0.3; transform: translateY(12px); }
                }
                [role="scroll-indicator"] {
                    animation: scrollBounce 2s ease-in-out infinite;
                }
            `;
            document.head.appendChild(style);
        }

        // ============ NAVIGATION SCROLL EFFECT ============
        const header = document.querySelector('header');
        let lastScrollY = 0;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                if (!header.classList.contains('scrolled')) {
                    header.classList.add('scrolled');
                    header.style.transition = `all 0.4s ${createEasing(...easing.default)}`;
                }
            } else {
                if (header.classList.contains('scrolled')) {
                    header.classList.remove('scrolled');
                }
            }
            
            lastScrollY = currentScrollY;
        });

        // ============ MOBILE MENU TOGGLE WITH ANIMATION ============
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const navDesktop = document.getElementById('nav-desktop');
        const navCta = document.getElementById('nav-cta');

        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('show');
            mobileMenuBtn.style.transition = `all 0.3s ${createEasing(...easing.spring)}`;
            mobileMenuBtn.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0)';
            mobileMenuBtn.textContent = isOpen ? '✕' : '☰';
            
            if (isOpen) {
                mobileMenu.style.animation = `slideInDown 0.3s ${createEasing(...easing.default)} forwards`;
            }
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
                mobileMenuBtn.textContent = '☰';
                mobileMenuBtn.style.transform = 'rotate(0)';
            });
        });

        // Show/hide desktop nav and CTA on resize
        function handleResize() {
            if (window.innerWidth >= 768) {
                navDesktop.classList.add('show');
                navCta.classList.add('show');
                mobileMenuBtn.classList.add('hide');
            } else {
                navDesktop.classList.remove('show');
                navCta.classList.remove('show');
                mobileMenuBtn.classList.remove('hide');
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        // ============ CONTACT FORM ANIMATION ============
        const contactForm = document.getElementById('contact-form');
        const successMessage = document.getElementById('success-message');

        if (contactForm && successMessage) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Fade out form
                contactForm.style.animation = `fadeOut 0.6s ${createEasing(...easing.default)} forwards`;
                
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'flex';
                    successMessage.style.animation = `scaleIn 0.6s ${createEasing(...easing.spring)} forwards`;
                }, 600);

                setTimeout(() => {
                    successMessage.style.animation = `fadeOut 0.6s ${createEasing(...easing.default)} forwards`;
                    
                    setTimeout(() => {
                        contactForm.style.display = 'block';
                        contactForm.style.animation = `scaleIn 0.6s ${createEasing(...easing.spring)} forwards`;
                        successMessage.style.display = 'none';
                        contactForm.reset();
                    }, 600);
                }, 3000);
            });
        }

        // ============ ADD MISSING CSS ANIMATIONS ============
        const additionalAnimations = document.createElement('style');
        additionalAnimations.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideInDown {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideInLeft {
                from { opacity: 0; transform: translateX(-30px); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(30px); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes scaleIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(additionalAnimations);

        // ============ SMOOTH SCROLL BEHAVIOR ============
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const topPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: topPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ============ STARFIELD BACKGROUND ============
        const canvas = document.getElementById('starfield');
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create stars
        const stars = Array.from({ length: 200 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * 3,
            ox: 0,
            oy: 0,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.3 + 0.05,
        }));

        // Create nodes for network effect
        const nodes = Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 2 + 1,
        }));

        let time = 0;
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {
            time += 0.005;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Deep background gradient
            const bg = ctx.createRadialGradient(
                canvas.width * 0.3, canvas.height * 0.3, 0,
                canvas.width / 2, canvas.height / 2,
                canvas.width * 0.8
            );
            bg.addColorStop(0, 'rgba(15, 25, 50, 1)');
            bg.addColorStop(0.4, 'rgba(8, 14, 32, 1)');
            bg.addColorStop(1, 'rgba(4, 6, 14, 1)');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Subtle grid pattern
            ctx.strokeStyle = 'rgba(56, 130, 246, 0.03)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < canvas.width; i += 50) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }
            for (let i = 0; i < canvas.height; i += 50) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
            }

            // Draw and update stars
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            stars.forEach((star) => {
                star.z += star.speed;
                if (star.z > 3) {
                    star.z = 0;
                    star.x = Math.random() * canvas.width;
                    star.y = Math.random() * canvas.height;
                }

                const scale = star.z / 3;
                const x = star.x + (mouseX - canvas.width / 2) * scale * 0.01;
                const y = star.y + (mouseY - canvas.height / 2) * scale * 0.01;

                ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * scale})`;
                ctx.fillRect(x, y, star.size * scale, star.size * scale);
            });

            // Update and draw nodes
            nodes.forEach((node) => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                ctx.fillStyle = 'rgba(56, 130, 246, 0.4)';
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw connections between nodes
            ctx.strokeStyle = 'rgba(56, 130, 246, 0.1)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 200) {
                        ctx.globalAlpha = 1 - dist / 200;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        animate();

        // ============ NAVIGATION SCROLL EFFECT ============
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // ============ MOBILE MENU TOGGLE ============
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const navDesktop = document.getElementById('nav-desktop');
        const navCta = document.getElementById('nav-cta');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
            mobileMenuBtn.textContent = mobileMenu.classList.contains('show') ? '✕' : '☰';
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
                mobileMenuBtn.textContent = '☰';
            });
        });

        // Show/hide desktop nav and CTA on resize
        function handleResize() {
            if (window.innerWidth >= 768) {
                navDesktop.classList.add('show');
                navCta.classList.add('show');
                mobileMenuBtn.classList.add('hide');
            } else {
                navDesktop.classList.remove('show');
                navCta.classList.remove('show');
                mobileMenuBtn.classList.remove('hide');
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        // ============ CONTACT FORM HANDLING ============
        const contactForm = document.getElementById('contact-form');
        const successMessage = document.getElementById('success-message');

        if (contactForm && successMessage) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                contactForm.style.animation = 'fadeInUp 0.6s ease-out forwards';
                contactForm.style.opacity = '0';
                
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'flex';
                    successMessage.style.animation = 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                }, 600);

                setTimeout(() => {
                    successMessage.style.animation = 'fadeInUp 0.6s ease-out reverse forwards';
                    
                    setTimeout(() => {
                        contactForm.style.display = 'block';
                        contactForm.style.opacity = '1';
                        contactForm.style.animation = 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                        successMessage.style.display = 'none';
                        contactForm.reset();
                    }, 600);
                }, 3000);
            });
        }

        // ============ ELEMENT BOUNCE ON LOAD ============
        window.addEventListener('load', () => {
            document.querySelectorAll('.hero-content > *').forEach((el, index) => {
                el.style.animation = `fadeInUp 0.8s ease ${index * 0.15}s both`;
            });
        });

        // ============ INTERACTIVE CURSOR EFFECTS ============
        document.querySelectorAll('.btn, .social-link, .nav-item').forEach((el) => {
            el.style.cursor = 'pointer';
            el.addEventListener('mouseenter', function () {
                this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });
        });
    </script>
</body>
</html>
