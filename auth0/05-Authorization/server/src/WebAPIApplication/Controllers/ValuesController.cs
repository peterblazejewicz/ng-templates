using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPIApplication.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        [HttpGet]
        [Route("ping")]
        public dynamic Ping()
        {
            return new {
                message = "All good. You don't need to be authenticated to call this."
            };
        }

        [Authorize]
        [HttpGet]
        [Route("secured/ping")]
        public object PingSecured()
        {
            return new {
                message = "All good. You only get this message if you are authenticated."
            };
        }

    }
}
