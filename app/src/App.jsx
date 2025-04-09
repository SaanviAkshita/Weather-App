import { Button, CardBody, CardRoot, ChakraProvider, Input } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";
import { Search } from "lucide-react";
import React, { useState } from "react";
import WeatherDisplay from "./Component/weather-display";
import { GetWeather, UserError } from "./lib/api-calls";

export default function App() {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
    const theme = {
    // ... your system-ui theme
    config: {
      useSystemColorMode: false, // or true
      initialColorMode: "light", // or "dark"
      cssVarPrefix: "chakra", // any string
    }
  }


  const fetchWeather = async (e) => {
    e.preventDefault()

    if (!city.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await GetWeather({
        city
      });
      const data = await response;

      setWeatherData(data)
    } catch (err) {
      console.log(err);
      setError(err instanceof UserError ? err.message : "Please Enter a Valid City");
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ChakraProvider value={system}>
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-br from-sky-400 to-indigo-900">
      <CardRoot p={6} boxShadow="xl" borderRadius="lg" bg="whiteAlpha.100">
        <CardBody>
        <form onSubmit={fetchWeather}>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            color="white"
            mb={4}
          />
          <Button
            type="submit"
            colorScheme="teal"
            leftIcon={<Search />}
            w="full"
            mb={4}
          >
            Search
          </Button>
        </form>

        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {weatherData && !loading && !error && <WeatherDisplay weather={weatherData} />}
    </CardBody>
  </CardRoot>

    </div>
</ChakraProvider>
  )
}
