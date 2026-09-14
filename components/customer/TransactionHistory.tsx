interface TransactionHistoryProps {
  transactions: {
    id: string;
    type: string;
    amount: number;
    description: string | null;
    createdAt: Date;
  }[];
}

export default function TransactionHistory({
  transactions,
}: TransactionHistoryProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-semibold">
          Recent Transactions
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-5">Date</th>
            <th className="text-left">Type</th>
            <th className="text-left">Description</th>
            <th className="text-right pr-5">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="text-center p-8 text-slate-500"
              >
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-t"
              >
                <td className="p-5">
                  {new Date(
                    transaction.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>{transaction.type}</td>

                <td>
                  {transaction.description || "-"}
                </td>

                <td className="text-right pr-5 font-semibold text-green-600">
                  +{transaction.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}