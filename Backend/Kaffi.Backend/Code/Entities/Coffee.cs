namespace Kaffi.Backend.Code.Entities;

public class Coffee
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public int CountryId { get; set; }
    public Country Country { get; set; } = null!;

    public int VarietyId { get; set; }
    public Variety Variety { get; set; } = null!;

    public ICollection<CoffeeFlavour> CoffeeFlavours { get; set; }
        = new List<CoffeeFlavour>();
}