// ==========================================================
// Overtime page — search/filter, add/edit (with auto pay
// calculation), delete confirm.
// Same pattern as deductions.js — once Sammy shares backend
// routes, "Save Overtime" is where you'd swap in a real
// fetch() POST instead of building the row by hand.
// ==========================================================

const overtimeForm = document.getElementById('overtimeForm');
const overtimeModalEl = document.getElementById('overtimeModal');
const overtimeModal = new bootstrap.Modal(overtimeModalEl);
const overtimeModalTitle = document.getElementById('overtimeModalTitle');
let editingOvertimeRow = null;

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
  editingOvertimeRow = null;
  overtimeModalTitle.textContent = 'Add Overtime';
  overtimeForm.reset();
  overtimeForm.classList.remove('was-validated');
}

// ---------- EDIT ----------
function editOvertime(button) {
  const row = button.closest('tr');
  editingOvertimeRow = row;

  overtimeModalTitle.textContent = 'Edit Overtime';
  overtimeForm.classList.remove('was-validated');

  document.getElementById('overtimeEmployee').value = row.children[0].textContent.trim();
  document.getElementById('overtimeHours').value = row.children[2].textContent.trim();
  document.getElementById('overtimeRate').value = row.children[3].textContent.replace(/[^0-9.]/g, '');
  document.getElementById('overtimeStatus').value = row.getAttribute('data-status');
  // Date left blank for re-selection, same reason as deductions.js

  overtimeModal.show();
}

// ---------- SAVE (add + edit) ----------
overtimeForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!overtimeForm.checkValidity()) {
    event.stopPropagation();
    overtimeForm.classList.add('was-validated');
    return;
  }

  const employee = document.getElementById('overtimeEmployee').value;
  const dateInput = document.getElementById('overtimeDate').value;
  const hours = parseFloat(document.getElementById('overtimeHours').value);
  const rate = parseFloat(document.getElementById('overtimeRate').value);
  const status = document.getElementById('overtimeStatus').value;
  const totalPay = (hours * rate).toFixed(2);

  const formattedDate = dateInput
    ? new Date(dateInput + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    : '—';

  const statusBadgeClass = status === 'Approved' ? 'badge-success' : 'badge-pending';

  if (editingOvertimeRow) {
    editingOvertimeRow.setAttribute('data-name', employee);
    editingOvertimeRow.setAttribute('data-status', status);
    editingOvertimeRow.children[0].textContent = employee;
    editingOvertimeRow.children[1].textContent = formattedDate;
    editingOvertimeRow.children[2].textContent = hours.toFixed(1);
    editingOvertimeRow.children[3].textContent = `$${rate.toFixed(2)}`;
    editingOvertimeRow.children[4].textContent = `$${totalPay}`;
    editingOvertimeRow.children[5].innerHTML = `<span class="badge-status ${statusBadgeClass}">${status}</span>`;
  } else {
    const tbody = document.getElementById('overtimeTableBody');
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-name', employee);
    newRow.setAttribute('data-status', status);
    newRow.innerHTML = `
      <td class="ps-4 fw-semibold">${employee}</td>
      <td>${formattedDate}</td>
      <td class="mono">${hours.toFixed(1)}</td>
      <td class="mono">$${rate.toFixed(2)}</td>
      <td class="amount-positive mono">$${totalPay}</td>
      <td><span class="badge-status ${statusBadgeClass}">${status}</span></td>
      <td class="text-end pe-4">
        <button class="icon-btn" title="Edit" onclick="editOvertime(this)"><i class="bi bi-pencil-fill"></i></button>
        <button class="icon-btn" title="Delete" onclick="confirmDeleteOvertime(this)"><i class="bi bi-trash-fill" style="color:var(--danger);"></i></button>
      </td>
    `;
    tbody.appendChild(newRow);
  }

  filterOvertime();
  overtimeModal.hide();
  overtimeForm.classList.remove('was-validated');
});

// ---------- DELETE (with confirmation) ----------
function confirmDeleteOvertime(button) {
  const row = button.closest('tr');
  const name = row.getAttribute('data-name');

  const isConfirmed = window.confirm(`Are you sure you want to delete this overtime record for ${name}? This cannot be undone.`);

  if (isConfirmed) {
    row.remove();
    filterOvertime();
  }
}
