# Payroll Management Database System Plan

## Project Goal

Build a working payroll management database application for Group 7. The system should help an organization manage employees, departments, salary grades, allowances, deductions, overtime, payroll processing, payslip generation, and payroll reports.

The project must show a real database, connected application screens, CRUD operations, search/filter, reports, and live demonstration of how payroll data moves from the user interface into the database.

## Recommended Stack

Frontend:
- React
- Vite
- Tailwind CSS
- Axios

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
- Set up React + Vite frontend
- Build the application screens
- Create forms for inserting records
- Display records in tables
- Add search/filter UI
- Connect frontend to backend APIs
- Build payslip and report pages

## GitHub Project Structure

```text
payroll-management-system/
  frontend/
  backend/
  database/
    schema.sql
    seed.sql
    queries.sql
    erd.png
  README.md
  PROJECT_PLAN.md
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
11. Payroll reports
12. Search and filter
13. Update and delete records

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

Example relationships:
- One department has many employees
- One salary grade has many employees
- One employee can have many allowances
- One employee can have many deductions
- One employee can have many overtime entries
- One payroll month has many payroll runs
- One payroll run has one payslip

### Step 3: Create The ERD

Create an Entity Relationship Diagram showing how the tables connect.

This will be used during presentation to explain the database structure.

### Step 4: Write `schema.sql`

Create the database and all tables.

This file should contain:
- `CREATE DATABASE`
- `CREATE TABLE`
- Primary keys
- Foreign keys
- Required constraints

### Step 5: Write `seed.sql`

Insert sample data into the database.

Sample data should include:
- Admin user
- Departments
- Salary grades
- Employees
- Allowance types
- Deduction types
- Allowance entries
- Deduction entries
- Overtime entries

### Step 6: Write `queries.sql`

Prepare at least 10 useful SQL queries for live demonstration.

Examples:
- List all employees with their departments
- List all employees with salary grades
- Show allowances for an employee
- Show deductions for an employee
- Show overtime for an employee
- Calculate gross salary
- Calculate net salary
- Show monthly payroll summary
- Show department payroll cost
- Show payslip details

### Step 7: Set Up Backend

Backend developer creates:
- Express server
- MySQL connection
- Environment variables
- API route structure

Example backend files:

```text
backend/
  src/
    server.js
    db.js
    routes/
    controllers/
  .env.example
  package.json
```

### Step 8: Create API Endpoints

Backend developer creates routes like:

```text
POST   /api/login
GET    /api/employees
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id

GET    /api/departments
POST   /api/departments

GET    /api/salary-grades
POST   /api/salary-grades

POST   /api/allowances
POST   /api/deductions
POST   /api/overtime

POST   /api/payroll/process
GET    /api/payroll/:month
GET    /api/payslips/:employeeId/:month

GET    /api/reports/monthly-summary
GET    /api/reports/department-summary
GET    /api/reports/employee-payroll
```

### Step 9: Test Backend With Postman

Before connecting the frontend, backend routes should be tested with Postman or Thunder Client.

Test:
- Add employee
- Update employee
- Delete employee
- Add allowance
- Add deduction
- Add overtime
- Process payroll
- Fetch payslip
- Fetch reports

### Step 10: Set Up Frontend

Frontend developer creates React + Vite app.

Example frontend files:

```text
frontend/
  src/
    pages/
    components/
    api/
    App.jsx
  package.json
```

### Step 11: Build Frontend Screens

Frontend screens:
- Login page
- Dashboard
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

Frontend developer connects forms and tables to backend API using Axios.

Example:
- Employee form sends data to `POST /api/employees`
- Employee table gets data from `GET /api/employees`
- Payroll button sends request to `POST /api/payroll/process`

### Step 13: Full System Testing

Test the full user flow:

1. Login
2. Add department
3. Add salary grade
4. Register employee
5. Add allowance
6. Add deduction
7. Add overtime
8. Process payroll
9. View payslip
10. View reports
11. Search records
12. Update records
13. Delete test records

### Step 14: Fix Bugs And Clean Up

Fix:
- Broken forms
- Wrong calculations
- Missing foreign keys
- Bad API responses
- UI errors
- Report errors

### Step 15: Prepare Presentation

Presentation should include:
- Project introduction
- Problem the system solves
- ERD explanation
- Application demonstration
- SQL query demonstration
- Payroll calculation explanation
- Reports demonstration

### Step 16: Rehearse Demo

Every group member should know what to say.

Suggested presentation roles:
- Database engineer explains ERD, tables, keys, and queries
- Backend developer explains API and payroll logic
- Frontend developer explains screens and user flow

### Step 17: Final Submission

Final project should contain:
- Working frontend
- Working backend
- Working MySQL database
- SQL files
- ERD
- Sample data
- Reports
- Demo-ready application

## Backup Development Plan

Because team collaboration can sometimes fail, we will also build a complete backup version of the payroll system in this workspace.

Purpose of the backup:
- Ensure there is always a working version available
- Help compare with the group version
- Provide fallback if the team version is incomplete
- Help understand the full system from database to interface

Backup build order:

1. Finalize database schema
2. Create seed data
3. Create backend routes
4. Create frontend screens
5. Connect frontend to backend
6. Add payroll processing logic
7. Add payslip generation
8. Add reports
9. Test everything
10. Prepare demo instructions

The group can still build the same system together, while this backup version protects us if teamwork becomes slow or disorganized.

## Suggested One-Week Timeline

Day 1:
- Agree on scope
- Create GitHub repository
- Start database design
- Draft ERD

Day 2:
- Finish `schema.sql`
- Finish `seed.sql`
- Backend setup begins
- Frontend layout begins

Day 3:
- Backend CRUD APIs
- Frontend pages for employees, departments, and salary grades

Day 4:
- Allowances, deductions, and overtime
- Connect frontend forms to backend

Day 5:
- Payroll processing
- Payslip generation
- Reports

Day 6:
- Testing
- Bug fixes
- Prepare SQL queries
- Clean UI

Day 7:
- Rehearse presentation
- Final demo test
- Backup files and confirm everything runs

## Final Demo Flow

The demo should follow this order:

1. Login
2. Show dashboard
3. Register employee
4. Add department
5. Add salary grade
6. Add allowance
7. Add deduction
8. Add overtime
9. Process payroll
10. View payslip
11. View monthly payroll summary
12. View reports
13. Show search/filter
14. Show update/delete
15. Explain database relationships
16. Run useful SQL queries live

