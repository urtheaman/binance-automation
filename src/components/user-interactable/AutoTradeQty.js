import { useContext } from "react";
import ContextStore from "../../context-store/context-store";
import "../../styles/AutoTradeQty.css";

const AutoTradeQty = () => {
  const ctx = useContext(ContextStore);

  const qtySelectHandler = (e) => {
    ctx.qtHandler(+(+e.target.value * ctx.leverage).toFixed(ctx.symbol.qRound));
  };
  //   console.log('AutoTradeQty Running')

  return (
    <div className="qty-container">
      <input placeholder="$ Margin" type="number" min={5} onChange={qtySelectHandler} />
    </div>
  );
};

export default AutoTradeQty;
