import { useState, useContext } from "react";
import ContextStore from "../../context-store/context-store";

const AutoTradeBtn = () => {
  const [btnText, setBtnText] = useState("Start Making The Market");
  const ctx = useContext(ContextStore);

  const clickHandler = () => {
    ctx.allowedHandler(!ctx.allowed);
    ctx.allowed
      ? setBtnText("Stop Making The Market")
      : setBtnText("Start Making The Market");
  };
  //   console.log("AutoTradeBtn running");
  return (
    <div>
      <button onClick={clickHandler}>{btnText}</button>
    </div>
  );
};

export default AutoTradeBtn;
