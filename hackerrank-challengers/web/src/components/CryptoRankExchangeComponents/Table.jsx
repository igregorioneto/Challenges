const cryptocurrencyList = [
    {
      code: "BNB",
      name: "BNB",
      rate: 0.00311839,
    },
    {
      code: "BTC",
      name: "Bitcoin",
      rate: 0.00004066,
    },
    {
      code: "DOGE",
      name: "Dogecoin",
      rate: 11.18558722,
    },
    {
      code: "ETH",
      name: "Ethereum",
      rate: 0.00059237,
    },
    {
      code: "XRP",
      name: "XRP",
      rate: 2.50682634,
    },
];

const Table = ({amountInput, errors = []}) => {
    return (
        <div className="bg-white shadow-md rounded-md mt-10 mx-4 p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left px-4 py-2">Cryptocurrency</th>
                <th className="text-left px-4 py-2">Exchange Rate</th>
                <th className="text-left px-4 py-2">Number of Coins</th>
              </tr>
            </thead>
            <tbody data-testid="exchange-data">
              {cryptocurrencyList.length > 0 ? cryptocurrencyList.map((crypto, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{crypto.name}</td>
                  <td className="px-4 py-2">1 USD = {crypto.rate} {crypto.code}</td>
                  {errors.length === 0 ? (
                    <td className="px-4 py-2">{!amountInput ? '0.00000000' : (crypto.rate * amountInput).toFixed(8)}</td>
                  ) : (
                    <td className="px-4 py-2 text-gray-500">n/a</td>
                  )}
                </tr>
              )) : null}
            </tbody>
          </table>
        </div>
    );
}

export default Table;