# Payroll Management Database System

Group 7 payroll management database project.

## Project Summary

This system helps an organization manage:

- employees
- departments
- salary grades
- allowances
- deductions
- overtime
- monthly payroll processing
- payslips
- payroll reports

## Current Contents

```text
PROJECT_PLAN.md
database/
  ERD.md
  schema.sql
  seed.sql
  queries.sql
```

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MySQL
- Database Tool: MySQL Workbench

## Database Setup

1. Open MySQL Workbench.
2. Open `database/schema.sql`.
3. Run the script to create the database and tables.
4. Open `database/seed.sql`.
5. Run the script to insert sample data.
6. Use `database/queries.sql` for testing and presentation queries.

Run order:

```text
1. database/schema.sql
2. database/seed.sql
3. database/queries.sql
```

Do not run the whole `queries.sql` file blindly during presentation. Some queries insert payroll records. Highlight and run one query at a time.

## Database Files

`database/schema.sql`

Creates the database called `payroll_management_system` and creates all 12 tables with primary keys and foreign keys.

`database/seed.sql`

Inserts sample users, departments, salary grades, employees, allowances, deductions, overtime entries, and one payroll month.

`database/queries.sql`

Contains useful SQL queries for testing and presentation, including payroll calculation, payroll processing, payslip generation, and reports.

`database/ERD.md`

Contains the Entity Relationship Diagram and relationship explanation.

## Team Roles

- Database Engineer: database schema, seed data, SQL queries, ERD.
- Backend Developer: Express API, MySQL connection, payroll processing logic.
- Frontend Developer: React screens, forms, tables, payslip and report views.

## Suggested Backend Endpoints

```text
POST   /api/login

GET    /api/employees
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id

GET    /api/departments
POST   /api/departments
PUT    /api/departments/:id
DELETE /api/departments/:id

GET    /api/salary-grades
POST   /api/salary-grades
PUT    /api/salary-grades/:id
DELETE /api/salary-grades/:id

GET    /api/allowances
POST   /api/allowances

GET    /api/deductions
POST   /api/deductions

GET    /api/overtime
POST   /api/overtime

POST   /api/payroll/process
GET    /api/payroll/:month

GET    /api/payslips/:month

GET    /api/reports/monthly-summary
GET    /api/reports/department-summary
GET    /api/reports/highest-paid
```

## Payroll Formula

```text
gross_salary = basic_salary + total_allowances + overtime_pay

tax_amount = gross_salary * tax_rate / 100

net_salary = gross_salary - total_deductions - tax_amount
```

## Demo Flow

1. Login.
2. Show dashboard.
3. Register or view employee.
4. Show department and salary grade assignment.
5. Add or view allowance.
6. Add or view deduction.
7. Add or view overtime.
8. Process payroll.
9. Generate payslip.
10. View reports.
11. Explain ERD and relationships.
12. Run SQL queries live in MySQL Workbench.
