import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Container, Box } from "@mui/material";
import theme from "./theme";
import StockList from "./components/StockList"; // Import your StockList component
import exampleStocks from "./components/exampleData"; // Import example stock data
import AddStock from "./components/AddStock";
import Stock from "./components/Stock";
import FetchStockPrice from "./components/FetchStockPrice";

function App() {
  const storedStocks = localStorage.getItem("exampleStocks");
  const initialStocks: Stock[] = storedStocks
    ? JSON.parse(storedStocks)
    : exampleStocks;

  const [stock, setStock] = useState(initialStocks);

  const handleAddStock = (newStock: {
    name: string;
    symbol: string;
    price: number;
  }) => {
    const updatedStocks = [...stock, newStock];
    setStock(updatedStocks);
    localStorage.setItem("exampleStocks", JSON.stringify(updatedStocks));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <h1>Portfolio App</h1>
        <Box marginBottom={3}>
          {/* Add spacing between AddStock and StockList */}
          <AddStock onAddStock={handleAddStock} />
        </Box>
        <StockList stocks={stock} />
        <FetchStockPrice symbol="AAPL" />
        <FetchStockPrice symbol="GOOGL" />
      </Container>
    </ThemeProvider>
  );
}

export default App;
