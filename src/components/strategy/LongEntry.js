import React, { useCallback, useContext } from "react";
import PlaceOrder from "../binance-rest-api/functions/PlaceOrder";
import ContextStore from "../../context-store/context-store";

const LongEntry = (props) => {
  const { bestBid } = props;
  const ctx = useContext(ContextStore);
  const resHandler = useCallback((response) => console.log(response), []);
  const quantity = +(ctx.qt / bestBid).toFixed(ctx.symbol.qRound);

    if (bestBid) {
      return (
        <PlaceOrder
          onApiResponse={resHandler}
          coin={ctx.symbol.pair}
          quantity={quantity}
          side="BUY"
          price={bestBid}
        />
      );
    }
  return null;
};

export default LongEntry;
