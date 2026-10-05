using Kaffi.Backend.Code.Entities;
using Microsoft.EntityFrameworkCore;

namespace Kaffi.Backend.Data.Context;

public class KaffiContext : DbContext
{
    public KaffiContext(DbContextOptions<KaffiContext> options) : base(options) { }
    public DbSet<Continent> Continent => Set<Continent>();
    public DbSet<Country> Country => Set<Country>();
    public DbSet<Flavour> Flavour => Set<Flavour>();
    public DbSet<Variety> Variety => Set<Variety>();
    public DbSet<CoffeeFlavour> Coffee_Flavours => Set<CoffeeFlavour>();
    public DbSet<Coffee> Coffee => Set<Coffee>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CoffeeFlavour>()
            .HasKey(cf => new { cf.CoffeeId, cf.FlavourId });
    }
}