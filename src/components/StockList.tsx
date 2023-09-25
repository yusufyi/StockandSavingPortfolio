import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  makeStyles,
} from "@mui/material";

import { StockPrice } from "./StockPrice";

interface Stock {
  name: string;
  symbol: string;
  price: number;
}

interface StockListProps {
  stocks: Stock[];
}

const StockList: React.FC<StockListProps> = ({ stocks }) => {
  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      <Typography variant="h5" gutterBottom>
        Stock List
      </Typography>
      <List>
        {stocks.map((stock, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText
                primary={stock.name}
                secondary={`Symbol: ${stock.symbol} 
              
                `}
              />
              <StockPrice symbol={stock.symbol} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Paper>
  );
};

export default StockList;
