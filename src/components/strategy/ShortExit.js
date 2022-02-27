import React, { useCallback, useContext } from "react";
import ContextStore from "../../context-store/context-store";
import PlaceOrder from "../binance-rest-api/functions/PlaceOrder";

const ShortExit = (props) => {
  const { bestAsk } = props;
  const ctx = useContext(ContextStore);
  const resHandler = useCallback((response) => console.log(response), []);
  const quantity = +(ctx.qt / bestAsk).toFixed(ctx.symbol.qRound);

    if (bestAsk) {
      return (
        <PlaceOrder
          onApiResponse={resHandler}
          coin={ctx.symbol.pair}
          reduceOnly={true}
          side="SELL"
          quantity={quantity}
          price={bestAsk}
        />
      );
    }
  return null;
};

export default ShortExit;
