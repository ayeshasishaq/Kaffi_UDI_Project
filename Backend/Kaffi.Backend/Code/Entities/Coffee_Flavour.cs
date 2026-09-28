namespace Kaffi.Backend.Code.Entities;

public class Coffee_Flavour
{
    public int CoffeeId { get; set; }
    public Coffee Coffee { get; set; } = null!;
    public int FlavourId { get; set; }
    public Flavour Flavour { get; set; } = null!;
}