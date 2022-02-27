import React, { Fragment, useState } from "react";
import PlaceOrder from "../binance-rest-api/functions/PlaceOrder";

const CustomExitBtn = (props) => {
  const { pair } = props;
  const [exit, setExit] = useState(false);

  const clickHandler = () => {
    setExit(true);
    setTimeout(() => setExit(false), 2000)
  };
  return (
    <Fragment>
      <button className="cancel-order" onClick={clickHandler}>
        BreakEven
      </button>
      {exit ? <PlaceOrder coin={pair} /> : null}
    </Fragment>
  );
};

export default CustomExitBtn;
