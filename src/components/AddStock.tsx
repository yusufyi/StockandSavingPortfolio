import React, { useState } from "react";
import Stock from "./Stock";
import { TextField, Button, Grid, Typography, Paper } from "@mui/material"; // Import Material-UI components

interface AddStockProps {
  onAddStock: (stock: Stock) => void;
}

const AddStock: React.FC<AddStockProps> = ({ onAddStock }) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newStock: Stock = {
      name,
      symbol,
      price: parseFloat(price),
    };

    onAddStock(newStock);

    setName("");
    setSymbol("");
    setPrice("");
  };

  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      <Typography variant="h5" gutterBottom>
        Add a Stock
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock Symbol"
              variant="outlined"
              fullWidth
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Stock Price"
              variant="outlined"
              fullWidth
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Add Stock
        </Button>
      </form>
    </Paper>
  );
};

export default AddStock;
