import React, { useEffect, useState } from "react";

interface StockPriceProps {
  symbol: string;
}

export const StockPrice: React.FC<StockPriceProps> = ({ symbol }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStockPrice() {
      const apiKey = "2FZD6UKZM4Z4DIH1";
      const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data["Error Message"]) {
          setError(data["Error Message"]);
        } else {
          const lastestData = data["Time Series (1min)"];
          const latestTimestamp = Object.keys(lastestData)[0];
          console.log(latestTimestamp);
          const lastestPrice = parseFloat(
            lastestData[latestTimestamp]["1. open"]
          );
          setPrice(lastestPrice);
          console.log(price);
        }

        console.log(apiUrl);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setError("Error fetching stock data.");
      }
    }

    fetchStockPrice();
  }, [symbol]);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : price !== null ? (
        <p>
          The latest price for {symbol} is ${price.toFixed(2)}
        </p>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};
