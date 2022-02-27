// {
//   allowed && !buyActive ? (
//     <LongEntry
//       buyActive={buyActive}
//       bestBid={bestBid}
//       coin={symbol.pair}
//       qt={qty}
//     />
//   ) : null;
// }
// {
//   allowed && !sellActive ? (
//     <ShortEntry
//       sellActive={sellActive}
//       bestAsk={bestAsk}
//       coin={symbol.pair}
//       qt={qty}
//     />
//   ) : null;
// }
// {
//   allowed && buyActive === "FILLED" && sellActive === "FILLED" ? (
//     <Fragment>
//       <LongExit
//         buyActive={buyActive}
//         bestBid={bestBid}
//         coin={symbol.pair}
//         qt={qty}
//       />
//       <ShortExit
//         sellActive={sellActive}
//         bestAsk={bestAsk}
//         coin={symbol.pair}
//         qt={qty}
//       />
//     </Fragment>
//   ) : null;
// }
