using Kaffi.Backend.Code.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Kaffi.Backend.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class KaffiController : Controller
    {
        private IKaffiDao _kaffiDao;
        public KaffiController(IKaffiDao kaffiDao)
        {
            _kaffiDao = kaffiDao;
        }

        [HttpGet]
        [Route("/{id}")]
        public IActionResult GetCoffe(int id)
        {
            return Ok(_kaffiDao.GetCoffeeAsync(id));
        }
    }
}
