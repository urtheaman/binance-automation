import BinanceStream from "../BinanceStream";
import { useState } from "react";
import "../../../styles/BookTicker.css";

const BookTicker = (props) => {
  const {
    wsref,
    children,
    coin: { pair },
  } = props;
  const [ticker, setTicker] = useState([]);

  const wsRef = (ws) => wsref(ws);
  const resHandler = (response) => {
    setTicker(() => {
      return [response.b, response.B, response.a, response.A];
    });
  };

  return (
    <div className="ticker-container">
      <h3>Best Bid & Ask</h3>
      <BinanceStream
        wsEndPoint={pair.toLowerCase() + "@bookTicker"}
        resHandler={resHandler}
        wsref={wsRef}
      />
      <div className="ticker">
        <div className="ticker-bid">
          <span>{ticker[0]}</span>
          <span>Bid qty: {ticker[1]}</span>
        </div>
        <div className="ticker-ask">
          <span>{ticker[2]}</span>
          <span>Ask qty: {ticker[3]}</span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default BookTicker;
