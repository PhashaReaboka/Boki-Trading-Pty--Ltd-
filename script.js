// Auto update footer year
document.getElementById('year').textContent = new Date().getFullYear();
document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const toggle = document.querySelector('.mobile-menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const header = document.querySelector('.site-header');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      header.classList.toggle('mobile-menu-open');
    });
  }

  // Contact form handling (client-side)
  const form = document.getElementById('collection-form');
  if (form) {
    const msg = document.getElementById('form-msg');
    const saveBtn = document.getElementById('save-btn');

    // Populate from localStorage if available
    const saved = localStorage.getItem('boki_collection');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        form.name.value = data.name || '';
        form.org.value = data.org || '';
        form.contact.value = data.contact || '';
        form.details.value = data.details || '';
        if (msg) msg.textContent = 'Saved draft loaded from your browser.';
      } catch (e) { /* ignore */ }
    }

    // Save locally button
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const payload = {
          name: form.name.value.trim(),
          org: form.org.value.trim(),
          contact: form.contact.value.trim(),
          details: form.details.value.trim(),
          savedAt: Date.now()
        };
        localStorage.setItem('boki_collection', JSON.stringify(payload));
        if (msg) msg.textContent = 'Saved locally in your browser. Submit when ready.';
      });
    }

    // Submit - client-side validate then simulate send
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      // basic validation
      if (!form.name.value.trim() || !form.contact.value.trim()) {
        if (msg) msg.textContent = 'Please enter your name and contact details.';
        return;
      }
      // In a real site, send to server via fetch() or email service
      // For now simulate success and clear saved draft
      if (msg) msg.textContent = 'Thank you! Your request has been noted — we will contact you shortly.';
      localStorage.removeItem('boki_collection');
      form.reset();
    });
  }
});
