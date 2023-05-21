using Microsoft.AspNetCore.Mvc;

namespace asp_net_app.Controllers;

[ApiController]
[Route("[controller]")]
public class WordGameController : ControllerBase
{
    private readonly ILogger<WordGameController> _logger;

    public WordGameController(ILogger<WordGameController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWordGame")]
    public String Get()
    {
        return "Hello From WordGameController!";
    }
}
