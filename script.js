document.addEventListener('DOMContentLoaded', () => {

  /* ================================================
     1. CURSOR GLOW FOLLOW
     ================================================ */
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  /* ================================================
     2. STICKY NAVBAR
     ================================================ */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ================================================
     3. MOBILE HAMBURGER MENU
     ================================================ */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const allNavLinks = document.querySelectorAll('.nav-links a, .btn-nav');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  /* ================================================
     4. 3D TILT CARD EFFECT
     ================================================ */
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max rotation in degrees
      const maxRotate = 8;
      const rotateX = ((y - centerY) / centerY) * -maxRotate;
      const rotateY = ((x - centerX) / centerX) * maxRotate;

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  /* ================================================
     5. SCROLL ANIMATIONS (IntersectionObserver)
     ================================================ */
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animateElements.forEach(el => observer.observe(el));

  /* ================================================
     6. FORM SUBMISSION → GOOGLE SHEETS (Hidden Iframe)
     ================================================ */
  const enquiryForm = document.getElementById('enquiry-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  const scriptURL = 'https://script.google.com/macros/s/AKfycbzR8DWVPrqkvtxQN7DQUMnIY3bDa_uY_v8i4UxFgiwtozMafcKbOMCVvq6jjR1ay_UuVg/exec';

  if (enquiryForm) {
    // Create hidden iframe for form submission (bypasses CORS completely)
    const hiddenIframe = document.createElement('iframe');
    hiddenIframe.name = 'hidden-form-iframe';
    hiddenIframe.style.display = 'none';
    document.body.appendChild(hiddenIframe);

    // Set form to submit into the hidden iframe
    enquiryForm.setAttribute('action', scriptURL);
    enquiryForm.setAttribute('method', 'POST');
    enquiryForm.setAttribute('target', 'hidden-form-iframe');

    enquiryForm.addEventListener('submit', (e) => {
      // Let the form submit naturally into the hidden iframe (don't preventDefault!)
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      // Listen for iframe load = form was submitted successfully
      hiddenIframe.addEventListener('load', function onLoad() {
        hiddenIframe.removeEventListener('load', onLoad);

        formSuccess.classList.remove('hidden');
        enquiryForm.reset();
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;

        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 5000);
      });
    });
  }

  /* ================================================
     7. BACK TO TOP BUTTON
     ================================================ */
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });

  /* ================================================
     8. SMOOTH PARALLAX ON ORBS
     ================================================ */
  const orbs = document.querySelectorAll('.hero-orb');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 0.15;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

});
