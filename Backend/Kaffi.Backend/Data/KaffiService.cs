using Kaffi.Backend.Code.Entities;
using Kaffi.Backend.Code.Interfaces;
using Kaffi.Backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Kaffi.Backend.Data.Context;

public class KaffiService : IKaffiDao
{
    private readonly KaffiContext _context;

    public KaffiService(KaffiContext context)
    {
        _context = context;
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
        var coffee = await _context.Coffee.FindAsync(id);

        if (coffee == null)
        {
            return false;
        }

        _context.Coffee.Remove(coffee);
        await _context.SaveChangesAsync();
        return true;
    }
    public async Task<Coffee> CreateCoffeeAsync(CreateCoffeeRequestDto request)
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

    
    public async Task<List<ShowCoffeeResponse>> GetCoffeeBasedOnFlavourSelected(List<int> listOfFlavourIds)
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

    // Lag en ny funksjon GetTodaysCoffee etc
    public async Task<ShowCoffeeResponse?> GetRecCoffee(List<int> listOfFlavourIds)
    {
        var recCoffee = await _context.Coffee.
                                            Where(c => c.CoffeeFlavours.
                                            Count(x => listOfFlavourIds.Contains(x.FlavourId)) >= 2).
                                            Select( c => new ShowCoffeeResponse
                                            {
                                                CoffeeName = c.Name,
                                                CountryName = c.Country.Name,
                                                ContinentName = c.Country.Continent.Name,
                                                Variety = c.Variety.Name,
                                                Flavours = c.CoffeeFlavours.Select(cf => cf.Flavour.Name).ToList(),
                                                MatchCount = c.CoffeeFlavours.Count(cf => listOfFlavourIds.Contains(cf.FlavourId))
                                            })
                                            .OrderByDescending( d => d.MatchCount)
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
                ContinentId = c.Continent.Id,
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

    public async Task<List<VarietyDTO>> GetAllVarietiesAsync()
    {
        return await _context.Variety
            .OrderBy(v => v.Name)
            .Select(v => new VarietyDTO
            {
                Id = v.Id,
                Name = v.Name
            })
            .ToListAsync();
        
        
    }

}