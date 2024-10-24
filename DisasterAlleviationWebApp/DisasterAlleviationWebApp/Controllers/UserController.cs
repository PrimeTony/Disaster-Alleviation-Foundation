using Microsoft.AspNetCore.Mvc;

public class UserController : Controller
{
    // Display login page
    public IActionResult Login()
    {
        return View();
    }

    // Display registration page
    public IActionResult Register()
    {
        return View();
    }

    // Profile management page
    public IActionResult Profile()
    {
        return View();
    }
}
