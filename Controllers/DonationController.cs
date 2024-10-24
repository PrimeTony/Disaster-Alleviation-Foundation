using Microsoft.AspNetCore.Mvc;

public class DonationController : Controller
{
    // Submit donation page
    public IActionResult SubmitDonation()
    {
        return View();
    }

    // View donations
    public IActionResult ViewDonations()
    {
        return View();
    }
}
