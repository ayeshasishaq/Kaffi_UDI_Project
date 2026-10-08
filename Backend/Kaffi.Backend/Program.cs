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

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("MultipleOriginPolicy",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:53789", "https://ca-kaffi-frontend.gentlegrass-7048958f.norwayeast.azurecontainerapps.io")
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials();
                        
                    });
            });

            builder.Services.AddControllers()
            .AddJsonOptions(o =>
                o.JsonSerializerOptions.ReferenceHandler =
                    System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);

            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<KaffiContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("KaffiDb"),
                    sql => sql.EnableRetryOnFailure()));

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<IKaffiDao, KaffiService>();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting();

            app.UseCors("MultipleOriginPolicy");

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}