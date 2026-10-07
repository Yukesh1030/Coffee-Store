/**
 * STACKLY COFFEE — Authentication Logic
 * Supports Client & Admin login redirection, validation, eye toggle, and GSAP animations.
 */

document.addEventListener('DOMContentLoaded', () => {
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
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      if (!password || password.length < 4) {
        alert('Please enter your password (minimum 4 characters).');
        return;
      }

      // Store current user session in localStorage
      localStorage.setItem('stackly_current_user', JSON.stringify({
        email: email,
        role: loginAs,
        name: email.split('@')[0],
        timestamp: Date.now()
      }));

      // Redirect based on selected role:
      if (loginAs === 'Admin') {
        window.location.href = '404.html';
      } else {
        window.location.href = '404.html';
      }
    });
  }

  // Handle Signup Form
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const signupAs = document.getElementById('signupAs').value;
      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;

      if (!name) {
        alert('Please enter your full name.');
        return;
      }

      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      if (!password || password.length < 6) {
        alert('Please provide a secure password with at least 6 characters.');
        return;
      }

      // Save user record
      const users = JSON.parse(localStorage.getItem('stackly_registered_users') || '[]');
      users.push({ name, email, role: signupAs, date: new Date().toISOString() });
      localStorage.setItem('stackly_registered_users', JSON.stringify(users));

      alert('Account created successfully! Redirecting to Login...');
      window.location.href = '404.html';
    });
  }
});
