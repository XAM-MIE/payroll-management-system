USE payroll_management_system;

-- 1. List all employees with their departments and salary grades.
SELECT
    e.employee_id,
    e.staff_no,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    d.department_name,
    sg.grade_name,
    sg.basic_salary,
    e.employment_status
FROM employees e
JOIN departments d ON e.department_id = d.department_id
JOIN salary_grades sg ON e.salary_grade_id = sg.salary_grade_id
ORDER BY e.employee_id;

-- 2. Search for employees by name, staff number, or department.
SELECT
    e.staff_no,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    d.department_name,
    e.email,
    e.phone
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.first_name LIKE '%Ada%'
   OR e.last_name LIKE '%Ada%'
   OR e.staff_no LIKE '%Ada%'
   OR d.department_name LIKE '%Ada%';

-- 3. Count employees in each department.
SELECT
    d.department_name,
    COUNT(e.employee_id) AS total_employees
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name
ORDER BY d.department_name;

-- 4. Show allowance entries for June 2026.
SELECT
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    at.allowance_name,
    ea.payroll_month,
    ea.amount
FROM employee_allowances ea
JOIN employees e ON ea.employee_id = e.employee_id
JOIN allowance_types at ON ea.allowance_type_id = at.allowance_type_id
WHERE ea.payroll_month = '2026-06'
ORDER BY employee_name;

-- 5. Show deduction entries for June 2026.
SELECT
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    dt.deduction_name,
    ed.payroll_month,
    ed.amount
FROM employee_deductions ed
JOIN employees e ON ed.employee_id = e.employee_id
JOIN deduction_types dt ON ed.deduction_type_id = dt.deduction_type_id
WHERE ed.payroll_month = '2026-06'
ORDER BY employee_name;

-- 6. Show overtime pay for June 2026.
SELECT
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    oe.payroll_month,
    oe.overtime_hours,
    oe.hourly_rate,
    (oe.overtime_hours * oe.hourly_rate) AS overtime_pay
FROM overtime_entries oe
JOIN employees e ON oe.employee_id = e.employee_id
WHERE oe.payroll_month = '2026-06'
ORDER BY employee_name;

-- 7. Calculate total allowances per employee for June 2026.
SELECT
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    COALESCE(SUM(ea.amount), 0) AS total_allowances
FROM employees e
LEFT JOIN employee_allowances ea
    ON e.employee_id = ea.employee_id
    AND ea.payroll_month = '2026-06'
GROUP BY e.employee_id, employee_name
ORDER BY employee_name;

-- 8. Calculate total deductions per employee for June 2026.
SELECT
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    COALESCE(SUM(ed.amount), 0) AS total_deductions
FROM employees e
LEFT JOIN employee_deductions ed
    ON e.employee_id = ed.employee_id
    AND ed.payroll_month = '2026-06'
GROUP BY e.employee_id, employee_name
ORDER BY employee_name;

-- 9. Calculate gross salary for each employee for June 2026.
SELECT
    e.employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    sg.basic_salary,
    COALESCE(allowance_totals.total_allowances, 0) AS total_allowances,
    COALESCE(overtime_totals.overtime_pay, 0) AS overtime_pay,
    (
        sg.basic_salary
        + COALESCE(allowance_totals.total_allowances, 0)
        + COALESCE(overtime_totals.overtime_pay, 0)
    ) AS gross_salary
FROM employees e
JOIN salary_grades sg ON e.salary_grade_id = sg.salary_grade_id
LEFT JOIN (
    SELECT employee_id, SUM(amount) AS total_allowances
    FROM employee_allowances
    WHERE payroll_month = '2026-06'
    GROUP BY employee_id
) allowance_totals ON e.employee_id = allowance_totals.employee_id
LEFT JOIN (
    SELECT employee_id, SUM(overtime_hours * hourly_rate) AS overtime_pay
    FROM overtime_entries
    WHERE payroll_month = '2026-06'
    GROUP BY employee_id
) overtime_totals ON e.employee_id = overtime_totals.employee_id
WHERE e.employment_status = 'Active'
ORDER BY employee_name;

-- 10. Calculate full payroll for June 2026 before saving it.
SELECT
    e.employee_id,
    e.staff_no,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    sg.basic_salary,
    COALESCE(allowance_totals.total_allowances, 0) AS total_allowances,
    COALESCE(overtime_totals.overtime_pay, 0) AS overtime_pay,
    (
        sg.basic_salary
        + COALESCE(allowance_totals.total_allowances, 0)
        + COALESCE(overtime_totals.overtime_pay, 0)
    ) AS gross_salary,
    COALESCE(deduction_totals.total_deductions, 0) AS total_deductions,
    ROUND((
        sg.basic_salary
        + COALESCE(allowance_totals.total_allowances, 0)
        + COALESCE(overtime_totals.overtime_pay, 0)
    ) * (sg.tax_rate / 100), 2) AS tax_amount,
    ROUND((
        sg.basic_salary
        + COALESCE(allowance_totals.total_allowances, 0)
        + COALESCE(overtime_totals.overtime_pay, 0)
    )
    - COALESCE(deduction_totals.total_deductions, 0)
    - ((
        sg.basic_salary
        + COALESCE(allowance_totals.total_allowances, 0)
        + COALESCE(overtime_totals.overtime_pay, 0)
    ) * (sg.tax_rate / 100)), 2) AS net_salary
FROM employees e
JOIN salary_grades sg ON e.salary_grade_id = sg.salary_grade_id
LEFT JOIN (
    SELECT employee_id, SUM(amount) AS total_allowances
    FROM employee_allowances
    WHERE payroll_month = '2026-06'
    GROUP BY employee_id
) allowance_totals ON e.employee_id = allowance_totals.employee_id
LEFT JOIN (
    SELECT employee_id, SUM(amount) AS total_deductions
    FROM employee_deductions
    WHERE payroll_month = '2026-06'
    GROUP BY employee_id
) deduction_totals ON e.employee_id = deduction_totals.employee_id
LEFT JOIN (
    SELECT employee_id, SUM(overtime_hours * hourly_rate) AS overtime_pay
    FROM overtime_entries
    WHERE payroll_month = '2026-06'
    GROUP BY employee_id
) overtime_totals ON e.employee_id = overtime_totals.employee_id
WHERE e.employment_status = 'Active'
ORDER BY employee_name;

-- 11. Save/process payroll for June 2026 into payroll_runs.
INSERT INTO payroll_runs (
    payroll_month_id,
    employee_id,
    basic_salary,
    total_allowances,
    overtime_pay,
    gross_salary,
    total_deductions,
    tax_amount,
    net_salary
)
SELECT
    pm.payroll_month_id,
    e.employee_id,
    sg.basic_salary,
    COALESCE(allowance_totals.total_allowances, 0) AS total_allowances,
    COALESCE(overtime_totals.overtime_pay, 0) AS overtime_pay,
    (
        sg.basic_salary
        + COALESCE(allowance_totals.total_allowances, 0)
        + COALESCE(overtime_totals.overtime_pay, 0)
    ) AS gross_salary,
    COALESCE(deduction_totals.total_deductions, 0) AS total_deductions,
    ROUND((
        sg.basic_salary
        + COALESCE(allowance_totals.total_allowances, 0)
        + COALESCE(overtime_totals.overtime_pay, 0)
    ) * (sg.tax_rate / 100), 2) AS tax_amount,
    ROUND((
        sg.basic_salary
        + COALESCE(allowance_totals.total_allowances, 0)
        + COALESCE(overtime_totals.overtime_pay, 0)
    )
    - COALESCE(deduction_totals.total_deductions, 0)
    - ((
        sg.basic_salary
        + COALESCE(allowance_totals.total_allowances, 0)
        + COALESCE(overtime_totals.overtime_pay, 0)
    ) * (sg.tax_rate / 100)), 2) AS net_salary
FROM employees e
JOIN salary_grades sg ON e.salary_grade_id = sg.salary_grade_id
JOIN payroll_months pm ON pm.payroll_month = '2026-06'
LEFT JOIN (
    SELECT employee_id, SUM(amount) AS total_allowances
    FROM employee_allowances
    WHERE payroll_month = '2026-06'
    GROUP BY employee_id
) allowance_totals ON e.employee_id = allowance_totals.employee_id
LEFT JOIN (
    SELECT employee_id, SUM(amount) AS total_deductions
    FROM employee_deductions
    WHERE payroll_month = '2026-06'
    GROUP BY employee_id
) deduction_totals ON e.employee_id = deduction_totals.employee_id
LEFT JOIN (
    SELECT employee_id, SUM(overtime_hours * hourly_rate) AS overtime_pay
    FROM overtime_entries
    WHERE payroll_month = '2026-06'
    GROUP BY employee_id
) overtime_totals ON e.employee_id = overtime_totals.employee_id
WHERE e.employment_status = 'Active'
ON DUPLICATE KEY UPDATE
    basic_salary = VALUES(basic_salary),
    total_allowances = VALUES(total_allowances),
    overtime_pay = VALUES(overtime_pay),
    gross_salary = VALUES(gross_salary),
    total_deductions = VALUES(total_deductions),
    tax_amount = VALUES(tax_amount),
    net_salary = VALUES(net_salary);

-- 12. Generate payslips after payroll has been processed.
INSERT INTO payslips (payroll_run_id, payslip_no)
SELECT
    pr.payroll_run_id,
    CONCAT('PS-', pm.payroll_month, '-', e.staff_no) AS payslip_no
FROM payroll_runs pr
JOIN payroll_months pm ON pr.payroll_month_id = pm.payroll_month_id
JOIN employees e ON pr.employee_id = e.employee_id
WHERE pm.payroll_month = '2026-06'
ON DUPLICATE KEY UPDATE
    payslip_no = VALUES(payslip_no);

-- 13. Show generated payslip details.
SELECT
    ps.payslip_no,
    pm.payroll_month,
    e.staff_no,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    d.department_name,
    pr.basic_salary,
    pr.total_allowances,
    pr.overtime_pay,
    pr.gross_salary,
    pr.total_deductions,
    pr.tax_amount,
    pr.net_salary,
    ps.generated_at
FROM payslips ps
JOIN payroll_runs pr ON ps.payroll_run_id = pr.payroll_run_id
JOIN payroll_months pm ON pr.payroll_month_id = pm.payroll_month_id
JOIN employees e ON pr.employee_id = e.employee_id
JOIN departments d ON e.department_id = d.department_id
WHERE pm.payroll_month = '2026-06'
ORDER BY employee_name;

-- 14. Monthly payroll summary report.
SELECT
    pm.payroll_month,
    COUNT(pr.payroll_run_id) AS total_employees_paid,
    SUM(pr.gross_salary) AS total_gross_salary,
    SUM(pr.total_deductions) AS total_deductions,
    SUM(pr.tax_amount) AS total_tax,
    SUM(pr.net_salary) AS total_net_salary
FROM payroll_months pm
JOIN payroll_runs pr ON pm.payroll_month_id = pr.payroll_month_id
GROUP BY pm.payroll_month
ORDER BY pm.payroll_month DESC;

-- 15. Department payroll cost report.
SELECT
    d.department_name,
    COUNT(e.employee_id) AS total_employees,
    SUM(pr.gross_salary) AS department_gross_salary,
    SUM(pr.net_salary) AS department_net_salary
FROM departments d
JOIN employees e ON d.department_id = e.department_id
JOIN payroll_runs pr ON e.employee_id = pr.employee_id
JOIN payroll_months pm ON pr.payroll_month_id = pm.payroll_month_id
WHERE pm.payroll_month = '2026-06'
GROUP BY d.department_id, d.department_name
ORDER BY department_net_salary DESC;

-- 16. Highest paid employees report.
SELECT
    e.staff_no,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    d.department_name,
    pr.net_salary
FROM payroll_runs pr
JOIN employees e ON pr.employee_id = e.employee_id
JOIN departments d ON e.department_id = d.department_id
JOIN payroll_months pm ON pr.payroll_month_id = pm.payroll_month_id
WHERE pm.payroll_month = '2026-06'
ORDER BY pr.net_salary DESC;

