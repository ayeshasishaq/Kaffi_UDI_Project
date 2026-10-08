using System.Runtime.CompilerServices;
using Kaffi.Backend.Code.Entities;
using Kaffi.Backend.Data.Context;
using Kaffi.Backend.DTOs;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;

namespace Kaffi.Backend.Tests;

public class KaffiServiceTests
{
    private const int Chocolate = 1, Citrus = 2, Berry = 3, Nutty = 4, Floral = 5;
    private const int Spicy = 6, Smoky = 7, Woody = 8;
    private SqliteConnection _connection = null!;
    private DbContextOptions<KaffiContext> _options = null!;
    private KaffiContext _context = null!;
    private KaffiService _service = null!;

    [SetUp]
    public void SetUp()
    {
        _connection = new SqliteConnection("DataSource=:memory:");
        _connection.Open();

        _options = new DbContextOptionsBuilder<KaffiContext>()
            .UseSqlite(_connection)
            .Options;

        _context = new KaffiContext(_options);
        _context.Database.EnsureCreated();
        Seed(_context);

        _service = new KaffiService(_context, NullLogger<KaffiService>.Instance);
    }

    [TearDown]
    public void TearDown()
    {
        _context.Dispose();
        _connection.Dispose();
    }

    private static void Seed(KaffiContext coffeeContext)
    {
        var africa = new Continent { Id = 1, Name = "Africa" };
        var southAmerica = new Continent { Id = 2, Name = "South America" };
        coffeeContext.AddRange(africa, southAmerica);

        var ethiopia = new Country { Id = 1, Name = "Ethiopia", Continent = africa };
        var colombia = new Country { Id = 2, Name = "Colombia", Continent = southAmerica };
        coffeeContext.AddRange(ethiopia, colombia);

        var bourbon = new Variety { Id = 1, Name = "Bourbon" };
        var geisha = new Variety { Id = 2, Name = "Geisha" };
        coffeeContext.AddRange(bourbon, geisha);

        var flavours = new[]
        {
            new Flavour { Id = Chocolate, Name = "Chocolate" },
            new Flavour { Id = Citrus, Name = "Citrus" },
            new Flavour { Id = Berry, Name = "Berry" },
            new Flavour { Id = Nutty, Name = "Nutty" },
            new Flavour { Id = Floral, Name = "Floral" },
            new Flavour { Id = Spicy, Name = "Spicy" },
            new Flavour { Id = Smoky, Name = "Smoky" },
            new Flavour { Id = Woody, Name = "Woody" },
        };
        coffeeContext.AddRange(flavours);

        AddCoffee(coffeeContext, 1, "Yirgacheffe", ethiopia, geisha, flavours[1], flavours[2], flavours[4]);
        AddCoffee(coffeeContext, 2, "Huila", colombia, bourbon, flavours[0], flavours[3], flavours[1]);
        AddCoffee(coffeeContext, 3, "Plain", colombia, bourbon, flavours[0]);

        coffeeContext.SaveChanges();
        coffeeContext.ChangeTracker.Clear();
    }

    private static void AddCoffee(KaffiContext coffeeContext, int id, string name, Country country,
        Variety variety, params Flavour[] flavours)
    {
        var coffee = new Coffee { Id = id, Name = name, Country = country, Variety = variety };
        foreach (var f in flavours)
            coffee.CoffeeFlavours.Add(new CoffeeFlavour { Flavour = f });
        coffeeContext.Add(coffee);
    }

    [TestCase(1)]
    public async Task GetCoffeeById_ValuesShouldBeEqualToCoffeeIdProps(int id)
    {
        var coffee = await _service.GetCoffeeByIdAsync(id);

        Assert.That(coffee, Is.Not.Null);

        using (Assert.EnterMultipleScope())
        {
            Assert.That(coffee.Name, Is.EqualTo("Yirgacheffe"));
            Assert.That(coffee.Country.Name, Is.EqualTo("Ethiopia"));
            Assert.That(coffee.Variety.Name, Is.EqualTo("Geisha"));
        }
    }

    [TestCase(1)]
    public async Task DeleteCoffee_ReturnsTrueIfDeletedThenFalseIfNotFound(int id)
    {
        var coffee = await _service.DeleteCoffeeByIdAsync(id);

        await using var verify = new KaffiContext(_options);

        using (Assert.EnterMultipleScope())
        {
            Assert.That(coffee, Is.True);
            Assert.That(await verify.Coffee.AnyAsync(c => c.Id == id), Is.False);
        }
    }

    [TestCase("Cerrado", 2, 2, new[] { 2, 3, 4 })]

    public async Task CreateCoffee_ShouldReturnCoffeeObject(string name, int countryId, int varietyId, int[] flavourIds)
    {
        List<int> convertedFlavourIdList = flavourIds.ToList();

        CreateCoffeeRequestDto dto = new CreateCoffeeRequestDto
        {
            Name = name,
            CountryId = countryId,
            VarietyId = varietyId,
            FlavourIds = convertedFlavourIdList
        };

        var coffee = await _service.CreateCoffeeAsync(dto);
        await _context.SaveChangesAsync();

        await using var verify = new KaffiContext(_options);

        using (Assert.EnterMultipleScope())
        {
            Assert.That(coffee.Name, Is.EqualTo(dto.Name));
            Assert.That(coffee.CountryId, Is.EqualTo(dto.CountryId));
            Assert.That(coffee.VarietyId, Is.EqualTo(dto.VarietyId));
            Assert.That(coffee.Id, Is.GreaterThan(0));
        }
    }

    [TestCase("Guji")]
    public async Task EditCoffee_ShouldChangeName(string newName)
    {
        var coffeeResult = await _service.EditCoffeeNameByIdAsync(1, newName);
        var updatedCoffee = await _service.GetCoffeeByIdAsync(1);

        using (Assert.EnterMultipleScope())
        {
            Assert.That(coffeeResult, Is.True);
            Assert.That(updatedCoffee, Is.Not.Null);
            Assert.That(updatedCoffee?.Name, Is.EqualTo(newName));
        }
    }
}
