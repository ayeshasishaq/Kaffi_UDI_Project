using Kaffi.Backend.Code.Entities;
using Microsoft.EntityFrameworkCore;

namespace Kaffi.Backend.Data.Context;

public class KaffiContext : DbContext
{
    public KaffiContext(DbContextOptions<KaffiContext> options) : base(options) { }

    public KaffiContext()
    {
    }

    public DbSet<Continent> Continent => Set<Continent>();
    public DbSet<Country> Country => Set<Country>();
    public DbSet<Flavour> Flavour => Set<Flavour>();
    public DbSet<Variety> Variety => Set<Variety>();
    public DbSet<Coffee_Flavour> Coffee_Flavours => Set<Coffee_Flavour>();
    public DbSet<Coffee> Coffee => Set<Coffee>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Coffee_Flavour>()
            .HasKey(cf => new { cf.CoffeeId, cf.FlavourId });
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(
            "Host=localhost;" +
            "Port=5432;" +
            "Database=kaffi;" +
            "Username=postgres;" +
            "Password=postgres;")
            .UseLowerCaseNamingConvention();
    }

}