import React, { useState } from "react";

const ContextStore = React.createContext({
  symbol: "",
  qt: 0,
  currentTrades: [],
  leverage: +localStorage.getItem("leverage"),
  currentOrders: [],
  allowed: false,
  goLong: false,
  goShort: false,
  exitLong: false,
  exitShort: false,
  goLongHandler: () => {},
  goShortHandler: () => {},
  exitLongHandler: () => {},
  exitShortHandler: () => {},
  symbolHandler: () => {}, // MarketDataSingle
  allowedHandler: () => {}, // AutoTradeBtn
  qtHandler: () => {}, // AutoTradeQty
  currentTradesHandler: () => {}, // GetCurrentPositions
  currentOrdersHandler: () => {}, // GetAllOpenOrders
  leverageHandler: () => {}, // Leverage
});

export const ContextProvider = (props) => {
  const [symbol, setSymbol] = useState(false);
  const [qt, setQt] = useState(0);
  const [allowed, setAllowed] = useState(false);
  const [currentTrades, setCurrentTrades] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [leverage, setLeverage] = useState(
    +localStorage.getItem("leverage") || 1
  );
  const [goShort, setGoShort] = useState(false);
  const [goLong, setGoLong] = useState(false);
  const [exitLong, setExitLong] = useState(false);
  const [exitShort, setExitShort] = useState(false);

  const symbolHandler = (value) => setSymbol(value);
  const allowedHandler = (value) => setAllowed(value);
  const qtHandler = (value) => setQt(value);
  const currentTradesHandler = (arr) => setCurrentTrades(arr);
  const currentOrdersHandler = (arr) => setCurrentOrders(arr);
  const leverageHandler = (value) => setLeverage(value);
  const goShortHandler = (value) => setGoShort(value);
  const goLongHandler = (value) => setGoLong(value);
  const exitLongHandler = (value) => setExitLong(value);
  const exitShortHandler = (value) => setExitShort(value);

  const contextConfig = {
    qt: qt,
    currentTrades: currentTrades,
    allowed: allowed,
    symbol: symbol,
    currentOrders: currentOrders,
    leverage: leverage,
    goShort: goShort,
    goLong: goLong,
    exitLong: exitLong,
    exitShort: exitShort,
    qtHandler: qtHandler,
    goShortHandler: goShortHandler,
    goLongHandler: goLongHandler,
    exitLongHandler: exitLongHandler,
    exitShortHandler: exitShortHandler,
    currentTradesHandler: currentTradesHandler,
    leverageHandler: leverageHandler,
    symbolHandler: symbolHandler,
    allowedHandler: allowedHandler,
    currentOrdersHandler: currentOrdersHandler,
  };

  return (
    <ContextStore.Provider value={contextConfig}>
      {props.children}
    </ContextStore.Provider>
  );
};

export default ContextStore;
