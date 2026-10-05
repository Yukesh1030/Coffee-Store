/**
 * STACKLY COFFEE — Master Application Logic & GSAP Signature Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader Logic
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
        initHeroAnimations();
      }, 500);
    });
    // Fallback if load already triggered
    setTimeout(() => {
      if (!preloader.classList.contains('loaded')) {
        preloader.classList.add('loaded');
        initHeroAnimations();
      }
    }, 1800);
  } else {
    initHeroAnimations();
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Hamburger Menu Functionality
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');

  function toggleMobileMenu(open = null) {
    const isOpen = open !== null ? open : !mobileNavDrawer.classList.contains('open');
    if (isOpen) {
      hamburgerBtn?.classList.add('active');
      mobileNavDrawer?.classList.add('open');
      mobileNavBackdrop?.classList.add('open');
      document.body.style.overflow = 'hidden';

      if (typeof gsap !== 'undefined') {
        gsap.from('.mobile-link', {
          x: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    } else {
      hamburgerBtn?.classList.remove('active');
      mobileNavDrawer?.classList.remove('open');
      mobileNavBackdrop?.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  hamburgerBtn?.addEventListener('click', () => toggleMobileMenu());
  mobileNavBackdrop?.addEventListener('click', () => toggleMobileMenu(false));

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavDrawer?.classList.contains('open')) {
      toggleMobileMenu(false);
    }
  });

  // 4. Hero Signature Animations (GSAP)
  function initHeroAnimations() {
    if (typeof gsap === 'undefined' || !document.querySelector('.hero-section')) return;

    // Steam & floating particles
    const particleContainer = document.getElementById('heroParticles');
    if (particleContainer) {
      for (let i = 0; i < 16; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 80 + 20;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        particleContainer.appendChild(p);

        gsap.to(p, {
          y: -120 - Math.random() * 100,
          x: (Math.random() - 0.5) * 80,
          opacity: Math.random() * 0.4 + 0.1,
          duration: Math.random() * 4 + 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2
        });
      }
    }

    const heroTl = gsap.timeline();
    heroTl.from('.hero-est', { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out' })
          .from('.hero-headline span', { opacity: 0, y: 40, stagger: 0.15, duration: 0.9, ease: 'power3.out' }, '-=0.4')
          .from('.hero-description', { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out' }, '-=0.4')
          .from('.hero-cta-group .btn', { opacity: 0, scale: 0.9, stagger: 0.15, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.3')
          .from('.scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.2');

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Hero background slow zoom
      gsap.to('.hero-bg-img', {
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        scale: 1.25,
        y: 80
      });

      // Brand Statement large typography reveal
      gsap.from('.brand-statement-text span', {
        scrollTrigger: {
          trigger: '.brand-statement-section',
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      });
    }
  }

  // 5. Interactive Roasting Story
  const roastData = [
    {
      step: '01',
      title: 'Ethical Sourcing',
      desc: 'Selected directly from altitude-blessed smallholder estates across Yirgacheffe, Huila, and Minas Gerais. Every single green bean meets Specialty Coffee Association (SCA) 86+ standards.',
      badge: 'Single Origin Lots',
      image: 'assets/source-beans.webp'
    },
    {
      step: '02',
      title: 'Hand Selection & Density Sort',
      desc: 'Screened for density, moisture percentage, and defect-free uniformity. Only the top 5% of picked cherries make it into the STACKLY roasting inventory.',
      badge: 'Rigorous Sorting',
      image: 'assets/select-beans.webp'
    },
    {
      step: '03',
      title: 'Precision Drum Roasting',
      desc: 'Roasted in cast-iron small-batch drums with custom thermal air profiling. Developing delicate floral aromatics without masking the natural sweetness.',
      badge: 'Artisan Profiling',
      image: 'assets/roasting-process.webp'
    },
    {
      step: '04',
      title: 'Dialed Micrometric Grind',
      desc: 'Ground on titanium flat burrs calibrated within microns to guarantee optimal surface area for balanced espresso, silky pour-over, or cold extraction.',
      badge: 'Micron Accuracy',
      image: 'assets/grind-coffee.webp'
    },
    {
      step: '05',
      title: 'The Intentional Brew',
      desc: 'Extracted at precisely 93.5°C under controlled atmospheric pressure. Bringing forth the rich crema, vibrant notes, and lingering chocolate finish to your cup.',
      badge: 'Perfect Cup',
      image: 'assets/brew-cup.webp'
    }
  ];

  const roastStepBtns = document.querySelectorAll('.roast-step-btn');
  const roastProgress = document.getElementById('roastProgress');
  const roastStepNumber = document.getElementById('roastStepNumber');
  const roastStepTitle = document.getElementById('roastStepTitle');
  const roastStepDesc = document.getElementById('roastStepDesc');
  const roastStepBadge = document.getElementById('roastStepBadge');
  const roastStepImg = document.getElementById('roastStepImg');

  function setRoastStep(index) {
    if (!roastData[index]) return;
    const data = roastData[index];

    roastStepBtns.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    if (roastProgress) {
      roastProgress.style.width = `${(index / (roastData.length - 1)) * 100}%`;
    }

    if (roastStepImg) {
      if (typeof gsap !== 'undefined') {
        gsap.to(roastStepImg, {
          opacity: 0.3,
          scale: 0.95,
          duration: 0.25,
          onComplete: () => {
            roastStepImg.src = data.image;
            gsap.to(roastStepImg, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' });
          }
        });
      } else {
        roastStepImg.src = data.image;
      }
    }

    if (roastStepNumber) roastStepNumber.textContent = data.step;
    if (roastStepTitle) roastStepTitle.textContent = data.title;
    if (roastStepDesc) roastStepDesc.textContent = data.desc;
    if (roastStepBadge) roastStepBadge.textContent = data.badge;
  }

  roastStepBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => setRoastStep(index));
  });

  // 6. Interactive Coffee Origin Switcher
  const originData = {
    ethiopia: {
      title: 'Ethiopia Yirgacheffe',
      altitude: '1,800m - 2,200m',
      process: 'Washed / Sun Dried',
      variety: 'Heirloom',
      notes: 'Floral, Bergamot, Wild Honey, Apricot',
      desc: 'Grown in high-altitude volcanic soils of southern Ethiopia. Celebrated globally for its jasmine-like perfume and tea-like elegance that transforms everyday mornings into meditation.',
      image: 'assets/ethiopia.webp',
      price: '₹680'
    },
    colombia: {
      title: 'Colombia Huila Supremo',
      altitude: '1,600m - 1,950m',
      process: 'Washed Extended Fermentation',
      variety: 'Castillo & Caturra',
      notes: 'Caramel, Red Apple, Cane Sugar, Dark Chocolate',
      desc: 'Nestled between the Andean peaks of Huila. Deeply sweet with juicy acidity, round syrupy mouthfeel, and a lingering cocoa finish that pairs sublimely with milk or black filter.',
      image: 'assets/colombia.webp',
      price: '₹720'
    },
    brazil: {
      title: 'Brazil Santos Cerrado',
      altitude: '1,100m - 1,300m',
      process: 'Natural Pulp Dried',
      variety: 'Mundo Novo & Bourbon',
      notes: 'Roasted Hazelnut, Milk Chocolate, Low Acidity',
      desc: 'Sun-drenched savanna plains of Cerrado Mineiro. Exceptionally smooth and full-bodied with low acidity and rich nutty tones, serving as the soulful backbone of our signature espresso.',
      image: 'assets/brazil.webp',
      price: '₹640'
    }
  };

  const originBtns = document.querySelectorAll('.origin-tab-btn');
  const originTitle = document.getElementById('originTitle');
  const originAltitude = document.getElementById('originAltitude');
  const originProcess = document.getElementById('originProcess');
  const originVariety = document.getElementById('originVariety');
  const originNotes = document.getElementById('originNotes');
  const originDesc = document.getElementById('originDesc');
  const originImg = document.getElementById('originImg');

  function setOrigin(key) {
    const data = originData[key];
    if (!data) return;

    originBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.origin === key);
    });

    if (originImg) {
      if (typeof gsap !== 'undefined') {
        gsap.to(originImg, {
          opacity: 0.3,
          duration: 0.25,
          onComplete: () => {
            originImg.src = data.image;
            gsap.to(originImg, { opacity: 1, duration: 0.4 });
          }
        });
      } else {
        originImg.src = data.image;
      }
    }

    if (originTitle) originTitle.textContent = data.title;
    if (originAltitude) originAltitude.textContent = data.altitude;
    if (originProcess) originProcess.textContent = data.process;
    if (originVariety) originVariety.textContent = data.variety;
    if (originNotes) originNotes.textContent = data.notes;
    if (originDesc) originDesc.textContent = data.desc;
  }

  originBtns.forEach(btn => {
    btn.addEventListener('click', () => setOrigin(btn.dataset.origin));
  });

  // 7. Menu Hover Drink Image Preview
  const menuPreviewItems = document.querySelectorAll('.menu-preview-item');
  const menuPreviewImg = document.getElementById('menuPreviewImg');

  menuPreviewItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const imgSrc = item.dataset.img;
      menuPreviewItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');

      if (menuPreviewImg && imgSrc) {
        menuPreviewImg.style.opacity = '0.3';
        setTimeout(() => {
          menuPreviewImg.src = imgSrc;
          menuPreviewImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  // 8. Statistics Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(stat => {
            const target = parseFloat(stat.dataset.count);
            const prefix = stat.dataset.prefix || '';
            const suffix = stat.dataset.suffix || '';
            const decimals = stat.dataset.decimals ? parseInt(stat.dataset.decimals) : 0;
            let current = 0;
            const duration = 2000;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              stat.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
            }, stepTime);
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });

    const statsSec = document.querySelector('.stats-section');
    if (statsSec) observer.observe(statsSec);
  }

  // 9. Newsletter Form Validation
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value.includes('@')) {
        alert(`Thank you for subscribing! A welcome coffee guide has been sent to ${input.value}.`);
        input.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  // 10. Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const phone = document.getElementById('contactPhone')?.value.trim();
      const subject = document.getElementById('contactSubject')?.value.trim();
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !phone || !subject || !message) {
        alert('Please fill out all required fields before submitting.');
        return;
      }

      if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      alert(`Thank you, ${name}! Your message regarding "${subject}" has been received. Our team will contact you shortly.`);
      contactForm.reset();
    });
  }
});
