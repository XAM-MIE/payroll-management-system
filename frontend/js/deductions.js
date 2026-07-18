// ==========================================================
// Deductions page — search/filter, add/edit, delete confirm
// This is sample-data logic for now. Once Sammy shares the
// backend routes, the "Save Deduction" part of this file is
// where you'd replace the fake row-adding with a real
// fetch() POST request to the backend instead.
// ==========================================================

const deductionForm = document.getElementById('deductionForm');
const deductionModalEl = document.getElementById('deductionModal');
const deductionModal = new bootstrap.Modal(deductionModalEl);
const deductionModalTitle = document.getElementById('deductionModalTitle');
let editingRow = null; // tracks which row we're editing, if any

// ---------- SEARCH + FILTER ----------
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
  editingRow = null;
  deductionModalTitle.textContent = 'Add Deduction';
  deductionForm.reset();
  clearValidation();
}

// ---------- EDIT ----------
function editDeduction(button) {
  const row = button.closest('tr');
  editingRow = row;

  deductionModalTitle.textContent = 'Edit Deduction';
  clearValidation();

  document.getElementById('deductionEmployee').value = row.children[0].textContent.trim();
  document.getElementById('deductionType').value = row.children[1].textContent.trim();
  document.getElementById('deductionAmount').value = row.children[2].textContent.replace(/[^0-9.]/g, '');
  document.getElementById('deductionNote').value = row.children[4].textContent.trim();
  // Date input left blank for the user to re-pick, since the displayed format
  // (e.g. "Jun 30, 2026") doesn't match the yyyy-mm-dd input format.

  deductionModal.show();
}

// ---------- SAVE (handles both add + edit) ----------
deductionForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!deductionForm.checkValidity()) {
    event.stopPropagation();
    deductionForm.classList.add('was-validated');
    return;
  }

  const employee = document.getElementById('deductionEmployee').value;
  const type = document.getElementById('deductionType').value;
  const amount = parseFloat(document.getElementById('deductionAmount').value).toFixed(2);
  const dateInput = document.getElementById('deductionDate').value;
  const note = document.getElementById('deductionNote').value || '—';

  const formattedDate = dateInput
    ? new Date(dateInput + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    : '—';

  if (editingRow) {
    // Update existing row
    editingRow.setAttribute('data-name', employee);
    editingRow.setAttribute('data-type', type);
    editingRow.children[0].textContent = employee;
    editingRow.children[1].textContent = type;
    editingRow.children[2].textContent = `-$${amount}`;
    editingRow.children[3].textContent = formattedDate;
    editingRow.children[4].textContent = note;
  } else {
    // Add new row
    const tbody = document.getElementById('deductionsTableBody');
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-name', employee);
    newRow.setAttribute('data-type', type);
    newRow.innerHTML = `
      <td class="ps-4 fw-semibold">${employee}</td>
      <td>${type}</td>
      <td class="amount-negative">-$${amount}</td>
      <td>${formattedDate}</td>
      <td class="text-muted">${note}</td>
      <td class="text-end pe-4">
        <button class="icon-btn" title="Edit" onclick="editDeduction(this)"><i class="bi bi-pencil-fill"></i></button>
        <button class="icon-btn" title="Delete" onclick="confirmDeleteDeduction(this)"><i class="bi bi-trash-fill" style="color:var(--danger);"></i></button>
      </td>
    `;
    tbody.appendChild(newRow);
  }

  filterDeductions(); // refresh count
  deductionModal.hide();
  deductionForm.classList.remove('was-validated');
});

function clearValidation() {
  deductionForm.classList.remove('was-validated');
}

// ---------- DELETE (with confirmation) ----------
function confirmDeleteDeduction(button) {
  const row = button.closest('tr');
  const name = row.getAttribute('data-name');

  const isConfirmed = window.confirm(`Are you sure you want to delete this deduction for ${name}? This cannot be undone.`);

  if (isConfirmed) {
    row.remove();
    filterDeductions(); // refresh count after removal
  }
}
