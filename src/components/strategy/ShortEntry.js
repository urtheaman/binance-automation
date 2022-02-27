import React, { useContext } from "react";
import PlaceOrder from "../binance-rest-api/functions/PlaceOrder";
import { useCallback } from "react";
import ContextStore from "../../context-store/context-store";

const ShortEntry = (props) => {
  const { bestAsk } = props;
  const ctx = useContext(ContextStore);
  const resHandler = useCallback((response) => console.log(response), []);
  const quantity = +(ctx.qt / bestAsk).toFixed(ctx.symbol.qRound);

    if (bestAsk) {
      return (
        <PlaceOrder
          onApiResponse={resHandler}
          coin={ctx.symbol.pair}
          quantity={quantity}
          side="SELL"
          price={bestAsk}
        />
      );
    }
  return null;
};

export default ShortEntry;
