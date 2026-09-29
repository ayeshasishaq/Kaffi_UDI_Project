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
        public async Task<IActionResult> GetCoffe(int id)
        {
            return Ok(await _kaffiDao.GetCoffeeAsync(id));
        }
    }
}
