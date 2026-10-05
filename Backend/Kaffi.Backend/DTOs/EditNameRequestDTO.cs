namespace Kaffi.Backend.DTOs;
using System.ComponentModel.DataAnnotations;

public class EditNameRequestDto
{
  [Required]
  [StringLength(100, MinimumLength = 1)]
  public string Name {get; set;} = "";
}