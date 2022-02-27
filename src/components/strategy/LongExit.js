import React, { useCallback, useContext } from "react";
import ContextStore from "../../context-store/context-store";
import PlaceOrder from "../binance-rest-api/functions/PlaceOrder";

const LongExit = (props) => {
  const { bestBid } = props;
  const ctx = useContext(ContextStore);
  const resHandler = useCallback((response) => console.log(response), []);
  const quantity = +(ctx.qt / bestBid).toFixed(ctx.symbol.qRound);

    if (bestBid) {
      return (
        <PlaceOrder
          onApiResponse={resHandler}
          coin={ctx.symbol.pair}
          reduceOnly={true}
          side="BUY"
          quantity={quantity}
          price={bestBid}
        />
      );
    }
  return null;
};

export default LongExit;
