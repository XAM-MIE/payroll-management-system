// ==========================================================
// Deductions page — now connected to Sammy's real backend
// Base URL: http://localhost:3000
// ==========================================================

const API_BASE = 'http://localhost:3000';

const deductionForm = document.getElementById('deductionForm');
const deductionModalEl = document.getElementById('deductionModal');
const deductionModal = new bootstrap.Modal(deductionModalEl);
const deductionModalTitle = document.getElementById('deductionModalTitle');
let editingDeductionId = null; // real database ID when editing, null when adding

// ---------- LOAD REAL DATA ON PAGE OPEN ----------
document.addEventListener('DOMContentLoaded', loadDeductions);

async function loadDeductions() {
  try {
    const response = await fetch(`${API_BASE}/deductions`);
    const deductions = await response.json();

    const tbody = document.getElementById('deductionsTableBody');
    tbody.innerHTML = ''; // clear sample rows

    deductions.forEach(item => {
      const row = buildRow(item);
      tbody.appendChild(row);
    });

    filterDeductions(); // update the record count
  } catch (error) {
    console.error('Failed to load deductions:', error);
    document.getElementById('resultCount').textContent = 'Could not load data — is the server running?';
  }
}

function buildRow(item) {
  const row = document.createElement('tr');
  row.setAttribute('data-id', item.id);
  row.setAttribute('data-name', item.employee_name || item.employeeName);
  row.setAttribute('data-type', item.type);
  row.innerHTML = `
    <td class="ps-4 fw-semibold">${item.employee_name || item.employeeName}</td>
    <td>${item.type}</td>
    <td class="amount-negative">-$${Number(item.amount).toFixed(2)}</td>
    <td>${new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
    <td class="text-muted">${item.note || '—'}</td>
    <td class="text-end pe-4">
      <button class="icon-btn" title="Edit" onclick="editDeduction(this)"><i class="bi bi-pencil-fill"></i></button>
      <button class="icon-btn" title="Delete" onclick="confirmDeleteDeduction(this)"><i class="bi bi-trash-fill" style="color:var(--danger);"></i></button>
    </td>
  `;
  return row;
}

// ---------- SEARCH + FILTER (unchanged, works on whatever rows are in the table) ----------
function filterDeductions() {
  const searchValue = document.getElementById('deductionSearch').value.toLowerCase();
  const typeValue = document.getElementById('typeFilter').value;
  const rows = document.querySelectorAll('#deductionsTableBody tr');
  let visibleCount = 0;

  rows.forEach(row => {
    const name = row.getAttribute('data-name').toLowerCase();
    const type = row.getAttribute('data-type');
    const matchesSearch = name.includes(searchValue);
    const matchesType = typeValue === '' || type === typeValue;

    if (matchesSearch && matchesType) {
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
function openAddDeduction() {
  editingDeductionId = null;
  deductionModalTitle.textContent = 'Add Deduction';
  deductionForm.reset();
  deductionForm.classList.remove('was-validated');
}

// ---------- EDIT ----------
function editDeduction(button) {
  const row = button.closest('tr');
  editingDeductionId = row.getAttribute('data-id');

  deductionModalTitle.textContent = 'Edit Deduction';
  deductionForm.classList.remove('was-validated');

  document.getElementById('deductionEmployee').value = row.children[0].textContent.trim();
  document.getElementById('deductionType').value = row.children[1].textContent.trim();
  document.getElementById('deductionAmount').value = row.children[2].textContent.replace(/[^0-9.]/g, '');
  document.getElementById('deductionNote').value = row.children[4].textContent.trim();

  deductionModal.show();
}

// ---------- SAVE (add or edit — talks to the real backend now) ----------
deductionForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  if (!deductionForm.checkValidity()) {
    event.stopPropagation();
    deductionForm.classList.add('was-validated');
    return;
  }

  const payload = {
    employee_name: document.getElementById('deductionEmployee').value,
    type: document.getElementById('deductionType').value,
    amount: parseFloat(document.getElementById('deductionAmount').value),
    date: document.getElementById('deductionDate').value,
    note: document.getElementById('deductionNote').value || null
  };

  try {
    let response;
    if (editingDeductionId) {
      response = await fetch(`${API_BASE}/deductions/${editingDeductionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      response = await fetch(`${API_BASE}/deductions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (!response.ok) throw new Error('Server returned an error');

    await loadDeductions(); // refresh the table with real data
    deductionModal.hide();
    deductionForm.classList.remove('was-validated');
  } catch (error) {
    console.error('Failed to save deduction:', error);
    alert('Could not save this deduction. Please check the server is running and try again.');
  }
});

// ---------- DELETE (with confirmation, now hits the real backend) ----------
async function confirmDeleteDeduction(button) {
  const row = button.closest('tr');
  const id = row.getAttribute('data-id');
  const name = row.getAttribute('data-name');

  const isConfirmed = window.confirm(`Are you sure you want to delete this deduction for ${name}? This cannot be undone.`);
  if (!isConfirmed) return;

  try {
    const response = await fetch(`${API_BASE}/deductions/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Server returned an error');

    row.remove();
    filterDeductions();
  } catch (error) {
    console.error('Failed to delete deduction:', error);
    alert('Could not delete this deduction. Please check the server is running and try again.');
  }
}