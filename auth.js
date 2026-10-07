/**
 * STACKLY COFFEE — Authentication Logic
 * Supports Client & Admin login redirection, validation, eye toggle, and GSAP animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global form validation helpers
  window.showFieldError = window.showFieldError || function(inputElement, message) {
    if (!inputElement) return;
    window.clearFieldError(inputElement);
    const p = document.createElement('p');
    p.className = 'field-error-msg';
    p.style.color = '#ef4444';
    p.style.fontSize = '0.85rem';
    p.style.marginTop = '6px';
    p.style.marginBottom = '0';
    p.style.fontWeight = '500';
    p.textContent = message;
    
    const wrapper = inputElement.closest('.auth-input-wrapper') || inputElement;
    wrapper.parentNode.insertBefore(p, wrapper.nextSibling);
    inputElement.style.borderColor = '#ef4444';
  };

  window.clearFieldError = window.clearFieldError || function(inputElement) {
    if (!inputElement) return;
    const wrapper = inputElement.closest('.auth-input-wrapper') || inputElement;
    const next = wrapper.nextElementSibling;
    if (next && next.classList.contains('field-error-msg')) {
      next.remove();
    }
    inputElement.style.borderColor = '';
  };
  // Preloader Logic
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 400);
    });
    setTimeout(() => {
      if (!preloader.classList.contains('loaded')) {
        preloader.classList.add('loaded');
      }
    }, 1500);
  }

  // GSAP Entrance Animation
  if (typeof gsap !== 'undefined') {
    gsap.from('.auth-card', {
      duration: 0.9,
      y: 40,
      opacity: 0,
      ease: 'power3.out'
    });
    gsap.from('.auth-header', {
      duration: 0.7,
      y: -20,
      opacity: 0,
      delay: 0.1,
      ease: 'power2.out'
    });
  }

  // Password Visibility Toggle
  const toggleBtns = document.querySelectorAll('.password-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input && input.tagName === 'INPUT') {
        if (input.type === 'password') {
          input.type = 'text';
          btn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
        } else {
          input.type = 'password';
          btn.innerHTML = '<i class="fa-regular fa-eye"></i>';
        }
      }
    });
  });

  // Handle Login Form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginAs = document.getElementById('loginAs').value;
      const emailInput = document.getElementById('loginEmail');
      const passwordInput = document.getElementById('loginPassword');
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      window.clearFieldError(emailInput);
      window.clearFieldError(passwordInput);

      let isValid = true;

      if (!email || !email.includes('@')) {
        window.showFieldError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      }

      if (!password || password.length < 4) {
        window.showFieldError(passwordInput, 'Please enter your password (minimum 4 characters).');
        isValid = false;
      }

      if (!isValid) return;

      // Store current user session in localStorage
      localStorage.setItem('stackly_current_user', JSON.stringify({
        email: email,
        role: loginAs,
        name: email.split('@')[0],
        timestamp: Date.now()
      }));

      // Redirect based on selected role:
      if (loginAs === 'Admin') {
        window.location.href = 'AdminDashboard.html';
      } else {
        window.location.href = 'ClientDashboard.html';
      }
    });
  }

  // Handle Signup Form
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const signupAs = document.getElementById('signupAs').value;
      const nameInput = document.getElementById('signupName');
      const emailInput = document.getElementById('signupEmail');
      const passwordInput = document.getElementById('signupPassword');
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      window.clearFieldError(nameInput);
      window.clearFieldError(emailInput);
      window.clearFieldError(passwordInput);

      let isValid = true;

      if (!name) {
        window.showFieldError(nameInput, 'Please enter your full name.');
        isValid = false;
      }

      if (!email || !email.includes('@')) {
        window.showFieldError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      }

      if (!password || password.length < 6) {
        window.showFieldError(passwordInput, 'Please provide a secure password with at least 6 characters.');
        isValid = false;
      }

      if (!isValid) return;

      // Save user record
      const users = JSON.parse(localStorage.getItem('stackly_registered_users') || '[]');
      users.push({ name, email, role: signupAs, date: new Date().toISOString() });
      localStorage.setItem('stackly_registered_users', JSON.stringify(users));

      window.location.href = 'Login.html';
    });
  }
});
