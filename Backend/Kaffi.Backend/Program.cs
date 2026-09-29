using Kaffi.Backend.Data.Context;
using Kaffi.Backend.Code.Interfaces;
using Kaffi.Backend.Data.Context;

namespace Kaffi.Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // IKaffiDao kaffiDao = new KaffiPgSql();

            // kaffiDao.CreateCoffee(new Code.Entities.Coffee
            // {
            //     Name = "Coffee",
            //     Variety = new Code.Entities.Variety { Name = "Arabica" },
            //     Country = new Code.Entities.Country
            //     {
            //         Name = "Ethiopia",
            //         Continent = new Code.Entities.Continent { Name = "Africa" }
            //     },
            //     CoffeeFlavours = new List<Code.Entities.Coffee_Flavour>
            //     {
            //         new Code.Entities.Coffee_Flavour
            //         {
            //             Flavour = new Code.Entities.Flavour { Name = "Fruity" }
            //         },
            //         new Code.Entities.Coffee_Flavour
            //         {
            //             Flavour = new Code.Entities.Flavour { Name = "Nutty" }
            //         }
            //     }
            // });


            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<KaffiContext>();
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
