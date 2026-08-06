using Cars24API.Models;

namespace Cars24API.Data
{
    public static class SeedCars
    {
        public static List<Car> Cars => new List<Car>
        {
            new Car
            {
                Title = "2023 Maruti Swift VXI",
                Price = "₹7.80 lakh",
                Emi = "₹15,245/month",
                Location = "Delhi NCR",
                Images = new List<string>
                {
                    "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
                },
                Specs = new Specs
                {
                    Year = 2023,
                    Km = "10,048",
                    Fuel = "Petrol",
                    Transmission = "Manual",
                    Owner = "1st Owner",
                    Insurance = "Valid till 2026"
                },
                Features = new List<string>
                {
                    "Power Steering",
                    "Power Windows",
                    "Air Conditioning",
                    "ABS"
                },
                Highlights = new List<string>
                {
                    "Single Owner",
                    "Service History Available",
                    "Non Accidental"
                }
            },

            new Car
            {
                Title = "2022 Maruti Baleno Alpha",
                Price = "₹8.65 lakh",
                Emi = "₹16,820/month",
                Location = "Gurgaon",
                Images = new List<string>
                {
                    "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg"
                },
                Specs = new Specs
                {
                    Year = 2022,
                    Km = "18,530",
                    Fuel = "Petrol",
                    Transmission = "Automatic",
                    Owner = "1st Owner",
                    Insurance = "Valid till 2025"
                },
                Features = new List<string>
                {
                    "Push Button Start",
                    "Reverse Camera",
                    "Automatic Climate Control",
                    "Alloy Wheels"
                },
                Highlights = new List<string>
                {
                    "Excellent Condition",
                    "Company Maintained",
                    "Low Mileage"
                }
            },
            new Car
{
    Title = "2023 Maruti Fronx Delta Plus",
    Price = "₹9.45 lakh",
    Emi = "₹18,120/month",
    Location = "Noida",
    Images = new List<string>
    {
        "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg"
    },
    Specs = new Specs
    {
        Year = 2023,
        Km = "9,850",
        Fuel = "Petrol",
        Transmission = "Automatic",
        Owner = "1st Owner",
        Insurance = "Valid till 2027"
    },
    Features = new List<string>
    {
        "Cruise Control",
        "Touchscreen Infotainment",
        "Wireless Android Auto",
        "LED Headlamps"
    },
    Highlights = new List<string>
    {
        "Like New",
        "Single Owner",
        "No Accidental History"
    }
},

new Car
{
    Title = "2022 Hyundai i20 Asta",
    Price = "₹8.95 lakh",
    Emi = "₹17,250/month",
    Location = "Faridabad",
    Images = new List<string>
    {
        "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg"
    },
    Specs = new Specs
    {
        Year = 2022,
        Km = "21,450",
        Fuel = "Petrol",
        Transmission = "Manual",
        Owner = "2nd Owner",
        Insurance = "Valid till 2026"
    },
    Features = new List<string>
    {
        "Sunroof",
        "Apple CarPlay",
        "Rear Camera",
        "Automatic Climate Control"
    },
    Highlights = new List<string>
    {
        "Well Maintained",
        "Excellent Interior",
        "Recently Serviced"
    }
},
        };
    }
}