const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employees");
const departmentRoutes = require("./routes/departments");
const salaryGradeRoutes = require("./routes/salaryGrades");
const allowanceRoutes = require("./routes/allowances");
const deductionRoutes = require("./routes/deductions");
const overtimeRoutes = require("./routes/overtime");
const payrollRoutes = require("./routes/payroll");
const payslipRoutes = require("./routes/payslip");
const reportRoutes = require("./routes/reports");

app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/departments", departmentRoutes);
app.use("/salary-grades", salaryGradeRoutes);
app.use("/allowances", allowanceRoutes);
app.use("/deductions", deductionRoutes);
app.use("/overtime", overtimeRoutes);
app.use("/payroll", payrollRoutes);
app.use("/payslip", payslipRoutes);
app.use("/reports", reportRoutes);

// Test route
app.get("/", (req, res) => {
	res.json({ message: "Payroll backend is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
