namespace Kaffi.Backend.DTOs
{
    public class ShowCoffeeResponse
    {
        public string CoffeeName { get; set; } = string.Empty;
        public string CountryName { get; set; } = string.Empty;
        public string ContinentName { get; set; } = string.Empty;
        public string Variety { get; set; } = string.Empty;
        public List<string> Flavours { get; set; } = new();
        public int MatchCount { get; set; }
    }
}
