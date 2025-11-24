// Basic interactive behaviors for the site

document.addEventListener('DOMContentLoaded', () => {
  // Set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.setAttribute('aria-hidden', String(expanded));
    });
    // start hidden on small screens
    if (window.matchMedia('(max-width:900px)').matches) {
      primaryNav.setAttribute('aria-hidden', 'true');
    }
  }

  // Smooth scroll for same-page links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close nav if open
        if (primaryNav && primaryNav.getAttribute('aria-hidden') === 'false') {
          primaryNav.setAttribute('aria-hidden','true');
          navToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  });

  // Join form handling
  const joinForm = document.getElementById('joinForm');
  const saveLocalBtn = document.getElementById('saveLocal');

  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(joinForm);
      const name = formData.get('name');
      const email = formData.get('email') || formData.get('memberEmail');
      const age = formData.get('age');
      const why = formData.get('why') || '';
      const subject = encodeURIComponent('Membership request — Association of Female Comrades');
      const body = encodeURIComponent(Name: ${name}\nEmail: ${email}\nAge: ${age}\nWhy: ${why});
      // open mail client by default
      window.location.href = mailto:nationalassociationfemalecomra@gmail.com?subject=${subject}&body=${body};
    });
  }

  // Save locally
  if (saveLocalBtn) {
    saveLocalBtn.addEventListener('click', () => {
      const name = document.getElementById('name').value || '';
      const email = document.getElementById('memberEmail').value || '';
      const age = document.getElementById('age').value || '';
      const reason = document.getElementById('why').value || '';
      const members = JSON.parse(localStorage.getItem('afc_members') || '[]');
      members.push({name, email, age, reason, savedAt: new Date().toISOString()});
      localStorage.setItem('afc_members', JSON.stringify(members));
      alert('Saved locally. You can export members from your browser storage.');
    });
  }

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  const mailtoFallback = document.getElementById('mailtoFallback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = fd.get('name');
      const email = fd.get('email');
      const message = fd.get('message');
      const subject = encodeURIComponent('Website contact — Association of Female Comrades');
      const body = encodeURIComponent(Name: ${name}\nEmail: ${email}\n\n${message});
      // Default: open mail client
      window.location.href = mailto:nationalassociationfemalecomra@gmail.com?subject=${subject}&body=${body};
      // If you want to connect to a server, replace the above with a fetch() to your endpoint.
    });
  }

  if (mailtoFallback) {
    mailtoFallback.addEventListener('click', () => {
      const name = document.getElementById('cname').value || '';
      const email = document.getElementById('cemail').value || '';
      const message = document.getElementById('message').value || '';
      const subject = encodeURIComponent('Website contact — Association of Female Comrades');
      const body = encodeURIComponent(Name: ${name}\nEmail: ${email}\n\n${message});
      window.location.href = mailto:nationalassociationfemalecomra@gmail.com?subject=${subject}&body=${body};
    });
  }
});