/**
 * ENZO TEAM - Main JavaScript
 * جميع الوظائف التفاعلية للموقع
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ================================================================
    // 1. MOBILE MENU TOGGLE
    // ================================================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('open');
        });

        // Close menu on link click
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('open');
            });
        });
    }

    // ================================================================
    // 2. HEADER SCROLL EFFECT
    // ================================================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ================================================================
    // 3. BACK TO TOP BUTTON
    // ================================================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ================================================================
    // 4. STATISTICS ANIMATION COUNTER
    // ================================================================
    const statItems = document.querySelectorAll('.stat-item');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        
        const triggerPoint = window.innerHeight * 0.8;
        const statsSection = document.getElementById('statistics');
        
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        
        if (rect.top < triggerPoint) {
            statsAnimated = true;
            
            statItems.forEach((item, index) => {
                const target = parseInt(item.dataset.count);
                const statNumber = item.querySelector('.stat-number');
                let current = 0;
                const increment = Math.ceil(target / 80);
                const duration = 2000;
                const stepTime = Math.floor(duration / 80);
                
                // For percentage (98%)
                const isPercentage = target === 98;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    if (isPercentage) {
                        statNumber.textContent = current + '%';
                    } else {
                        statNumber.textContent = current + '+';
                    }
                }, stepTime);
            });
        }
    }

    // Check on scroll
    window.addEventListener('scroll', animateStats);
    // Check on load
    setTimeout(animateStats, 500);

    // ================================================================
    // 5. LANGUAGE SWITCHER (Demo)
    // ================================================================
    const langBtns = document.querySelectorAll('.lang-btn');
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            langBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const lang = this.dataset.lang;
            
            // Demo: Show alert (in production, this would change all text)
            if (lang === 'en') {
                console.log('Switched to English');
                // In real implementation: change all text to English
                // For now, just a visual feedback
                document.querySelector('.hero-tag').textContent = '🚀 ENZO TEAM';
                document.querySelector('.hero-title').innerHTML = 
                    'Your Digital <span class="hero-title-highlight">Shield</span>';
                document.querySelector('.hero-desc').innerHTML = 
                    'We provide integrated technology solutions for individuals and companies in ' +
                    '<span class="highlight-text">Cybersecurity</span>, ' +
                    '<span class="highlight-text">Ethical Hacking</span>, ' +
                    '<span class="highlight-text">Programming</span>, and Technical Support';
            } else {
                console.log('Switched to Arabic');
                document.querySelector('.hero-tag').textContent = '🚀 ENZO TEAM';
                document.querySelector('.hero-title').innerHTML = 
                    'درعك الرقمي <span class="hero-title-highlight">المتكامل</span>';
                document.querySelector('.hero-desc').innerHTML = 
                    'نقدم حلولاً تقنية متكاملة للأفراد والشركات في ' +
                    '<span class="highlight-text">الأمن السيبراني</span>، ' +
                    '<span class="highlight-text">الاختراق الأخلاقي</span>، ' +
                    '<span class="highlight-text">البرمجة</span>، والدعم التقني';
            }
        });
    });

    // ================================================================
    // 6. SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================================================
    // 7. PARTICLES EFFECT (Hero Background)
    // ================================================================
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        const particleCount = 40;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 10;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(192, 192, 192, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
                pointer-events: none;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Add particle animation keyframes dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: ${Math.random() * 0.5 + 0.3};
            }
            25% {
                transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(${Math.random() * 1.5 + 0.5});
                opacity: ${Math.random() * 0.5 + 0.3};
            }
            50% {
                transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(${Math.random() * 1.5 + 0.5});
                opacity: ${Math.random() * 0.5 + 0.3};
            }
            75% {
                transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(${Math.random() * 1.5 + 0.5});
                opacity: ${Math.random() * 0.5 + 0.3};
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // ================================================================
    // 8. SERVICE CARD INTERACTION (Hover Glow)
    // ================================================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--gold)';
            this.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(192, 192, 192, 0.08)';
            this.style.boxShadow = 'none';
        });
    });

    // ================================================================
    // 9. TESTIMONIALS AUTO SLIDE (Optional)
    // ================================================================
    // This is a simple auto-slide for testimonials on mobile
    // In a full implementation, you'd use a proper slider library

    console.log('🚀 Enzo Team website loaded successfully!');
    console.log('🔒 Designed with security and professionalism in mind.');
});