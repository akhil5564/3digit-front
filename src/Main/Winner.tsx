import React from 'react';

// Define the Winner component that receives winners data as props
interface WinnerProps {
  winners: {
    ticket: string;
    count: number;
    prize: number;
  }[];
}

const Winner: React.FC<WinnerProps> = ({ winners }) => {
  // If winners array is empty, return a message
  if (winners.length === 0) {
    return <p>No winners found.</p>;
  }

  return (
    <div className="winner-container">
      <h3>Winning Numbers</h3>
      <table className="winning-numbers">
        <thead>
          <tr>
            <th className="table-header">Ticket Number</th>
            <th className="table-header">Count</th>
            <th className="table-header">Prize</th>
          </tr>
        </thead>
        <tbody>
          {winners.map((winner, index) => (
            <tr key={index} className="table-row">
              <td>{winner.ticket}</td>
              <td>{winner.count}</td>
              <td>{winner.prize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Winner;
