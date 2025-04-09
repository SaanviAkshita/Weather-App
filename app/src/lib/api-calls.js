
export class InternalError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalError";
  }
};

export class UserError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalError";
  }
};

export async function GetWeather(searchParams) {
  const city = searchParams["city"] || undefined;

  if (!city) {
    throw new UserError("Expected a City name");
  }

  try {

    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    console.log(API_KEY);

    if (!API_KEY) {
      throw new InternalError("API key is missing")
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    )

    if (!response.ok) {
      const errorData = await JSON.parse(response.data);
      if (response.status === 404) {

      }
      throw new UserError(errorData.message || "Failed to fetch weather data")
    }

    const data = await response.json();

    const weatherData = {
      city: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      icon: data.weather[0].icon,
    }

    return weatherData
  } catch (error) {
    console.error("Weather API error:", error)
    throw new InternalError("Failed to fetch weather data");
  }
}
