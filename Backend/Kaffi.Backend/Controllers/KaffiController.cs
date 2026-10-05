using Kaffi.Backend.Code.Interfaces;
using Kaffi.Backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Kaffi.Backend.Controllers
{
    [ApiController]
    [Route("[api/Controller]")]
    public class KaffiController : Controller
    {
        private IKaffiDao _kaffiDao;
        private ILogger<KaffiController> _logger;
        public KaffiController(IKaffiDao kaffiDao, ILogger<KaffiController> logger)
        {
            _kaffiDao = kaffiDao;
            _logger = logger;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCoffe(int id)
        {
            if (id <= 0)
            {
                _logger.LogWarning("ID cannot be below or 0, actual ID was: {id}", id);
                return BadRequest($"ID cannot be less than or zero, actual ID was: {id}");
            }

            try
            {
                var coffee = await _kaffiDao.GetCoffeeByIdAsync(id);

                if (coffee == null)
                {
                    _logger.LogInformation("Coffee with ID: {id} could not be found", id);
                    return NotFound(" Object not found");
                }

                return Ok(coffee);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when trying to get coffee with ID: {id}", id);
                return StatusCode(500, "Error when trying to get object");
            }

        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCoffeeAsync(int id)
        {
            if (id <= 0)
            {
                _logger.LogWarning("Invalid ID received {id}:", id);
                return BadRequest($"ID cannot be less than or zero, actual ID was: {id}");
            }

            try
            {
                var deletedCoffee = await _kaffiDao.DeleteCoffeeByIdAsync(id);

                if (!deletedCoffee)
                {
                    _logger.LogInformation("Coffee with ID: {id} not found", id);
                    return NotFound();
                }

                return NoContent();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error when trying to delete coffee with ID: {id}", id);
                return StatusCode(500, "Error while trying to delete object");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCoffeeAsync(CreateCoffeeRequestDto request)
        {
            var newCoffee = await _kaffiDao.CreateCoffeeAsync(request);
            return Ok(newCoffee);
        }

        [HttpGet]
        public async Task<IActionResult> GetCoffeeBasedOnFlavour([FromQuery] List<int> ids)
        {
            if (ids.Count < 3)
            {
                _logger.LogWarning("Flavourlist cannot contain less than 3 positive numbers {ids}", ids);
                return BadRequest("3 flavours are needed in order to get a object");
            }

            try
            {
                var coffeeList = await _kaffiDao.GetCoffeesBasedOnFlavour(ids);
                return Ok(coffeeList);
            }

            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "Error when trying to get coffee based on flavours");
                throw;
            }
        }

        [HttpGet]
        [Route("recommendations")]
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
