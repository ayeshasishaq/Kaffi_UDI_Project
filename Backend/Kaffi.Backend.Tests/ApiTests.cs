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

    private async Task<JsonElement> HentKaffe(int id)
    {
        var json = await _client.GetStringAsync($"/{id}");
        return JsonDocument.Parse(json).RootElement;
    }

    [Test]
    public async Task GetCoffee_1_GirOk()
    {
        var response = await _client.GetAsync("/1");
        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
    }

    [TestCase(1, "Yirgacheffe")]
    [TestCase(2, "Cerrado")]
    [TestCase(3, "Sumatra")]
    [TestCase(4, "Huila")]
    [TestCase(5, "Gesha")]
    public async Task GetCoffee_HarRiktigNavn(int id, string forventetNavn)
    {
        var kaffe = await HentKaffe(id);
        Assert.That(kaffe.GetProperty("name").GetString(), Is.EqualTo(forventetNavn));
    }

    [Test]
    public async Task GetCoffee_1_KommerFraEtiopia()
    {
        var kaffe = await HentKaffe(1);
        Assert.That(kaffe.GetProperty("country").GetProperty("name").GetString(), Is.EqualTo("Etiopia"));
    }

    [Test]
    public async Task GetCoffee_1_HarTreSmaker()
    {
        var kaffe = await HentKaffe(1);
        Assert.That(kaffe.GetProperty("coffeeFlavours").GetArrayLength(), Is.EqualTo(3));
    }

    [Test]
    public async Task GetCoffee_SomIkkeFinnes_GirNoContent()
    {
        var response = await _client.GetAsync("/999");
        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.NoContent));
    }
}