// ProfitLoss.tsx

// Define the props that will be passed to the component
interface ProfitLossProps {
  totalOfTotals: number;
  winningAmount: number;
}

const ProfitLoss: React.FC<ProfitLossProps> = ({ totalOfTotals, winningAmount }) => {
  // Calculate profit or loss
  const profitLoss = winningAmount - totalOfTotals;

  return (
    <div className="profit-loss-footer">
      <strong>Winning Amount: {winningAmount.toFixed(2)}</strong>
      <strong>Total of Totals: {totalOfTotals.toFixed(2)}</strong>
      <strong>
        {profitLoss >= 0 ? 'Profit: ' : 'Loss: '} {Math.abs(profitLoss).toFixed(2)}
      </strong>
    </div>
  );
};

export default ProfitLoss;
