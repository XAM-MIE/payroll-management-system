DROP DATABASE IF EXISTS payroll_management_system;
CREATE DATABASE payroll_management_system;
USE payroll_management_system;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'payroll_officer') NOT NULL DEFAULT 'payroll_officer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    manager_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE salary_grades (
    salary_grade_id INT AUTO_INCREMENT PRIMARY KEY,
    grade_name VARCHAR(50) NOT NULL UNIQUE,
    basic_salary DECIMAL(12, 2) NOT NULL,
    tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    staff_no VARCHAR(30) NOT NULL UNIQUE,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    phone VARCHAR(30),
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    hire_date DATE NOT NULL,
    department_id INT NOT NULL,
    salary_grade_id INT NOT NULL,
    employment_status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_employees_department
        FOREIGN KEY (department_id) REFERENCES departments(department_id)
        ON UPDATE CASCADE,
    CONSTRAINT fk_employees_salary_grade
        FOREIGN KEY (salary_grade_id) REFERENCES salary_grades(salary_grade_id)
        ON UPDATE CASCADE
);

CREATE TABLE allowance_types (
    allowance_type_id INT AUTO_INCREMENT PRIMARY KEY,
    allowance_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE employee_allowances (
    employee_allowance_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    allowance_type_id INT NOT NULL,
    payroll_month CHAR(7) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_employee_allowances_employee
        FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_employee_allowances_type
        FOREIGN KEY (allowance_type_id) REFERENCES allowance_types(allowance_type_id)
        ON UPDATE CASCADE
);

CREATE TABLE deduction_types (
    deduction_type_id INT AUTO_INCREMENT PRIMARY KEY,
    deduction_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
);

CREATE TABLE employee_deductions (
    employee_deduction_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    deduction_type_id INT NOT NULL,
    payroll_month CHAR(7) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_employee_deductions_employee
        FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_employee_deductions_type
        FOREIGN KEY (deduction_type_id) REFERENCES deduction_types(deduction_type_id)
        ON UPDATE CASCADE
);

CREATE TABLE overtime_entries (
    overtime_entry_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    payroll_month CHAR(7) NOT NULL,
    overtime_hours DECIMAL(8, 2) NOT NULL,
    hourly_rate DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_overtime_entries_employee
        FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE payroll_months (
    payroll_month_id INT AUTO_INCREMENT PRIMARY KEY,
    payroll_month CHAR(7) NOT NULL UNIQUE,
    status ENUM('Open', 'Processed') NOT NULL DEFAULT 'Open',
    processed_at TIMESTAMP NULL
);

CREATE TABLE payroll_runs (
    payroll_run_id INT AUTO_INCREMENT PRIMARY KEY,
    payroll_month_id INT NOT NULL,
    employee_id INT NOT NULL,
    basic_salary DECIMAL(12, 2) NOT NULL,
    total_allowances DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    overtime_pay DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    gross_salary DECIMAL(12, 2) NOT NULL,
    total_deductions DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    net_salary DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_employee_month (payroll_month_id, employee_id),
    CONSTRAINT fk_payroll_runs_month
        FOREIGN KEY (payroll_month_id) REFERENCES payroll_months(payroll_month_id)
        ON UPDATE CASCADE,
    CONSTRAINT fk_payroll_runs_employee
        FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
        ON UPDATE CASCADE
);

CREATE TABLE payslips (
    payslip_id INT AUTO_INCREMENT PRIMARY KEY,
    payroll_run_id INT NOT NULL UNIQUE,
    payslip_no VARCHAR(50) NOT NULL UNIQUE,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payslips_payroll_run
        FOREIGN KEY (payroll_run_id) REFERENCES payroll_runs(payroll_run_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
