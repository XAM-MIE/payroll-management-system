# Proposed Payroll Management Database System Plan

## Project Goal

Build a working payroll management database application called Net Salary. The system should help an organization manage employees, departments, salary grades, allowances, deductions, overtime, payroll processing, payslip generation, and payroll reports.

The project must show a real database, connected application screens, CRUD operations, search/filter, reports, and live demonstration of how payroll data moves from the user interface into the database.

## Recommended Stack

Frontend:
- HTML5
- Bootstrap 5 (for styling and layout)
- Vanilla CSS (minimal overrides)
- Vanilla JavaScript (for UI interactions and API calls)

Backend:
- Node.js
- Express.js
- MySQL driver or Prisma/Sequelize ORM
- JWT or simple session-based login

Database:
- MySQL
- MySQL Workbench or phpMyAdmin

Collaboration:
- GitHub
- Postman or Thunder Client for API testing

## Team Roles

### Database Engineer

Responsibilities:
- Design the database tables
- Create the ERD
- Define primary keys and foreign keys
- Write `schema.sql`
- Write `seed.sql`
- Write `queries.sql`
- Insert sample data
- Test SQL queries
- Explain database relationships during presentation

### Backend Developer

Responsibilities:
- Set up the Express.js backend
- Connect backend to MySQL
- Create API endpoints
- Handle login/authentication
- Write payroll processing logic
- Generate payslip data
- Provide report endpoints
- Test API routes with Postman or Thunder Client

### Frontend Developer

Responsibilities:
- Build the HTML application screens
- Style the UI using Bootstrap 5 to ensure a good user experience
- Create forms for inserting records
- Display records in tables
- Add search/filter UI
- Connect frontend to backend APIs using JavaScript `fetch()` or `axios`
- Build payslip and report pages

## GitHub Project Structure

```text
payroll-management-system/
  frontend/
    css/
      style.css
    js/
      script.js
    pages/
      dashboard.html
      employees.html
      departments.html
      salary-grades.html
      allowances.html
      deductions.html
      overtime.html
      payroll.html
      payslip.html
      reports.html
    index.html (Login)
    layout.html (Base Structure)
  backend/
  database/
    schema.sql
    seed.sql
    queries.sql
    erd.png
  PROPOSED_README.md
  PROPOSED_PROJECT_PLAN.md
```

## Important Note About MySQL And GitHub

The actual MySQL database is not uploaded to GitHub.

Instead, we upload SQL files:

```text
database/schema.sql
database/seed.sql
database/queries.sql
database/erd.png
```

Each developer will run the SQL files on their own computer to recreate the same database.

## Database Tables

The database should contain these tables:

1. `users`
2. `departments`
3. `salary_grades`
4. `employees`
5. `allowance_types`
6. `employee_allowances`
7. `deduction_types`
8. `employee_deductions`
9. `overtime_entries`
10. `payroll_months`
11. `payroll_runs`
12. `payslips`

## Required Application Features

The system should include:

1. Login or role control
2. Employee registration
3. Department setup
4. Salary grade setup
5. Allowance entry
6. Deduction entry
7. Overtime entry
8. Payroll processing
9. Payslip generation
10. Monthly payroll summary
11. Payroll reports (at least 3 reports)
12. Search and filter on all tables
13. Update and delete records (Delete requires a confirmation popup)

## Step-by-Step Build Plan

### Step 1: Agree On Scope

Decide exactly what the system will do. We should focus on the required project features first and avoid unnecessary extras.

Final agreed scope:
- Login
- Employee management
- Department management
- Salary grade management
- Allowance management
- Deduction management
- Overtime management
- Payroll processing
- Payslip generation
- Reports
- Search, update, and delete

### Step 2: Create The Database Design

The database engineer creates:
- List of tables
- Table columns
- Primary keys
- Foreign keys
- Relationships between tables

### Step 3: Create The ERD

Create an Entity Relationship Diagram showing how the tables connect.

### Step 4: Write `schema.sql`

Create the database and all tables.

### Step 5: Write `seed.sql`

Insert sample data into the database.

### Step 6: Write `queries.sql`

Prepare at least 10 useful SQL queries for live demonstration.

### Step 7: Set Up Backend

Backend developer creates Express server and MySQL connection.

### Step 8: Create API Endpoints

Backend developer creates routes for handling CRUD operations, payroll processing, and reports.

### Step 9: Test Backend With Postman

Before connecting the frontend, backend routes should be tested with Postman or Thunder Client.

### Step 10: Set Up Frontend

Frontend developer creates the HTML + Bootstrap project structure.

### Step 11: Build Frontend Screens

Frontend screens:
- Login page
- Dashboard (with summary cards)
- Employees page
- Departments page
- Salary grades page
- Allowances page
- Deductions page
- Overtime page
- Payroll processing page
- Payslip page
- Reports page

### Step 12: Connect Frontend To Backend

Frontend developer connects forms and tables to backend API using JavaScript.

### Step 13: Full System Testing

Test the full user flow.

### Step 14: Fix Bugs And Clean Up

Fix broken forms, bad API responses, UI errors.

### Step 15: Prepare Presentation

Presentation should include ERD, App Demo, SQL queries, Reports.

### Step 16: Rehearse Demo

Every group member should know what to say.

### Step 17: Final Submission

Final project should contain working frontend, backend, database, and demo files.
