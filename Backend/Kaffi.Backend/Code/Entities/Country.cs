using System.ComponentModel.DataAnnotations;

namespace Kaffi.Backend.Code.Entities;

public class Country
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;
 

    public int ContinentId { get; set; }
    public Continent Continent { get; set; } = null!;

}