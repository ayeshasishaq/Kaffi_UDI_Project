using Kaffi.Backend.Code.Entities;
using Kaffi.Backend.DTOs;

namespace Kaffi.Backend.Code.Interfaces;

public interface IKaffiDao
{
    Task<Coffee> CreateCoffeeAsync(CreateCoffeeRequestDto request);

    Task<Coffee?> GetCoffeeByIdAsync(int id);

    Task<bool> DeleteCoffeeByIdAsync(int id);
    Task<List<ShowCoffeeResponse>> GetCoffeeBasedOnFlavourSelected(List<int> listOfFlavourIds);

}