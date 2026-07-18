// ==========================================================
// Reports page — switches between the 3 report panels.
// Once Sammy shares the reporting/SQL routes, each report's
// table body would be filled from a real fetch() call instead
// of the hardcoded sample rows currently in reports.html.
// ==========================================================

function showReport(reportName) {
  // Hide all panels, show the selected one
  document.querySelectorAll('.report-panel').forEach(panel => {
    panel.classList.add('d-none');
  });
  document.getElementById('report-' + reportName).classList.remove('d-none');

  // Update active tab styling
  document.querySelectorAll('.report-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector(`.report-tab[data-report="${reportName}"]`).classList.add('active');
}
