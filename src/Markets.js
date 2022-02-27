import React from 'react'
import Chart from './components/Chart';
import MarketDepthSingle from './components/MarketDepthSingle';
import './styles/Markets.css'

const Markets = () => {
  return (
    <div id="market-data">
      <Chart />
      <MarketDepthSingle />
    </div>
  );
}

export default Markets