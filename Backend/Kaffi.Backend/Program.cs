using Kaffi.Backend.Code.Interfaces;
using Kaffi.Backend.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Kaffi.Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<KaffiContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("KaffiDb"),
                    sql => sql.EnableRetryOnFailure()));

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<IKaffiDao, KaffiPgSql>();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}