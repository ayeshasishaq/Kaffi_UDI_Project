using Kaffi.Backend.Code.Interfaces;
using Kaffi.Backend.DTOs;
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
        [Route("{id}")]
        public async Task<IActionResult> GetCoffe(int id)
        {
            try
            {
                var coffee = await _kaffiDao.GetCoffeeByIdAsync(id);

                if (coffee == null)
                {
                    return NotFound("Coffee could not be found, please try another coffee");
                }
                return Ok(coffee);
            }
            catch (Exception ex)
            {

            }
            return Ok(await _kaffiDao.GetCoffeeByIdAsync(id));
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCoffeeAsync(int id)
        {
            try
            {
                var deletedCoffee = await _kaffiDao.DeleteCoffeeByIdAsync(id);

                if (!deletedCoffee)
                {
                    return NotFound();
                }

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error while trying to delete coffee");
            }
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> CreateCoffeeAsync(CreateCoffeeRequestDto request)
        {
            var newCoffee = await _kaffiDao.CreateCoffeeAsync(request);
            return Ok(newCoffee);
        }

        [HttpGet]
        [Route("by-flavours")]

        public async Task<IActionResult> GetCoffeeBasedOnFlavour([FromQuery] List<int> ids)
        {
            var coffeeList = await _kaffiDao.GetCoffeeBasedOnFlavourSelected(ids);
            return Ok(coffeeList);
        }

        [HttpGet]
        [Route("first-match")]
        public async Task<IActionResult> GetFirstCoffeeRecByFlavour([FromQuery] List<int> ids)
        {
            var coffee = await _kaffiDao.GetRecCoffee(ids);
            return Ok(coffee);
        }

        [HttpGet]
        [Route("countries")]
        public async Task<IActionResult> GetCountries()
        {
            return Ok(await _kaffiDao.GetAllCountriesAsync());
        }

        [HttpGet]
        [Route("flavours")]
        public async Task<IActionResult> GetFlavours()
        {
            return Ok(await _kaffiDao.GetAllFlavoursAsync());
        }
    }
}
