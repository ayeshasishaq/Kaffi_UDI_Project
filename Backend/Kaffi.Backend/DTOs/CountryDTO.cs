namespace Kaffi.Backend.DTOs;
using System.ComponentModel.DataAnnotations;

public class CountryDTO
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;

    public int ContinentId { get; set;}

    public string Continent { get; set; } = string.Empty;
}   