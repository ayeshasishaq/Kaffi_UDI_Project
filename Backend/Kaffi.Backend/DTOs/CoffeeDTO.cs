public class CoffeeDto
{
    public int Id { get; set; }
    public string CoffeeName { get; set; } = "";
    public string CountryName { get; set; } = "";
    public string ContinentName { get; set; } = "";
    public string Variety { get; set; } = "";
    public List<string> Flavours { get; set; } = new();
}