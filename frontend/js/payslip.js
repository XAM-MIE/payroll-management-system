// ==========================================================
// Payslip page — fills the printable sheet based on the
// selected employee/period. Once Sammy's payslip route is
// ready, loadPayslip() is where you'd replace sampleData
// with a real fetch() call to get that employee's actual
// computed payslip instead.
// ==========================================================

const sampleData = {
  'John Doe': {
    id: 'EMP-0001', dept: 'Operations', grade: 'Grade 3',
    basic: 1200.00, ot: 50.00, allow: 100.00,
    tax: 120.00, pension: 60.00, other: 0.00
  },
  'Jane Doe': {
    id: 'EMP-0002', dept: 'Finance', grade: 'Grade 4',
    basic: 1350.00, ot: 35.00, allow: 120.00,
    tax: 140.00, pension: 67.50, other: 0.00
  },
  'John Smith': {
    id: 'EMP-0003', dept: 'IT', grade: 'Grade 3',
    basic: 1100.00, ot: 78.00, allow: 80.00,
    tax: 110.00, pension: 55.00, other: 20.00
  },
  'Janet Maxwell': {
    id: 'EMP-0004', dept: 'HR', grade: 'Grade 4',
    basic: 1450.00, ot: 46.50, allow: 130.00,
    tax: 145.00, pension: 72.50, other: 0.00
  },
  'Alen Green': {
    id: 'EMP-0005', dept: 'Operations', grade: 'Grade 2',
    basic: 980.00, ot: 0.00, allow: 60.00,
    tax: 98.00, pension: 49.00, other: 40.00
  }
};

function money(value) {
  return `$${value.toFixed(2)}`;
}

function loadPayslip() {
  const name = document.getElementById('payslipEmployee').value;
  const period = document.getElementById('payslipPeriod').value;
  const data = sampleData[name];

  if (!data) return;

  const gross = data.basic + data.ot + data.allow;
  const totalDeductions = data.tax + data.pension + data.other;
  const net = gross - totalDeductions;

  document.getElementById('ps-name').textContent = name;
  document.getElementById('ps-id').textContent = data.id;
  document.getElementById('ps-dept').textContent = data.dept;
  document.getElementById('ps-grade').textContent = data.grade;
  document.getElementById('ps-period').textContent = period;

  // Set pay date to the last day-ish of the selected period, just for display
  document.getElementById('ps-date').textContent = period.replace(' ', ' 31, ');

  document.getElementById('ps-basic').textContent = money(data.basic);
  document.getElementById('ps-ot').textContent = money(data.ot);
  document.getElementById('ps-allow').textContent = money(data.allow);
  document.getElementById('ps-gross').textContent = money(gross);

  document.getElementById('ps-tax').textContent = money(data.tax);
  document.getElementById('ps-pension').textContent = money(data.pension);
  document.getElementById('ps-other').textContent = money(data.other);
  document.getElementById('ps-total-deductions').textContent = money(totalDeductions);

  document.getElementById('ps-net').textContent = money(net);
}

// Load the first employee's payslip as soon as the page opens
document.addEventListener('DOMContentLoaded', loadPayslip);
