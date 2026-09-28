using Kaffi.Backend.Code.Entities;
using Kaffi.Backend.Code.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Kaffi.Backend.Data.Context;

public class KaffiPgSql : IKaffiDao
{
    public int CreateCoffee(Coffee kaffi)
    {
        using KaffiContext db = new();
        db.Coffee.Add(kaffi);
        db.SaveChanges();
        return kaffi.Id;
    }

    public Coffee? GetCoffee(int id)
    {
        using KaffiContext db = new();
        return db.Coffee
            .Include(c => c.Variety)
            .Include(c => c.Country)
                .ThenInclude(co => co.Continent)
            .Include(c => c.CoffeeFlavours)
                .ThenInclude(cf => cf.Flavour)
            .FirstOrDefault(c => c.Id == id);
    }
}