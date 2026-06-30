# Payroll Management Database ERD

This Entity Relationship Diagram shows the main tables and relationships in the payroll management database system.

```mermaid
erDiagram
    users {
        INT user_id PK
        VARCHAR username
        VARCHAR password_hash
        VARCHAR full_name
        ENUM role
        TIMESTAMP created_at
    }

    departments {
        INT department_id PK
        VARCHAR department_name
        VARCHAR manager_name
        TIMESTAMP created_at
    }

    salary_grades {
        INT salary_grade_id PK
        VARCHAR grade_name
        DECIMAL basic_salary
        DECIMAL tax_rate
        TIMESTAMP created_at
    }

    employees {
        INT employee_id PK
        VARCHAR staff_no
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR email
        VARCHAR phone
        ENUM gender
        DATE hire_date
        INT department_id FK
        INT salary_grade_id FK
        ENUM employment_status
        TIMESTAMP created_at
    }

    allowance_types {
        INT allowance_type_id PK
        VARCHAR allowance_name
        VARCHAR description
    }

    employee_allowances {
        INT employee_allowance_id PK
        INT employee_id FK
        INT allowance_type_id FK
        CHAR payroll_month
        DECIMAL amount
        TIMESTAMP created_at
    }

    deduction_types {
        INT deduction_type_id PK
        VARCHAR deduction_name
        VARCHAR description
    }

    employee_deductions {
        INT employee_deduction_id PK
        INT employee_id FK
        INT deduction_type_id FK
        CHAR payroll_month
        DECIMAL amount
        TIMESTAMP created_at
    }

    overtime_entries {
        INT overtime_entry_id PK
        INT employee_id FK
        CHAR payroll_month
        DECIMAL overtime_hours
        DECIMAL hourly_rate
        TIMESTAMP created_at
    }

    payroll_months {
        INT payroll_month_id PK
        CHAR payroll_month
        ENUM status
        TIMESTAMP processed_at
    }

    payroll_runs {
        INT payroll_run_id PK
        INT payroll_month_id FK
        INT employee_id FK
        DECIMAL basic_salary
        DECIMAL total_allowances
        DECIMAL overtime_pay
        DECIMAL gross_salary
        DECIMAL total_deductions
        DECIMAL tax_amount
        DECIMAL net_salary
        TIMESTAMP created_at
    }

    payslips {
        INT payslip_id PK
        INT payroll_run_id FK
        VARCHAR payslip_no
        TIMESTAMP generated_at
    }

    departments ||--o{ employees : has
    salary_grades ||--o{ employees : assigned_to
    employees ||--o{ employee_allowances : receives
    allowance_types ||--o{ employee_allowances : classifies
    employees ||--o{ employee_deductions : has
    deduction_types ||--o{ employee_deductions : classifies
    employees ||--o{ overtime_entries : works
    payroll_months ||--o{ payroll_runs : contains
    employees ||--o{ payroll_runs : paid_in
    payroll_runs ||--|| payslips : generates
```

## Relationship Explanation

- One department can have many employees.
- One salary grade can be assigned to many employees.
- One employee can have many allowance entries.
- One allowance type can be used in many employee allowance entries.
- One employee can have many deduction entries.
- One deduction type can be used in many employee deduction entries.
- One employee can have many overtime entries.
- One payroll month can contain many payroll runs.
- One employee can have many payroll runs across different months.
- One payroll run generates one payslip.

## Payroll Calculation

```text
gross_salary = basic_salary + total_allowances + overtime_pay

tax_amount = gross_salary * tax_rate / 100

net_salary = gross_salary - total_deductions - tax_amount
```

