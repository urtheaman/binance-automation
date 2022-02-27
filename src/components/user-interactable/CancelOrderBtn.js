import React, { Fragment, useState } from 'react'
import CancelOrder from '../binance-rest-api/functions/CancelOrder'
import '../../styles/CancelOrderBtn.css'

const CancelOrderBtn = (props) => {
    const {pair, orderId} = props
    const [cancel, setCancel] = useState(false)

    const clickHandler = () => {
        setCancel(true)
    }
  return (
    <Fragment>
      <button className="cancel-order" onClick={clickHandler}>
        Cancel
      </button>
      {cancel ? <CancelOrder pair={pair} orderId={orderId} /> : null}
    </Fragment>
  );
}

export default CancelOrderBtn