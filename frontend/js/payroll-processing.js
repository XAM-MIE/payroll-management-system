// ==========================================================
// Payroll Processing page
// "Process Payroll" currently calculates using made-up sample
// figures per employee. Once Sammy's payroll route is ready,
// runPayroll() is where you'd replace this with a real
// fetch() POST sending {month, year, employees[]} and
// displaying whatever the backend calculates and returns.
// ==========================================================

// Sample base figures per employee — stand-ins for real
// salary/overtime/deduction data that will come from the database.
const sampleFigures = {
  'John Doe':       { basic: 1200.00, overtime: 50.00,  deductions: 145.00 },
  'Jane Doe':        { basic: 1350.00, overtime: 35.00,  deductions: 165.00 },
  'John Smith':      { basic: 1100.00, overtime: 78.00,  deductions: 130.00 },
  'Janet Maxwell':   { basic: 1450.00, overtime: 46.50,  deductions: 175.50 },
  'Alen Green':      { basic: 980.00,  overtime: 0.00,   deductions: 100.00 }
};

function toggleAllEmployees() {
  const selectAll = document.getElementById('selectAllEmployees').checked;
  document.querySelectorAll('.employee-checkbox').forEach(box => {
    box.checked = selectAll;
  });
}

function runPayroll() {
  const selectedBoxes = document.querySelectorAll('.employee-checkbox:checked');

  if (selectedBoxes.length === 0) {
    document.getElementById('processNote').textContent = 'Select at least one employee first.';
    document.getElementById('processNote').style.color = 'var(--danger)';
    return;
  }

  document.getElementById('processNote').textContent = '';

  const month = document.getElementById('payrollMonth').value;
  const year = document.getElementById('payrollYear').value;

  const tbody = document.getElementById('resultsTableBody');
  tbody.innerHTML = ''; // clear previous run
  let totalNet = 0;

  selectedBoxes.forEach(box => {
    const name = box.value;
    const figures = sampleFigures[name] || { basic: 1000, overtime: 0, deductions: 0 };
    const net = figures.basic + figures.overtime - figures.deductions;
    totalNet += net;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="ps-4 fw-semibold">${name}</td>
      <td class="mono">$${figures.basic.toFixed(2)}</td>
      <td class="mono amount-positive">$${figures.overtime.toFixed(2)}</td>
      <td class="mono amount-negative">-$${figures.deductions.toFixed(2)}</td>
      <td class="pe-4 mono fw-semibold">$${net.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById('totalNetPay').textContent = `$${totalNet.toFixed(2)}`;
  document.getElementById('resultsSection').classList.remove('d-none');
  document.getElementById('processNote').textContent = `Processed for ${month} ${year}.`;
  document.getElementById('processNote').style.color = 'var(--text-muted)';

  // Scroll results into view so it's obvious something happened
  document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
