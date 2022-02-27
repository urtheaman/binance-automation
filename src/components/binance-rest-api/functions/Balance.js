import BinanceRestApi from "../BinanceRestApi";
import EndPoints from "../FuturesEndPoints.json";
import { useState } from "react";

const Balance = (props) => {
  const [totalBalance, setTotalBalance] = useState();
  const config = {
    endPoint: EndPoints.balance.endPoint,
    method: EndPoints.balance.method,
    details: {
      timestamp: new Date().getTime(),
    },
  };

  const resHandler = (response) => {
    const i = response.filter((res) => res.asset === "BUSD")[0];
    const amount = +(+i.availableBalance).toFixed(2);
    setTotalBalance(amount);
  };

  return (
    <div>
      <BinanceRestApi config={config} resHandler={resHandler} />
      Available Balance: ${totalBalance}
    </div>
  );
};

export default Balance;
