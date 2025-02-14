import React, { useState } from 'react';

interface TicketTableRow {
  ticket: string;
  result: string; // This will be the 3-digit result
}

const TicketTable: React.FC = () => {
  const initialRows: TicketTableRow[] = [
    { ticket: '1', result: '' },
    { ticket: '2', result: '' },
    { ticket: '3', result: '' },
    { ticket: '4', result: '' },
    { ticket: '5', result: '' },
  ];

  // Create rows for tickets 6 to 35 in a 3-column format (10 rows)
  const secondaryRows = Array.from({ length: 10 }, (_, rowIndex) => {
    return {
      tickets: Array.from({ length: 3 }, (_, colIndex) => {
        const ticketNumber = rowIndex * 3 + colIndex + 6;
        return { ticket: ticketNumber.toString(), result: '' };
      }),
    };
  });

  const [rows, setRows] = useState<{ tickets: TicketTableRow[] }[]>([
    ...initialRows.map((row) => ({ tickets: [row] })),
    ...secondaryRows,
  ]);

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const updatedRows = [...rows];
    const row = updatedRows[rowIndex];
    const ticket = row.tickets[colIndex];

    // Only update if the value is a valid 3-digit number or an empty string
    if (value === '' || /^[0-9]{3}$/.test(value)) {
      ticket.result = value;
    }

    setRows(updatedRows);
  };

  const getRowClassName = (ticket: string) => {
    if (['1', '2', '3', '4', '5'].includes(ticket)) {
      return 'main-ticket-row';
    }
    return 'secondary-ticket-row'; // For tickets 6-35
  };

  return (
    <div className="table-container">
      <table className="ticket-table">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          {/* Render main tickets */}
          {rows.slice(0, 5).map((row, rowIndex) => (
            <tr key={rowIndex} className={getRowClassName(row.tickets[0].ticket)}>
              <td>{row.tickets[0].ticket}</td>
              <td>
                <input
                  className="result-input"
                  type="text"
                  maxLength={3}
                  value={row.tickets[0].result}
                  onChange={(e) => handleInputChange(rowIndex, 0, e.target.value)}
                  placeholder="ABC"
                />
              </td>
            </tr>
          ))}
          
          {/* Render secondary tickets (6 to 35) in grid format (3 columns, 10 rows) without showing the ticket number */}
          {rows.slice(5).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.tickets.map((ticket, colIndex) => (
                <td key={colIndex} className={getRowClassName(ticket.ticket)}>
                  <input
                    className="result-input"
                    type="text"
                    maxLength={3}
                    value={ticket.result}
                    onChange={(e) => handleInputChange(rowIndex + 5, colIndex, e.target.value)}
                    placeholder="Abc"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
