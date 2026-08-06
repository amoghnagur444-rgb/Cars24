using MongoDB.Driver;
using Cars24API.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Define your specific frontend CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            // Replaced single origin with multiple specific origins
            policy.WithOrigins(
                    "http://localhost:3000", 
                    "cars24-4xtzunxyl-amoghnagur444-rgbs-projects.vercel.app" 
                  ) 
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

string connectionstring = builder.Configuration.GetConnectionString("Cars24DB");

// Register Services
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<CarService>();
builder.Services.AddSingleton<BookingService>();
builder.Services.AddSingleton<AppointmentService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// 2. Apply CORS exactly ONCE right here
app.UseCors("AllowFrontend");

// Endpoints
app.MapGet("/", () => "Welcome to Cars24 API");

app.MapGet("/db-check", async () =>
{
    try
    {
        var client = new MongoClient(connectionstring);
        var dblist = await client.ListDatabaseNamesAsync();
        return Results.Ok("MongoDb connected successfully");
    }
    catch (Exception ex)
    {
        return Results.Problem($"Mongodb connection failed: {ex.Message}");
    }
});

app.MapControllers();

app.Run();