using DevExpress.Data.Helpers;
using DevExpress.Data.PLinq.Helpers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using PlanningAndExceptionSystem;
using PlanningAndExceptionSystem.Repositories.Interfaces;
using PlanningAndExceptionSystem.Repositories.Repositories;
using PlanningAndExceptionSystem.Services;
using PlanningAndExceptionSystem.Services.Interfaces;
using PlanningAndExceptionSystem.Services.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUnitofWork, UnitofWork>();
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped(typeof(IService<>), typeof(Service<>));

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IActualSalesService, ActualSalesService>();
builder.Services.AddScoped<IBrandService, BrandService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ISeasonService, SeasonService>();
builder.Services.AddScoped<IPlanningWeekService, PlanningWeekService>();
builder.Services.AddScoped<ICountryService, CountryService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IShopService, ShopService>();
builder.Services.AddScoped<IInventoryService, InventoryService>();
builder.Services.AddScoped<ISalesPlanService, SalesPlanService>();
builder.Services.AddScoped<IPlanningMonthService, PlanningMonthService>();
builder.Services.AddScoped<IPlanningExceptionService, PlanningExceptionService>();
builder.Services.AddScoped<IPlanningExceptionRepository, PlanningExceptionsRepository>();
builder.Services.AddScoped<IExceptionActionService, ExceptionActionService>();
builder.Services.AddScoped<IActionApprovalService, ActionApprovalService>();
builder.Services.AddScoped<IExceptionRuleService, ExceptionRuleService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddAuthentication("BasicAuthentication")
    .AddScheme<AuthenticationSchemeOptions, 
    PlanningAndExceptionSystem.Security.BasicAuthenticationHandler>("BasicAuthentication", null);
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

//app.UseMiddleware<UseCustomExceptionHandler>();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();