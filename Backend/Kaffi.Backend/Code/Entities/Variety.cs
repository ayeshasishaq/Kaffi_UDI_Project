using System.ComponentModel.DataAnnotations;

namespace Kaffi.Backend.Code.Entities;

public class Variety
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;

}