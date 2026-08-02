// ==========================================================
// Overtime page — now connected to Sammy's real backend
// Base URL: http://localhost:3000
// ==========================================================

const API_BASE = 'http://localhost:3000';

const overtimeForm = document.getElementById('overtimeForm');
const overtimeModalEl = document.getElementById('overtimeModal');
const overtimeModal = new bootstrap.Modal(overtimeModalEl);
const overtimeModalTitle = document.getElementById('overtimeModalTitle');
let editingOvertimeId = null;

// ---------- LOAD REAL DATA ON PAGE OPEN ----------
document.addEventListener('DOMContentLoaded', loadOvertime);

async function loadOvertime() {
  try {
    const response = await fetch(`${API_BASE}/overtime`);
    const records = await response.json();

    const tbody = document.getElementById('overtimeTableBody');
    tbody.innerHTML = '';

    records.forEach(item => {
      tbody.appendChild(buildOvertimeRow(item));
    });

    filterOvertime();
  } catch (error) {
    console.error('Failed to load overtime:', error);
    document.getElementById('resultCount').textContent = 'Could not load data — is the server running?';
  }
}

function buildOvertimeRow(item) {
  const hours = Number(item.hours);
  const rate = Number(item.rate);
  const totalPay = (hours * rate).toFixed(2);
  const statusBadgeClass = item.status === 'Approved' ? 'badge-success' : 'badge-pending';

  const row = document.createElement('tr');
  row.setAttribute('data-id', item.id);
  row.setAttribute('data-name', item.employee_name || item.employeeName);
  row.setAttribute('data-status', item.status);
  row.innerHTML = `
    <td class="ps-4 fw-semibold">${item.employee_name || item.employeeName}</td>
    <td>${new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
    <td class="mono">${hours.toFixed(1)}</td>
    <td class="mono">$${rate.toFixed(2)}</td>
    <td class="amount-positive mono">$${totalPay}</td>
    <td><span class="badge-status ${statusBadgeClass}">${item.status}</span></td>
    <td class="text-end pe-4">
      <button class="icon-btn" title="Edit" onclick="editOvertime(this)"><i class="bi bi-pencil-fill"></i></button>
      <button class="icon-btn" title="Delete" onclick="confirmDeleteOvertime(this)"><i class="bi bi-trash-fill" style="color:var(--danger);"></i></button>
    </td>
  `;
  return row;
}

// ---------- SEARCH + FILTER ----------
function filterOvertime() {
  const searchValue = document.getElementById('overtimeSearch').value.toLowerCase();
  const statusValue = document.getElementById('statusFilter').value;
  const rows = document.querySelectorAll('#overtimeTableBody tr');
  let visibleCount = 0;

  rows.forEach(row => {
    const name = row.getAttribute('data-name').toLowerCase();
    const status = row.getAttribute('data-status');
    const matchesSearch = name.includes(searchValue);
    const matchesStatus = statusValue === '' || status === statusValue;

    if (matchesSearch && matchesStatus) {
      row.style.display = '';
      visibleCount++;
    } else {
      row.style.display = 'none';
    }
  });

  document.getElementById('resultCount').textContent = `${visibleCount} record${visibleCount !== 1 ? 's' : ''}`;
  document.getElementById('noResults').classList.toggle('d-none', visibleCount !== 0);
}

// ---------- ADD ----------
function openAddOvertime() {
  editingOvertimeId = null;
  overtimeModalTitle.textContent = 'Add Overtime';
  overtimeForm.reset();
  overtimeForm.classList.remove('was-validated');
}

// ---------- EDIT ----------
function editOvertime(button) {
  const row = button.closest('tr');
  editingOvertimeId = row.getAttribute('data-id');

  overtimeModalTitle.textContent = 'Edit Overtime';
  overtimeForm.classList.remove('was-validated');

  document.getElementById('overtimeEmployee').value = row.children[0].textContent.trim();
  document.getElementById('overtimeHours').value = row.children[2].textContent.trim();
  document.getElementById('overtimeRate').value = row.children[3].textContent.replace(/[^0-9.]/g, '');
  document.getElementById('overtimeStatus').value = row.getAttribute('data-status');

  overtimeModal.show();
}

// ---------- SAVE (add or edit) ----------
overtimeForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  if (!overtimeForm.checkValidity()) {
    event.stopPropagation();
    overtimeForm.classList.add('was-validated');
    return;
  }

  const payload = {
    employee_name: document.getElementById('overtimeEmployee').value,
    date: document.getElementById('overtimeDate').value,
    hours: parseFloat(document.getElementById('overtimeHours').value),
    rate: parseFloat(document.getElementById('overtimeRate').value),
    status: document.getElementById('overtimeStatus').value
  };

  try {
    let response;
    if (editingOvertimeId) {
      response = await fetch(`${API_BASE}/overtime/${editingOvertimeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      response = await fetch(`${API_BASE}/overtime`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (!response.ok) throw new Error('Server returned an error');

    await loadOvertime();
    overtimeModal.hide();
    overtimeForm.classList.remove('was-validated');
  } catch (error) {
    console.error('Failed to save overtime:', error);
    alert('Could not save this overtime record. Please check the server is running and try again.');
  }
});

// ---------- DELETE ----------
async function confirmDeleteOvertime(button) {
  const row = button.closest('tr');
  const id = row.getAttribute('data-id');
  const name = row.getAttribute('data-name');

  const isConfirmed = window.confirm(`Are you sure you want to delete this overtime record for ${name}? This cannot be undone.`);
  if (!isConfirmed) return;

  try {
    const response = await fetch(`${API_BASE}/overtime/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Server returned an error');

    row.remove();
    filterOvertime();
  } catch (error) {
    console.error('Failed to delete overtime:', error);
    alert('Could not delete this overtime record. Please check the server is running and try again.');
  }
}