import "../../../styles/MarketDepth.css";
import React, { useState, useEffect } from "react";
import BinanceStream from "../BinanceStream";
import ManualTradingPanel from "../../user-interactable/ManualTradingPanel";

function MarketDepth(props) {
  const {
    wsref,
    coin: { pair, pRound, qRound },
  } = props;
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [bestAsk, setBestAsk] = useState();
  const [bestBid, setBestBid] = useState();

  const wsRef = (ws) => wsref(ws);

  const depthData = (response) => {
    const cleanData = (data) => {
      const filtered = data.filter((d) => +(+d[1]) > 0);
      const result = filtered.map((d) => {
        return [+(+d[0]).toFixed(pRound), +(+d[1]).toFixed(qRound)];
      });
      return result;
    };

    setAsks(() => {
      return cleanData(response.a).slice(0, 12);
    });
    setBids(() => {
      return cleanData(response.b).reverse().slice(0, 12);
    });
  };

  // best ask and bid
  useEffect(() => {
    const firstBidPrice = bids?.[0]?.[0];
    const firstAskPrice = asks?.[0]?.[0];
    const difference = Math.abs(firstAskPrice - firstBidPrice);
    if (difference.toFixed(pRound) <= 1 / 10 ** pRound) {
      setBestAsk(firstAskPrice);
      setBestBid(firstBidPrice);
    } else {
      setBestAsk();
      setBestBid();
    }
  }, [bids, asks, pRound]);

  // bid lists
  const bidsList = bids?.map((bid, index) => {
    let price = bid[0];
    let quantity = bid[1];

    return (
      <div className="bidsDetails details" key={index}>
        <span className="quantity">{quantity.toFixed(qRound)}</span>
        <span className="price">{price.toFixed(pRound)}</span>
      </div>
    );
  });

  // ask lists
  const asksList = asks?.map((ask, index) => {
    let price = ask[0];
    let quantity = ask[1];

    return (
      <div className="asksDetails details" key={index}>
        <span className="price">{price.toFixed(pRound)}</span>
        <span className="quantity">{quantity.toFixed(qRound)}</span>
      </div>
    );
  });

  return (
    <div className="main-container">
      <BinanceStream
        wsref={wsRef}
        wsEndPoint={pair.toLowerCase() + "@depth"}
        resHandler={depthData}
      />
      <div className="market-depth-container">
        <div>
          <h3>{pair} order book</h3>
          <div className="spreadContainer">
            <div className="bidsContainer">{bidsList}</div>
            <div className="asksContainer">{asksList}</div>
          </div>
        </div>
        <div className="bestSpread">
          <span>{bestBid}</span>
          <span>{bestAsk}</span>
        </div>
      </div>
      <ManualTradingPanel bestAsk={bestAsk} bestBid={bestBid} />
    </div>
  );
}

export default MarketDepth;
