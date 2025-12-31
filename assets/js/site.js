/**
 * Moments.top Official Website JavaScript
 * Scroll animations, theme toggle, and interactive components
 */

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const CONFIG = {
        animationThreshold: 0.15,
        animationRootMargin: '0px 0px -50px 0px',
        staggerDelay: 100,
        headerScrollThreshold: 100
    };

    // ===== SCROLL ANIMATION SYSTEM =====
    class ScrollAnimator {
        constructor() {
            this.observer = null;
            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }

        setup() {
            this.observer = new IntersectionObserver(
                this.handleIntersection.bind(this),
                {
                    threshold: CONFIG.animationThreshold,
                    rootMargin: CONFIG.animationRootMargin
                }
            );

            this.observeElements();
        }

        observeElements() {
            const elements = document.querySelectorAll('[data-animate]');

            elements.forEach((el) => {
                // Set initial hidden state
                el.classList.add('animate-hidden');

                // Handle stagger groups
                const staggerGroup = el.closest('[data-animate-stagger]');
                if (staggerGroup) {
                    const siblings = staggerGroup.querySelectorAll('[data-animate]');
                    const staggerIndex = Array.from(siblings).indexOf(el);
                    el.style.transitionDelay = `${staggerIndex * CONFIG.staggerDelay}ms`;
                }

                this.observer.observe(el);
            });
        }

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;

                    // Small delay for smoother feel
                    requestAnimationFrame(() => {
                        el.classList.remove('animate-hidden');
                        el.classList.add('animate-visible');
                    });

                    // Unobserve after animation (one-time)
                    if (!el.hasAttribute('data-animate-repeat')) {
                        this.observer.unobserve(el);
                    }
                }
            });
        }
    }

    // ===== THEME MANAGER =====
    class ThemeManager {
        constructor() {
            this.theme = localStorage.getItem('moments-theme') || 'dark';
            this.init();
        }

        init() {
            document.documentElement.setAttribute('data-theme', this.theme);
            this.updateToggleIcon();
            this.bindEvents();
        }

        bindEvents() {
            const toggleBtn = document.querySelector('[data-theme-toggle]');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.toggle());
            }
        }

        toggle() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', this.theme);
            localStorage.setItem('moments-theme', this.theme);
            this.updateToggleIcon();
        }

        updateToggleIcon() {
            const sunIcon = document.querySelector('.icon--sun');
            const moonIcon = document.querySelector('.icon--moon');

            if (sunIcon && moonIcon) {
                if (this.theme === 'dark') {
                    sunIcon.style.display = 'block';
                    moonIcon.style.display = 'none';
                } else {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                }
            }
        }
    }

    // ===== MOBILE NAVIGATION =====
    class MobileNav {
        constructor() {
            this.nav = document.querySelector('.nav');
            this.toggle = document.querySelector('.nav__toggle');
            this.menu = document.querySelector('.nav__menu');
            this.isOpen = false;
            this.init();
        }

        init() {
            if (this.toggle) {
                this.toggle.addEventListener('click', () => this.toggleMenu());

                // Close menu when clicking nav links
                const links = document.querySelectorAll('.nav__link');
                links.forEach(link => {
                    link.addEventListener('click', () => {
                        if (this.isOpen) this.toggleMenu();
                    });
                });
            }
        }

        toggleMenu() {
            this.isOpen = !this.isOpen;
            this.nav.classList.toggle('nav--open', this.isOpen);
            this.toggle.setAttribute('aria-expanded', this.isOpen);
            document.body.style.overflow = this.isOpen ? 'hidden' : '';
        }
    }

    // ===== HEADER SCROLL EFFECT =====
    class HeaderScroll {
        constructor() {
            this.header = document.querySelector('.header');
            this.init();
        }

        init() {
            if (!this.header) return;

            // Initial check
            this.checkScroll();

            // Listen for scroll
            window.addEventListener('scroll', () => this.checkScroll(), { passive: true });
        }

        checkScroll() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollY > CONFIG.headerScrollThreshold) {
                this.header.classList.add('header--scrolled');
            } else {
                this.header.classList.remove('header--scrolled');
            }
        }
    }

    // ===== SMOOTH SCROLL =====
    class SmoothScroll {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;

                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    }

    // ===== PRICING TOGGLE =====
    class PricingToggle {
        constructor() {
            this.toggle = document.querySelector('.pricing__toggle-switch');
            this.isYearly = false;
            this.init();
        }

        init() {
            if (!this.toggle) return;

            this.toggle.addEventListener('click', () => this.handleToggle());
        }

        handleToggle() {
            this.isYearly = !this.isYearly;
            this.toggle.setAttribute('aria-checked', this.isYearly);

            // Update labels
            const labels = document.querySelectorAll('.pricing__toggle-label');
            labels.forEach((label, index) => {
                label.classList.toggle('pricing__toggle-label--active',
                    (index === 0 && !this.isYearly) || (index === 1 && this.isYearly)
                );
            });

            // Update prices
            const amounts = document.querySelectorAll('.pricing-card__amount[data-monthly]');
            amounts.forEach(amount => {
                const monthly = amount.getAttribute('data-monthly');
                const yearly = amount.getAttribute('data-yearly');
                amount.textContent = this.isYearly ? yearly : monthly;
            });
        }
    }

    // ===== TESTIMONIALS CAROUSEL =====
    class TestimonialsCarousel {
        constructor() {
            this.track = document.querySelector('.testimonials__track');
            this.cards = document.querySelectorAll('.testimonial-card');
            this.dots = document.querySelectorAll('.testimonials__dot');
            this.prevBtn = document.querySelector('.testimonials__nav-btn--prev');
            this.nextBtn = document.querySelector('.testimonials__nav-btn--next');
            this.currentIndex = 0;
            this.init();
        }

        init() {
            if (!this.track || this.cards.length === 0) return;

            // Only enable carousel on mobile
            if (window.innerWidth < 768) {
                this.enableCarousel();
            }

            window.addEventListener('resize', () => {
                if (window.innerWidth < 768) {
                    this.enableCarousel();
                } else {
                    this.disableCarousel();
                }
            });
        }

        enableCarousel() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prev());
            }
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.next());
            }

            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goTo(index));
            });

            this.updateCarousel();
        }

        disableCarousel() {
            this.cards.forEach(card => {
                card.style.display = '';
            });
        }

        prev() {
            this.currentIndex = Math.max(0, this.currentIndex - 1);
            this.updateCarousel();
        }

        next() {
            this.currentIndex = Math.min(this.cards.length - 1, this.currentIndex + 1);
            this.updateCarousel();
        }

        goTo(index) {
            this.currentIndex = index;
            this.updateCarousel();
        }

        updateCarousel() {
            // Update cards visibility
            this.cards.forEach((card, index) => {
                card.style.display = index === this.currentIndex ? 'block' : 'none';
            });

            // Update dots
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('testimonials__dot--active', index === this.currentIndex);
            });
        }
    }

    // ===== INITIALIZE =====
    window.MomentsSite = {
        scrollAnimator: new ScrollAnimator(),
        themeManager: new ThemeManager(),
        mobileNav: new MobileNav(),
        headerScroll: new HeaderScroll(),
        smoothScroll: new SmoothScroll(),
        pricingToggle: new PricingToggle(),
        testimonialsCarousel: new TestimonialsCarousel()
    };

    console.log('Moments.top site initialized');

})();
