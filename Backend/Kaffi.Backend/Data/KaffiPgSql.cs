using Kaffi.Backend.Code.Entities;
using Kaffi.Backend.Code.Interfaces;
using Kaffi.Backend.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kaffi.Backend.Data.Context;

public class KaffiPgSql : IKaffiDao
{
    private readonly KaffiContext _context;

    public KaffiPgSql(KaffiContext context)
    {
    _context = context;
    }

    // ToDo, Kanskje bruke DAO her siden vi ikke trenger ID'er men kun verdiene, typ navn på land, kontinent etc?
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

    // ToDo Tommorow denne legger til countryID men landet følger ikke med
    public async Task<Coffee> CreateCoffeeAsync(CreateCoffee request)
    {
        
        List<Flavour> flavours = await _context.Flavour.Where(f => request.FlavourIds.Contains(f.Id)).ToListAsync();

        var coffee = new Coffee
        {
            Name = request.Name,
            VarietyId = request.VarietyId,
            CountryId = request.CountryId,
        };

        foreach(var Flavour in flavours)
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
}