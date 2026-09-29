using Kaffi.Backend.Code.Entities;
using Kaffi.Backend.Code.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Kaffi.Backend.Data.Context;

public class KaffiPgSql : IKaffiDao
{
    private readonly KaffiContext _context;

    public KaffiPgSql(KaffiContext context)
{
    _context = context;
}
    public async Task<int> CreateCoffeeAsync(Coffee kaffi)
    {

        _context.Coffee.Add(kaffi);
        await _context.SaveChangesAsync();
        return kaffi.Id;
    }

    public Task<Coffee?> GetCoffeeAsync(int id)
    {
        return _context.Coffee
            .Include(c => c.Variety)
            .Include(c => c.Country)
                .ThenInclude(co => co.Continent)
            .Include(c => c.CoffeeFlavours)
                .ThenInclude(cf => cf.Flavour)
            .FirstOrDefaultAsync(c => c.Id == id);
    }
}