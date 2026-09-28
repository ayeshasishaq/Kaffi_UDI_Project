using Kaffi.Backend.Code.Entities;

namespace Kaffi.Backend.Code.Interfaces;

public interface IKaffiDao
{
    int CreateCoffee(Coffee kaffi);
    Coffee? GetCoffee(int id);
}