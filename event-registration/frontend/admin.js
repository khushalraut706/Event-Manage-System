// =============================================
//  TechFest 2025 — Admin Panel Logic
// =============================================

const API_BASE = 'http://localhost:5000/api';

let allRegistrations = [];
let pendingDeleteId = null;

// ---- Utility: format date ----
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }) + ' · ' + d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ---- Get event badge class ----
function getEventClass(event) {
  const e = event.toLowerCase();
  if (e.includes('ai') || e.includes('ml')) return 'ai';
  if (e.includes('cloud') || e.includes('devops')) return 'cloud';
  if (e.includes('cyber')) return 'cyber';
  return 'other';
}

// ---- Load registrations from API ----
async function loadRegistrations() {
  setView('loading');

  try {
    const res = await fetch(`${API_BASE}/registrations`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (!data.success) throw new Error(data.message);

    allRegistrations = data.data;
    updateStats(allRegistrations);

    if (allRegistrations.length === 0) {
      setView('empty');
    } else {
      renderTable(allRegistrations);
      setView('table');
    }
  } catch (err) {
    console.error('Error loading registrations:', err);
    setView('error');
  }
}

// ---- Update stat counters ----
function updateStats(registrations) {
  document.getElementById('totalCount').textContent = registrations.length;

  const counts = { ai: 0, cloud: 0, cyber: 0 };
  registrations.forEach((r) => {
    const cls = getEventClass(r.event);
    if (cls in counts) counts[cls]++;
  });

  document.getElementById('aiCount').textContent = counts.ai;
  document.getElementById('cloudCount').textContent = counts.cloud;
  document.getElementById('cyberCount').textContent = counts.cyber;
}

// ---- Render table rows ----
function renderTable(registrations) {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';

  if (registrations.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding: 40px; color: var(--muted);">
          No matching registrations found.
        </td>
      </tr>`;
    return;
  }

  registrations.forEach((reg, i) => {
    const cls = getEventClass(reg.event);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="row-num">${i + 1}</td>
      <td class="td-name">${escapeHtml(reg.name)}</td>
      <td class="td-email">${escapeHtml(reg.email)}</td>
      <td>${escapeHtml(reg.phone)}</td>
      <td><span class="event-badge ${cls}">${escapeHtml(reg.event)}</span></td>
      <td class="td-date">${formatDate(reg.createdAt)}</td>
      <td>
        <button class="delete-btn" onclick="confirmDelete('${reg._id}')">🗑 Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ---- Filter table by search input ----
function filterTable() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const filtered = allRegistrations.filter((r) =>
    r.name.toLowerCase().includes(query) ||
    r.email.toLowerCase().includes(query) ||
    r.event.toLowerCase().includes(query) ||
    r.phone.includes(query)
  );
  renderTable(filtered);
}

// ---- Set visible view state ----
function setView(state) {
  document.getElementById('adminLoading').style.display = state === 'loading' ? 'block' : 'none';
  document.getElementById('adminError').classList.toggle('hidden', state !== 'error');
  document.getElementById('adminEmpty').classList.toggle('hidden', state !== 'empty');
  document.getElementById('tableWrapper').classList.toggle('hidden', state !== 'table');
}

// ---- Delete flow ----
function confirmDelete(id) {
  pendingDeleteId = id;
  document.getElementById('modalOverlay').classList.remove('hidden');
}

function closeModal() {
  pendingDeleteId = null;
  document.getElementById('modalOverlay').classList.add('hidden');
}

document.getElementById('modalConfirmBtn').addEventListener('click', async () => {
  if (!pendingDeleteId) return;

  const btn = document.getElementById('modalConfirmBtn');
  btn.textContent = 'Deleting…';
  btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/registration/${pendingDeleteId}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (res.ok && data.success) {
      closeModal();
      await loadRegistrations();
    } else {
      alert(data.message || 'Failed to delete. Please try again.');
    }
  } catch (err) {
    alert('Could not connect to server.');
  } finally {
    btn.textContent = 'Yes, Delete';
    btn.disabled = false;
  }
});

// Close modal on overlay click
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

// ---- Escape HTML to prevent XSS ----
function escapeHtml(str) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

// ---- Init ----
loadRegistrations();
