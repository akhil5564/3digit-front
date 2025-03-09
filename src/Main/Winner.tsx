import  { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';

// Define the Winner interface with explicit types
interface Winner {
  ticket: string;
  count: number;
  prize: number;
}

interface WinnerProps {
  winners: Winner[];
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
          {winners.map((winner: { ticket: boolean | Key | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; count: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; prize: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
            <tr key={winner.ticket} className="table-row">
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
