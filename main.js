/**
 * STACKLY COFFEE — Master Application Logic & GSAP Signature Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global form validation helpers
  window.showFieldError = function(inputElement, message) {
    if (!inputElement) return;
    window.clearFieldError(inputElement);
    const p = document.createElement('p');
    p.className = 'field-error-msg';
    p.style.color = '#ef4444'; // Red color
    p.style.fontSize = '0.85rem';
    p.style.marginTop = '6px';
    p.style.marginBottom = '0';
    p.style.fontWeight = '500';
    p.textContent = message;
    
    const wrapper = inputElement.closest('.auth-input-wrapper') || inputElement;
    wrapper.parentNode.insertBefore(p, wrapper.nextSibling);
    inputElement.style.borderColor = '#ef4444';
  };

  window.clearFieldError = function(inputElement) {
    if (!inputElement) return;
    const wrapper = inputElement.closest('.auth-input-wrapper') || inputElement;
    const next = wrapper.nextElementSibling;
    if (next && next.classList.contains('field-error-msg')) {
      next.remove();
    }
    inputElement.style.borderColor = '';
  };

  // Dynamic Dashboard User Name logic
  const currentUserStr = localStorage.getItem('stackly_current_user');
  if (currentUserStr) {
    try {
      const currentUser = JSON.parse(currentUserStr);
      if (currentUser && currentUser.name) {
        document.querySelectorAll('.dashboard-user-name').forEach(el => {
          el.textContent = currentUser.name;
        });
        document.querySelectorAll('.dashboard-user-avatar').forEach(el => {
          el.textContent = currentUser.name.charAt(0).toUpperCase();
        });
      }
    } catch (e) {
      console.error('Error parsing current user', e);
    }
  }

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

  // 3. Hamburger Menu Functionality (Full-Page Overlay with Full Functionality)
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavCloseBtn = document.getElementById('mobileNavCloseBtn');

  function toggleMobileMenu(open = null) {
    if (!mobileNavDrawer) return;
    const isOpen = open !== null ? open : !mobileNavDrawer.classList.contains('open');
    if (isOpen) {
      hamburgerBtn?.classList.add('active');
      mobileNavDrawer.classList.add('open');
      mobileNavBackdrop?.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      if (typeof gsap !== 'undefined') {
        gsap.fromTo('.mobile-link', 
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.06, duration: 0.35, ease: 'power2.out', clearProps: 'opacity,transform' }
        );
        gsap.fromTo('.fullpage-info-section',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, delay: 0.15, ease: 'power2.out', clearProps: 'opacity,transform' }
        );
      }
    } else {
      hamburgerBtn?.classList.remove('active');
      mobileNavDrawer.classList.remove('open');
      mobileNavBackdrop?.classList.remove('open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }

  hamburgerBtn?.addEventListener('click', () => toggleMobileMenu());
  mobileNavCloseBtn?.addEventListener('click', () => toggleMobileMenu(false));
  mobileNavBackdrop?.addEventListener('click', () => toggleMobileMenu(false));

  document.querySelectorAll('.mobile-link, .fullpage-actions .btn').forEach(link => {
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
      const email = input ? input.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        if (input) input.focus();
        return;
      }

      window.location.href = '404.html';
    });
  }

  // 10. Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const phoneInput = document.getElementById('contactPhone');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      window.clearFieldError(nameInput);
      window.clearFieldError(emailInput);
      window.clearFieldError(phoneInput);
      window.clearFieldError(subjectInput);
      window.clearFieldError(messageInput);

      let isValid = true;

      if (!name || name.length < 2) {
        window.showFieldError(nameInput, 'Please enter your full name (at least 2 characters).');
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        window.showFieldError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      }

      const digits = phone.replace(/\D/g, '');
      if (!phone || digits.length < 10) {
        window.showFieldError(phoneInput, 'Please enter a valid phone number (at least 10 digits).');
        isValid = false;
      }

      if (!subject || subject.length < 2) {
        window.showFieldError(subjectInput, 'Please enter an inquiry subject.');
        isValid = false;
      }

      if (!message || message.length < 5) {
        window.showFieldError(messageInput, 'Please enter a message (at least 5 characters).');
        isValid = false;
      }

      if (isValid) {
        window.location.href = '404.html';
      }
    });
  }

  // 11. Menu Page Interactive Enhancements (GSAP Animations & Customization Atelier)
  function initMenuEnhancements() {
    const customSection = document.getElementById('customizationSection');
    if (!customSection) return;

    // ScrollTrigger entrance animations
    if (typeof gsap !== 'undefined') {
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Customization Atelier section animations disabled to fix visibility glitch

        // Flights and Hoppers animations disabled to fix visibility glitch


        // Science section animations disabled to fix visibility glitch
      }
    }

    // Atelier Tab Switcher
    const tabBtns = document.querySelectorAll('.custom-tab-btn');
    const panels = document.querySelectorAll('.custom-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        panels.forEach(p => {
          if (p.id === `panel-${targetTab}`) {
            p.classList.add('active');
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(p.children, 
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out' }
              );
            }
          } else {
            p.classList.remove('active');
          }
        });
      });
    });

    // Interactive Card Click & Dynamic Flavor Radar Updates
    const customCards = document.querySelectorAll('.custom-card');
    const flavorFillBody = document.getElementById('flavorFillBody');
    const flavorFillSweet = document.getElementById('flavorFillSweet');
    const flavorFillAcidity = document.getElementById('flavorFillAcidity');
    const flavorFillCrema = document.getElementById('flavorFillCrema');
    const flavorValBody = document.getElementById('flavorValBody');
    const flavorValSweet = document.getElementById('flavorValSweet');
    const flavorValAcidity = document.getElementById('flavorValAcidity');
    const flavorValCrema = document.getElementById('flavorValCrema');
    const flavorSelectedTitle = document.getElementById('flavorSelectedTitle');
    const flavorSelectedPairing = document.getElementById('flavorSelectedPairing');

    customCards.forEach(card => {
      card.addEventListener('click', () => {
        const panel = card.closest('.custom-panel');
        if (panel) {
          panel.querySelectorAll('.custom-card').forEach(c => c.classList.remove('selected'));
        }
        card.classList.add('selected');

        // Micro-bounce
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(card, { scale: 0.97 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
        }

        const name = card.getAttribute('data-name');
        const body = card.getAttribute('data-body') || 80;
        const sweet = card.getAttribute('data-sweetness') || 70;
        const acid = card.getAttribute('data-acidity') || 40;
        const crema = card.getAttribute('data-crema') || 85;
        const pairing = card.getAttribute('data-pairing') || 'Espresso & Filter';

        if (flavorSelectedTitle) flavorSelectedTitle.textContent = name;
        if (flavorSelectedPairing) {
          flavorSelectedPairing.innerHTML = `Recommended drink pairing: <strong>${pairing}</strong>. Harmonizes beautifully with our seasonal roast profiles.`;
        }

        if (flavorValBody) flavorValBody.textContent = `${body}%`;
        if (flavorValSweet) flavorValSweet.textContent = `${sweet}%`;
        if (flavorValAcidity) flavorValAcidity.textContent = `${acid}%`;
        if (flavorValCrema) flavorValCrema.textContent = `${crema}%`;

        if (typeof gsap !== 'undefined') {
          if (flavorFillBody) gsap.to(flavorFillBody, { width: `${body}%`, duration: 0.5, ease: 'power2.out' });
          if (flavorFillSweet) gsap.to(flavorFillSweet, { width: `${sweet}%`, duration: 0.5, ease: 'power2.out' });
          if (flavorFillAcidity) gsap.to(flavorFillAcidity, { width: `${acid}%`, duration: 0.5, ease: 'power2.out' });
          if (flavorFillCrema) gsap.to(flavorFillCrema, { width: `${crema}%`, duration: 0.5, ease: 'power2.out' });
        } else {
          if (flavorFillBody) flavorFillBody.style.width = `${body}%`;
          if (flavorFillSweet) flavorFillSweet.style.width = `${sweet}%`;
          if (flavorFillAcidity) flavorFillAcidity.style.width = `${acid}%`;
          if (flavorFillCrema) flavorFillCrema.style.width = `${crema}%`;
        }
      });
    });

    const applyCustomBtn = document.getElementById('applyCustomBtn');
    if (applyCustomBtn) {
      applyCustomBtn.addEventListener('click', () => {
        const selected = document.querySelector('.custom-card.selected');
        const itemName = selected ? selected.getAttribute('data-name') : 'Custom Profile';
        if (typeof showToast === 'function') {
          showToast(`Customization applied: ${itemName}`);
        } else {
          alert(`Customization "${itemName}" added to your drink selection!`);
        }
      });
    }
  }

  function initNewPageAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const animSelectors = ['.shop-gsap-fade', '.about-gsap-fade', '.contact-gsap-fade'];
      
      animSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          elements.forEach(el => {
            gsap.fromTo(el, 
              { opacity: 0, y: 30 },
              {
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
              }
            );
          });
        }
      });
    }
  }

  initMenuEnhancements();
  initNewPageAnimations();
});

function toggleSidebar(forceState) {
  const sidebar = document.querySelector(".dashboard-sidebar");
  const overlay = document.querySelector(".dashboard-overlay");
  if (!sidebar) return;

  const shouldOpen = (typeof forceState === 'boolean') ? forceState : !sidebar.classList.contains("active");

  if (shouldOpen) {
    sidebar.classList.add("active");
    if (overlay) overlay.classList.add("active");
    document.body.classList.add("sidebar-open");
  } else {
    sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.classList.remove("sidebar-open");
  }
}
window.toggleSidebar = toggleSidebar;

// Close dashboard sidebar on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    toggleSidebar(false);
  }
});

// Auto-close sidebar on mobile when a navigation link is clicked
document.addEventListener("click", (e) => {
  if (e.target.closest(".sidebar-link")) {
    if (window.innerWidth <= 1024) {
      toggleSidebar(false);
    }
  }
});

// ==========================================================================
// DASHBOARD PAGES: NON-SIDEBAR LINKS DIRECT TO 404 & FORM VALIDATION TO 404
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Only apply to dashboard pages
  if (!document.body.classList.contains("dashboard-body")) return;

  // 1. Ensure all non-sidebar links route to 404.html
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    // Preserve sidebar menu links and logo
    if (link.closest(".dashboard-sidebar")) return;

    // Any other link outside sidebar must direct to 404.html
    const href = link.getAttribute("href");
    if (!href || href === "#" || href === "javascript:void(0);" || href !== "404.html") {
      e.preventDefault();
      window.location.href = "404.html";
    }
  });

  // 2. Universal form validation for all forms on dashboard pages
  const forms = document.querySelectorAll(".dashboard-main form, .dashboard-layout form");
  forms.forEach(form => {
    // Clear errors on field input
    form.querySelectorAll("input, textarea, select").forEach(field => {
      field.addEventListener("input", () => {
        if (typeof window.clearFieldError === "function") {
          window.clearFieldError(field);
        }
      });
    });

    // Form submission validation
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;
      let firstInvalidField = null;

      const fields = form.querySelectorAll("input:not([type='hidden']):not([type='submit']):not([type='button']), textarea");
      fields.forEach(field => {
        if (field.type === "checkbox" || field.type === "radio") return;

        const val = field.value.trim();
        const type = (field.getAttribute("type") || field.tagName.toLowerCase()).toLowerCase();
        const isEmail = type === "email" || (field.id && field.id.toLowerCase().includes("email"));
        const labelText = field.closest("div")?.querySelector("label")?.textContent || field.placeholder || "Field";
        const cleanLabel = labelText.replace(/[:*]/g, "").trim();

        if (!val) {
          isValid = false;
          if (typeof window.showFieldError === "function") {
            window.showFieldError(field, `${cleanLabel} is required.`);
          }
          if (!firstInvalidField) firstInvalidField = field;
        } else if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          isValid = false;
          if (typeof window.showFieldError === "function") {
            window.showFieldError(field, "Please enter a valid email address.");
          }
          if (!firstInvalidField) firstInvalidField = field;
        } else {
          if (typeof window.clearFieldError === "function") {
            window.clearFieldError(field);
          }
        }
      });

      if (!isValid) {
        if (firstInvalidField) firstInvalidField.focus();
        return;
      }

      // Valid submission: redirect to 404 page
      window.location.href = "404.html";
    });
  });
});


