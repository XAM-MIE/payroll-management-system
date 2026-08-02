// ==========================================================
// Payroll Processing page — now connected to Sammy's backend
// Since /payroll/process handles ONE employee per call, we
// loop through every selected employee and call it once each.
// ==========================================================

const API_BASE = 'http://localhost:3000';

function toggleAllEmployees() {
  const selectAll = document.getElementById('selectAllEmployees').checked;
  document.querySelectorAll('.employee-checkbox').forEach(box => {
    box.checked = selectAll;
  });
}

async function runPayroll() {
  const selectedBoxes = document.querySelectorAll('.employee-checkbox:checked');
  const processNote = document.getElementById('processNote');

  if (selectedBoxes.length === 0) {
    processNote.textContent = 'Select at least one employee first.';
    processNote.style.color = 'var(--danger)';
    return;
  }

  const month = document.getElementById('payrollMonth').value;
  const year = document.getElementById('payrollYear').value;

  processNote.textContent = 'Processing…';
  processNote.style.color = 'var(--text-muted)';

  const tbody = document.getElementById('resultsTableBody');
  tbody.innerHTML = '';
  let totalNet = 0;
  let failedCount = 0;

  // Loop through each selected employee, one request at a time,
  // exactly as Sammy described — this also makes it easy to see
  // which specific employee fails, if any do.
  for (const box of selectedBoxes) {
    const employeeName = box.value;

    try {
      const response = await fetch(`${API_BASE}/payroll/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_name: employeeName,
          month: month,
          year: year
        })
      });

      if (!response.ok) throw new Error(`Failed for ${employeeName}`);

      const result = await response.json();

      // These field names are a best guess based on Sammy's description
      // (gross, deductions, net). If his actual response uses different
      // field names, just adjust the result.xxx lines below to match.
      const basic = Number(result.basic ?? result.basic_salary ?? 0);
      const overtime = Number(result.overtime ?? result.overtime_pay ?? 0);
      const deductions = Number(result.deductions ?? result.total_deductions ?? 0);
      const net = Number(result.net ?? result.net_pay ?? (basic + overtime - deductions));

      totalNet += net;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="ps-4 fw-semibold">${employeeName}</td>
        <td class="mono">$${basic.toFixed(2)}</td>
        <td class="mono amount-positive">$${overtime.toFixed(2)}</td>
        <td class="mono amount-negative">-$${deductions.toFixed(2)}</td>
        <td class="pe-4 mono fw-semibold">$${net.toFixed(2)}</td>
      `;
      tbody.appendChild(row);

    } catch (error) {
      console.error(error);
      failedCount++;
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="ps-4 fw-semibold">${employeeName}</td>
        <td colspan="4" class="text-danger">Failed to process this employee</td>
      `;
      tbody.appendChild(row);
    }
  }

  document.getElementById('totalNetPay').textContent = `$${totalNet.toFixed(2)}`;
  document.getElementById('resultsSection').classList.remove('d-none');

  if (failedCount > 0) {
    processNote.textContent = `Processed for ${month} ${year} — ${failedCount} employee(s) failed, check console.`;
    processNote.style.color = 'var(--danger)';
  } else {
    processNote.textContent = `Processed successfully for ${month} ${year}.`;
    processNote.style.color = 'var(--text-muted)';
  }

  document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}