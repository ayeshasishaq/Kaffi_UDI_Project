using Kaffi.Backend.Code.Entities;
using System.ComponentModel.DataAnnotations;

namespace Kaffi.Backend.DTOs
{
    public class CreateCoffeeRequestDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public int CountryId { get; set; }
        [Required]
        public int VarietyId { get; set; }
        [Required]
        public List<int> FlavourIds { get; set; } = new();
    }
}
