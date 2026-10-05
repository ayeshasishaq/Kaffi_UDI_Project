using System.Data.Common;
using Kaffi.Backend.Code.Entities;
using Kaffi.Backend.Code.Interfaces;
using Kaffi.Backend.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Kaffi.Backend.Data.Context;

public class KaffiService : IKaffiDao
{
    private readonly KaffiContext _context;
    private readonly ILogger<KaffiService> _logger;

    public KaffiService(KaffiContext context, ILogger<KaffiService> logger)
    {
        _context = context;
        _logger = logger;
    }
    public Task<Coffee?> GetCoffeeByIdAsync(int id)
    {
        return _context.Coffee
            .Include(c => c.Variety)
            .Include(c => c.Country)
                .ThenInclude(co => co.Continent)
            .Include(c => c.CoffeeFlavours)
                .ThenInclude(cf => cf.Flavour)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<bool> DeleteCoffeeByIdAsync(int id)
    {
        if (id <= 0)
        {
            _logger.LogWarning("ID cannot be below or equal to 0, actual ID was: {id}", id);
            throw new ArgumentOutOfRangeException(nameof(id), "ID cannot be below or equal to 0");
        }

        try
        {
            var coffee = await _context.Coffee.FindAsync(id);

            if (coffee == null)
            {
                _logger.LogWarning("Coffee ID not found");
                return false;
            }

            _context.Coffee.Remove(coffee);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Coffee {id} deleted", id);
            return true;
        }

        catch (DbUpdateException dbUpdateException)
        {
            _logger.LogError(dbUpdateException, "Error deleting coffee with ID: {id}", id);
            throw;
        }
    }
    public async Task<Coffee> CreateCoffeeAsync(CreateCoffeeRequestDto request)
    {

        if (request is null)
        {
            throw new ArgumentNullException(nameof(request));
        }

        try
        {
            List<Flavour> flavours = await _context.Flavour.Where(f => request.FlavourIds.Contains(f.Id)).ToListAsync();
            var coffee = new Coffee
            {
                Name = request.Name,
                VarietyId = request.VarietyId,
                CountryId = request.CountryId,
            };

            foreach (var Flavour in flavours)
            {
                coffee.CoffeeFlavours.Add(new CoffeeFlavour
                {
                    Flavour = Flavour,
                });
            }

            _context.Coffee.Add(coffee);
            await _context.SaveChangesAsync();
            return coffee;
        }

        catch (DbUpdateException dbUpdateException)
        {
            _logger.LogError(dbUpdateException, "Error when trying to create a coffee");
            throw;
        }
    }

    public async Task<List<ShowCoffeeResponse>> GetCoffeesBasedOnFlavour(List<int> listOfFlavourIds)
    {
        if (listOfFlavourIds.Count < 3)
        {
            _logger.LogWarning("Flavourlist cannot contain less than 3 positive numbers {listOfFlavourIds}", listOfFlavourIds);
            throw new ArgumentException("A coffee must have atleast 3 flavours", nameof(listOfFlavourIds));
        }

        try
        {
            var coffee = await _context.Coffee.
                                               Where(c => c.CoffeeFlavours.
                                               Any(x => listOfFlavourIds.Contains(x.FlavourId))).
                                               Select(c => new ShowCoffeeResponse
                                               {
                                                   CoffeeName = c.Name,
                                                   CountryName = c.Country.Name,
                                                   ContinentName = c.Country.Continent.Name,
                                                   Variety = c.Variety.Name,
                                                   Flavours = c.CoffeeFlavours.Select(cf => cf.Flavour.Name).ToList()
                                               }).ToListAsync();
            return coffee;
        }

        catch (Exception ex)
        {
            _logger.LogError(ex, "Error when trying to get coffee based on flavours");
            throw;
        }
    }
    public async Task<ShowCoffeeResponse> GetRecCoffee(List<int> listOfFlavourIds)
    {
        var recCoffee = await _context.Coffee.
                                            Where(c => c.CoffeeFlavours.
                                            Count(x => listOfFlavourIds.Contains(x.FlavourId)) >= 2).
                                            Select(c => new ShowCoffeeResponse
                                            {
                                                CoffeeName = c.Name,
                                                CountryName = c.Country.Name,
                                                ContinentName = c.Country.Continent.Name,
                                                Variety = c.Variety.Name,
                                                Flavours = c.CoffeeFlavours.Select(cf => cf.Flavour.Name).ToList(),
                                                MatchCount = c.CoffeeFlavours.Count(cf => listOfFlavourIds.Contains(cf.FlavourId))
                                            })
                                            .OrderByDescending(d => d.MatchCount)
                                            .ToListAsync();

        var random = new Random();
        var randomRec = random.Next(0, recCoffee.Count);
        return recCoffee[randomRec];
    }

    public async Task<List<CountryDTO>> GetAllCountriesAsync()
    {
        return await _context.Country
            .OrderBy(c => c.Name)
            .Select(c => new CountryDTO
            {
                Id = c.Id,
                Name = c.Name,
                Continent = c.Continent.Name
            })
            .ToListAsync();
    }

    public async Task<List<FlavourDTO>> GetAllFlavoursAsync()
    {
        return await _context.Flavour
            .OrderBy(f => f.Name)
            .Select(f => new FlavourDTO
            {
                Id = f.Id,
                Name = f.Name
            })
            .ToListAsync();
    }
}