using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Todos2019.Controllers
{
    [Produces("application/json")]
    [Route("api/todos")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private static List<string> all = new List<string>()
        {
            "Remodel Bathroom",
            "Finish my laser app",
            "Do things with kids",
            "Plan Dungeons and Dragons",

        };

        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return all;
        }


        [HttpPost]
        public ActionResult<IEnumerable<string>> Post([FromBody] string todo)
        {
            all.Add(todo);
            return all;
        }

        [HttpDelete]
        public ActionResult<IEnumerable<string>> Delete([FromBody] string todo)
        {
            all.Remove(todo);
            return all;
        }
    }
}