// ==========================================================
// Payslip page — now connected to Sammy's real backend
// Since /payslip/:id needs a real ID (not just a name), we
// first load the full list of payslips to populate the
// dropdown, then fetch the specific one selected.
// ==========================================================

const API_BASE = 'http://localhost:3000';

// ---------- LOAD THE LIST OF PAYSLIPS TO FILL THE DROPDOWN ----------
document.addEventListener('DOMContentLoaded', loadPayslipList);

async function loadPayslipList() {
  const select = document.getElementById('payslipEmployee');

  try {
    const response = await fetch(`${API_BASE}/payslip`);
    const payslips = await response.json();

    select.innerHTML = ''; // clear the old hardcoded names

    if (payslips.length === 0) {
      select.innerHTML = '<option value="">No payslips generated yet</option>';
      return;
    }

    payslips.forEach(slip => {
      const option = document.createElement('option');
      option.value = slip.id;
      option.textContent = slip.employee_name || slip.employeeName;
      select.appendChild(option);
    });

    // Load the first one automatically
    loadPayslip();

  } catch (error) {
    console.error('Failed to load payslip list:', error);
    select.innerHTML = '<option value="">Could not load — is the server running?</option>';
  }
}

// ---------- LOAD ONE SPECIFIC PAYSLIP BY ID ----------
async function loadPayslip() {
  const id = document.getElementById('payslipEmployee').value;
  if (!id) return;

  try {
    const response = await fetch(`${API_BASE}/payslip/${id}`);
    const data = await response.json();

    // Best-guess field names based on Sammy's description — adjust
    // these if his actual response uses different field names.
    const basic = Number(data.basic ?? data.basic_salary ?? 0);
    const ot = Number(data.overtime ?? data.overtime_pay ?? 0);
    const allow = Number(data.allowances ?? 0);
    const tax = Number(data.tax ?? 0);
    const pension = Number(data.pension ?? 0);
    const other = Number(data.other_deductions ?? data.other ?? 0);

    const gross = basic + ot + allow;
    const totalDeductions = tax + pension + other;
    const net = Number(data.net ?? data.net_pay ?? (gross - totalDeductions));

    document.getElementById('ps-name').textContent = data.employee_name || data.employeeName || '—';
    document.getElementById('ps-id').textContent = data.employee_id ? `EMP-${String(data.employee_id).padStart(4, '0')}` : '—';
    document.getElementById('ps-dept').textContent = data.department || '—';
    document.getElementById('ps-grade').textContent = data.salary_grade || data.grade || '—';
    document.getElementById('ps-period').textContent = document.getElementById('payslipPeriod').value;
    document.getElementById('ps-date').textContent = data.pay_date
      ? new Date(data.pay_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      : '—';

    document.getElementById('ps-basic').textContent = money(basic);
    document.getElementById('ps-ot').textContent = money(ot);
    document.getElementById('ps-allow').textContent = money(allow);
    document.getElementById('ps-gross').textContent = money(gross);

    document.getElementById('ps-tax').textContent = money(tax);
    document.getElementById('ps-pension').textContent = money(pension);
    document.getElementById('ps-other').textContent = money(other);
    document.getElementById('ps-total-deductions').textContent = money(totalDeductions);

    document.getElementById('ps-net').textContent = money(net);

  } catch (error) {
    console.error('Failed to load payslip:', error);
    alert('Could not load this payslip. Please check the server is running.');
  }
}

function money(value) {
  return `$${value.toFixed(2)}`;
}