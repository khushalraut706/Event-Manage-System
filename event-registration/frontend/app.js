// =============================================
//  TechFest 2025 — Registration Form Logic
// =============================================

const API_BASE = 'http://localhost:5000/api';

// ---- Select event from card button ----
function selectEvent(eventName) {
  const select = document.getElementById('eventSelect');
  // Decode HTML entities for matching
  const decoded = eventName.replace(/&amp;/g, '&');
  for (const opt of select.options) {
    if (opt.value === decoded || opt.value === eventName) {
      select.value = opt.value;
      break;
    }
  }
  // Scroll to form
  document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
}

// ---- Field validators ----
const validators = {
  event: (v) => v.trim() ? '' : 'Please select an event.',
  name: (v) => {
    if (!v.trim()) return 'Name is required.';
    if (v.trim().length < 2) return 'Name must be at least 2 characters.';
    if (v.trim().length > 100) return 'Name is too long.';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'Email is required.';
    if (!/^\S+@\S+\.\S+$/.test(v.trim())) return 'Enter a valid email address.';
    return '';
  },
  phone: (v) => {
    if (!v.trim()) return 'Phone number is required.';
    if (!/^[0-9]{10}$/.test(v.trim())) return 'Phone must be exactly 10 digits.';
    return '';
  },
};

function showFieldError(field, message) {
  const errEl = document.getElementById(`${field}Error`);
  const inputEl = document.getElementById(`${field}Input`) || document.getElementById(`${field}Select`);
  if (errEl) errEl.textContent = message;
  if (inputEl) {
    if (message) inputEl.classList.add('invalid');
    else inputEl.classList.remove('invalid');
  }
}

function clearFieldError(field) {
  showFieldError(field, '');
}

// ---- Live validation on blur ----
['name', 'email', 'phone'].forEach((field) => {
  const el = document.getElementById(`${field}Input`);
  if (!el) return;
  el.addEventListener('blur', () => {
    const err = validators[field](el.value);
    showFieldError(field, err);
  });
  el.addEventListener('input', () => {
    if (el.classList.contains('invalid')) {
      const err = validators[field](el.value);
      showFieldError(field, err);
    }
  });
});

const eventSelect = document.getElementById('eventSelect');
if (eventSelect) {
  eventSelect.addEventListener('change', () => {
    const err = validators.event(eventSelect.value);
    showFieldError('event', err);
  });
}

// ---- Show / hide API error ----
function showApiError(msg) {
  const el = document.getElementById('apiError');
  el.textContent = msg;
  el.style.display = 'block';
}

function clearApiError() {
  const el = document.getElementById('apiError');
  el.textContent = '';
  el.style.display = 'none';
}

// ---- Reset form back from success ----
function resetForm() {
  document.getElementById('registrationForm').reset();
  document.getElementById('registrationForm').style.display = '';
  document.getElementById('successMsg').style.display = 'none';
  clearApiError();
  ['event', 'name', 'email', 'phone'].forEach(clearFieldError);
}

// ---- Form submit ----
document.getElementById('registrationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  clearApiError();

  const fields = {
    event: document.getElementById('eventSelect').value,
    name: document.getElementById('nameInput').value,
    email: document.getElementById('emailInput').value,
    phone: document.getElementById('phoneInput').value,
  };

  // Validate all fields
  let hasError = false;
  for (const [field, value] of Object.entries(fields)) {
    const err = validators[field](value);
    showFieldError(field, err);
    if (err) hasError = true;
  }

  if (hasError) return;

  // UI: loading state
  const btn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');
  btn.disabled = true;
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fields.name.trim(),
        email: fields.email.trim().toLowerCase(),
        phone: fields.phone.trim(),
        event: fields.event,
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      // Show success
      document.getElementById('registrationForm').style.display = 'none';
      const sm = document.getElementById('successMsg');
      sm.style.display = 'flex';
    } else {
      showApiError(data.message || 'Something went wrong. Please try again.');
    }
  } catch (err) {
    showApiError('Cannot connect to server. Make sure the backend is running on port 5000.');
  } finally {
    btn.disabled = false;
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
  }
});
