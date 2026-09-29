using Kaffi.Backend.Code.Entities;

namespace Kaffi.Backend.Code.Interfaces;

public interface IKaffiDao
{
    Task<int> CreateCoffeeAsync(Coffee kaffi);
    Task<Coffee?> GetCoffeeAsync(int id);
}