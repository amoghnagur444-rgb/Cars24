using Microsoft.AspNetCore.Mvc;
using Cars24API.Models;
using Cars24API.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cars24API.Data;

namespace Cars24API.Controllers
{
    [ApiController]
    [Route("api")] // Changed to "api" so that /summaries is accessible at the root level
    public class CarController : ControllerBase
    {
        private readonly CarService _carservice;

        public CarController(CarService carService)
        {
            _carservice = carService;
        }

        // Matches: GET http://localhost:5203/api/car/{id}
        [HttpGet("car/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var car = await _carservice.GetByIdAsync(id);
            if (car == null)
            {
                return NotFound();
            }
            return Ok(car);
        }

        // Matches: GET http://localhost:5203/api/summaries
        // This is the route your frontend is likely crashing on!
        [HttpGet("summaries")]
        public async Task<IActionResult> GetCarsummaries()
        {
            var cars = await _carservice.GetAllAsync();

            // Safety Check: Always return an empty list [] if the DB is empty
            if (cars == null)
            {
                return Ok(new List<object>());
            }

            var result = cars.Select(car => new
            {
                car.Id,
                car.Title,
                Year = car.Specs?.Year ?? 0,
                km = car.Specs?.Km ?? "0",
                Fuel = car.Specs?.Fuel ?? "N/A",
                Transmission = car.Specs?.Transmission ?? "N/A",
                Owner = car.Specs?.Owner ?? "N/A",
                car.Emi,
                car.Price,
                car.Location,
                image = car.Images ?? new List<string>()
            });

            return Ok(result);
        }

        [HttpGet("seed")]
        public async Task<IActionResult> Seed()
        {
            var car = new Car
            {
                Title = "2023 Maruti Swift VXI",
                Price = "₹7.80 lakh",
                Emi = "₹15,000/month",
                Location = "Delhi NCR",
                Images = new List<string>
                {
                "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
                },
                Specs = new Specs
                {
                    Year = 2023,
                    Km = "10048",
                    Fuel = "Petrol",
                    Transmission = "Automatic",
                    Owner = "1st Owner",
                    Insurance = "Valid till 2026"
                }
            };

            await _carservice.CreateAsync(car);

            return Ok("Car inserted");
        }

        [HttpGet("seedall")]
        public async Task<IActionResult> SeedAll()
        {
            var existingCars = await _carservice.GetAllAsync();

            foreach (var car in existingCars)
            {
                await _carservice.DeleteAsync(car.Id!);
            }

            await _carservice.CreateManyAsync(SeedCars.Cars);

            return Ok($"{SeedCars.Cars.Count} cars inserted successfully.");
        }

        // Matches: POST http://localhost:5203/api/car
        [HttpPost("car")]
        public async Task<IActionResult> Create([FromBody] Car car)
        {
            if (car == null)
            {
                return BadRequest("Car data is required");
            }
            await _carservice.CreateAsync(car);
            return CreatedAtAction(nameof(GetById), new { id = car.Id }, car);
        }
        
    }
}