// ==========================================================
// Reports page — now connected to Sammy's real backend
// ==========================================================

const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', function () {
  loadMonthlySummary();
  loadEmployeeEarnings();
  loadDeductionsSummary();
});

function money(value) {
  return `$${Number(value).toFixed(2)}`;
}

// ---------- REPORT 1: Monthly Payroll Summary ----------
async function loadMonthlySummary() {
  try {
    const response = await fetch(`${API_BASE}/reports/monthly-summary`);
    const rows = await response.json();

    const tbody = document.getElementById('summaryTableBody');
    tbody.innerHTML = '';
    let totalGross = 0, totalDeductions = 0, totalNet = 0;

    rows.forEach(r => {
      const gross = Number(r.gross ?? r.gross_pay ?? 0);
      const deductions = Number(r.deductions ?? r.total_deductions ?? 0);
      const net = Number(r.net ?? r.net_pay ?? (gross - deductions));
      totalGross += gross; totalDeductions += deductions; totalNet += net;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="ps-4 fw-semibold">${r.employee_name || r.employeeName}</td>
        <td>${r.department || '—'}</td>
        <td class="mono">${money(gross)}</td>
        <td class="mono amount-negative">-${money(deductions)}</td>
        <td class="pe-4 mono fw-semibold">${money(net)}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Failed to load monthly summary:', error);
  }
}

// ---------- REPORT 2: uses /reports/employee-earnings, shown as "Deductions Report" tab for now ----------
async function loadEmployeeEarnings() {
  try {
    const response = await fetch(`${API_BASE}/reports/employee-earnings`);
    const rows = await response.json();

    const tbody = document.getElementById('deductionsSummaryTableBody');
    tbody.innerHTML = '';

    rows.forEach(r => {
      const gross = Number(r.gross ?? r.gross_pay ?? 0);
      const deductions = Number(r.deductions ?? r.total_deductions ?? 0);
      const net = Number(r.net ?? r.net_pay ?? 0);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="ps-4 fw-semibold">${r.employee_name || r.employeeName}</td>
        <td class="mono">${money(gross)}</td>
        <td class="mono amount-negative">-${money(deductions)}</td>
        <td class="pe-4 mono">${money(net)}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Failed to load employee earnings:', error);
  }
}

// ---------- REPORT 3: Deductions Summary (by type) ----------
async function loadDeductionsSummary() {
  try {
    const response = await fetch(`${API_BASE}/reports/deductions-summary`);
    const rows = await response.json();

    const tbody = document.getElementById('overtimeSummaryTableBody');
    tbody.innerHTML = '';

    rows.forEach(r => {
      const amount = Number(r.total_amount ?? r.amount ?? 0);
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="ps-4 fw-semibold">${r.type || r.deduction_type}</td>
        <td>${r.employee_count ?? r.count ?? '—'}</td>
        <td class="pe-4 mono amount-negative">-${money(amount)}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Failed to load deductions summary:', error);
  }
}

// ---------- TAB SWITCHING (unchanged) ----------
function showReport(reportName) {
  document.querySelectorAll('.report-panel').forEach(panel => panel.classList.add('d-none'));
  document.getElementById('report-' + reportName).classList.remove('d-none');

  document.querySelectorAll('.report-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelector(`.report-tab[data-report="${reportName}"]`).classList.add('active');
}