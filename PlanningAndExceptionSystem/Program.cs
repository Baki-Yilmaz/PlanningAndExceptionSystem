using Microsoft.EntityFrameworkCore;
using PlanningAndExceptionSystem;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Repositories.Repositories;
using PlanningAndExceptionSystem.Services.Interfaces;
using PlanningAndExceptionSystem.Services.Services;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUnitofWork, UnitofWork>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped(typeof(IService<>), typeof(Service<>));

builder.Services.AddScoped<IProductService , ProductService>();
builder.Services.AddScoped<IActualSalesService, ActualSalesService>();
builder.Services.AddScoped<IBrandService, BrandService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ISeasonService, SeasonService>();
builder.Services.AddScoped<IPlanningWeekService, PlanningWeekService>();
builder.Services.AddScoped<ICountryService, CountryService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IShopService, ShopService>();


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<UseCustomExceptionHandler>();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();