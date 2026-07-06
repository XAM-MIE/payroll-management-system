USE payroll_management_system;

INSERT INTO users (username, password_hash, full_name, role) VALUES
('admin', 'admin123', 'Payroll Administrator', 'admin'),
('payroll', 'payroll123', 'Payroll Officer', 'payroll_officer');

INSERT INTO departments (department_name, manager_name) VALUES
('Human Resources', 'Amina Yusuf'),
('Finance', 'Tunde Bello'),
('Information Technology', 'David Mensah'),
('Operations', 'Chioma Okafor'),
('Sales', 'Ibrahim Musa');

INSERT INTO salary_grades (grade_name, basic_salary, tax_rate) VALUES
('Grade A', 150000.00, 5.00),
('Grade B', 220000.00, 7.50),
('Grade C', 300000.00, 10.00),
('Grade D', 420000.00, 12.50);

INSERT INTO employees (
    staff_no,
    first_name,
    last_name,
    email,
    phone,
    gender,
    hire_date,
    department_id,
    salary_grade_id,
    employment_status
) VALUES
('EMP001', 'Ada', 'Nwosu', 'ada.nwosu@example.com', '08030000001', 'Female', '2024-02-12', 1, 2, 'Active'),
('EMP002', 'Bayo', 'Adeyemi', 'bayo.adeyemi@example.com', '08030000002', 'Male', '2023-08-01', 2, 3, 'Active'),
('EMP003', 'Fatima', 'Sani', 'fatima.sani@example.com', '08030000003', 'Female', '2025-01-15', 4, 1, 'Active'),
('EMP004', 'Kelvin', 'Eze', 'kelvin.eze@example.com', '08030000004', 'Male', '2024-10-20', 3, 2, 'Active'),
('EMP005', 'Mary', 'Johnson', 'mary.johnson@example.com', '08030000005', 'Female', '2022-06-05', 5, 3, 'Active'),
('EMP006', 'Samuel', 'Okoro', 'samuel.okoro@example.com', '08030000006', 'Male', '2021-11-18', 2, 4, 'Active');

INSERT INTO allowance_types (allowance_name, description) VALUES
('Housing Allowance', 'Monthly housing support'),
('Transport Allowance', 'Monthly transport support'),
('Meal Allowance', 'Monthly feeding support'),
('Performance Bonus', 'Bonus for strong performance');

INSERT INTO deduction_types (deduction_name, description) VALUES
('Pension', 'Employee pension contribution'),
('Health Insurance', 'Health maintenance organization deduction'),
('Loan Repayment', 'Monthly staff loan repayment'),
('Union Dues', 'Staff union contribution');

INSERT INTO employee_allowances (employee_id, allowance_type_id, payroll_month, amount) VALUES
(1, 1, '2026-06', 45000.00),
(1, 2, '2026-06', 20000.00),
(2, 1, '2026-06', 60000.00),
(2, 4, '2026-06', 35000.00),
(3, 2, '2026-06', 18000.00),
(4, 3, '2026-06', 15000.00),
(5, 1, '2026-06', 55000.00),
(6, 1, '2026-06', 80000.00);

INSERT INTO employee_deductions (employee_id, deduction_type_id, payroll_month, amount) VALUES
(1, 1, '2026-06', 18000.00),
(2, 2, '2026-06', 12000.00),
(3, 1, '2026-06', 10000.00),
(4, 3, '2026-06', 25000.00),
(5, 4, '2026-06', 5000.00),
(6, 1, '2026-06', 30000.00);

INSERT INTO overtime_entries (employee_id, payroll_month, overtime_hours, hourly_rate) VALUES
(1, '2026-06', 8.00, 2500.00),
(2, '2026-06', 5.00, 3000.00),
(3, '2026-06', 6.00, 1800.00),
(4, '2026-06', 10.00, 2200.00),
(5, '2026-06', 4.00, 2800.00),
(6, '2026-06', 3.00, 3500.00);

INSERT INTO payroll_months (payroll_month, status) VALUES
('2026-06', 'Open');
