using Microsoft.AspNetCore.Mvc;

public class IncidentReportController : Controller
{
    // Submit report page
    public IActionResult SubmitReport()
    {
        return View();
    }

    // View all reports (optional)
    public IActionResult ViewReports()
    {
        return View();
    }
}
