using System.Net;
using System.Text.Json;

namespace Kaffi.Backend.Tests;

public class ApiTests
{

    private HttpClient _client = null!;

    [SetUp]
    public void SetUp()
    {
        _client = new HttpClient { BaseAddress = new Uri("http://localhost:5054") };
    }

    [TearDown]
    public void TearDown()
    {
        _client.Dispose();
    }

    private async Task<JsonElement> GetCoffee(int id)
    {
        var json = await _client.GetStringAsync($"/api/kaffi/{id}");
        return JsonDocument.Parse(json).RootElement;
    }

    [TestCase(2)]
    public async Task GetCoffeeReturnsOk(int id)
    {
        var response = await _client.GetAsync($"/api/kaffi/{id}");
        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
    }

    [Test]
    public async Task GetCoffeeThatDoesNotExist_ShouldReturnNoContent()
    {
        var response = await _client.GetAsync("/api/kaffi/999");
        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.NotFound));
    }

    [TestCase(2, "Cerrado")]
    [TestCase(3, "Sumatra")]
    [TestCase(4, "Huila")]
    [TestCase(5, "Gesha")]
    public async Task GetCoffee_HasCorrectName_ShouldReturnIsEqualTo(int id, string expectedName)
    {
        var coffee = await GetCoffee(id);
        Assert.That(coffee.GetProperty("name").GetString(), Is.EqualTo(expectedName));
        Console.WriteLine(coffee);
    }

    [TestCase(6, "Etiopia")]
    public async Task GetCoffee_ShouldComeFromEtiopia(int id, string expectedName)
    {
        var coffee = await GetCoffee(id);
        Assert.That(coffee.GetProperty("country").GetProperty("name").GetString(), Is.EqualTo(expectedName));
    }

    [TestCase(2)]
    public async Task GetCoffee_ShouldContainThreeItems(int id)
    {
        var coffee = await GetCoffee(id);
        Assert.That(coffee.GetProperty("coffeeFlavours").GetArrayLength(), Is.EqualTo(3));
    }
}