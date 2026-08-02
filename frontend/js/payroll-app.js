// ==========================================================
// Payroll Management System — shared script
// Handles the mobile sidebar toggle. Add page-specific
// scripts in their own file (e.g. deductions.js) rather than
// growing this one, so we don't both edit it at once.
// ==========================================================

document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
  }
});