import React, { useState, useEffect } from "react";
import axios from "axios";

interface FetchStockPriceProps {
  symbol: string;
}

const FetchStockPrice: React.FC<FetchStockPriceProps> = ({ symbol }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.REACT_APP_API_KEY || "";

  const [fetchTime, setFetchTime] = useState<string | null>(null);

  async function fetchStockData() {
    const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?unadjusted=true&apiKey=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      console.log(data);

      if (data.status === "OK") {
        setPrice(data.results[0].o); // Get the opening price (or any other desired price)
        setFetchTime(new Date().toLocaleTimeString()); // Set the fetch time

        setError(null);
      } else {
        setError("Error from Polygon.io API");
        setPrice(null);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setError("Error fetching stock data.");
      setPrice(null);
    }
  }

  useEffect(() => {
    // Initial fetch when the component mounts
    fetchStockData();

    // Set up an interval to fetch stock prices every 2 minutes (120,000 milliseconds)
    const intervalId = setInterval(fetchStockData, 120000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [symbol, apiKey]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <p>
          Symbol: {symbol} - Price:{" "}
          {price !== null ? `$${price.toFixed(2)}` : "N/A"} - Last Updated:{" "}
          {fetchTime}
        </p>
      )}
    </div>
  );
};

export default FetchStockPrice;
