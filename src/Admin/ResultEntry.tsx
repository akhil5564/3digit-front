import { useState } from 'react';
import './resultentry.css';

interface TicketTableRow {
  ticket: string;
  result: string; // This will be the 3-digit result
}

const TicketTable: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('1pm'); // Default time is 1pm

  const generateRandomNumber = () => {
    return Math.floor(100 + Math.random() * 900).toString(); // Generate a 3-digit random number
  };

  const generateTopRows = () => {
    return Array.from({ length: 5 }, (_, rowIndex) => ({
      tickets: [
        { ticket: `${rowIndex + 1}`, result: generateRandomNumber() },
      ],
    }));
  };

  const generateMainRows = () => {
    return Array.from({ length: 10 }, (_, rowIndex) => ({
      tickets: Array.from({ length: 3 }, (_, colIndex) => {
        const ticketNumber = rowIndex * 3 + colIndex + 1;
        return { ticket: ticketNumber.toString(), result: generateRandomNumber() };
      }),
    }));
  };

  const [rows, setRows] = useState<{ tickets: TicketTableRow[] }[]>([
    ...generateTopRows(),
    ...generateMainRows(),
  ]);

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const updatedRows = [...rows];
    const row = updatedRows[rowIndex];
    const ticket = row.tickets[colIndex];

    if (value === '' || /^[0-9]{3}$/.test(value)) {
      ticket.result = value;
    }

    setRows(updatedRows);
  };

  const getRowClassName = (ticket: string) => {
    if (ticket.startsWith('Top')) {
      return 'top-ticket-row'; // For top 5 rows
    }
    return 'main-ticket-row'; // For the 10x3 grid rows
  };

  const isSaveButtonDisabled = () => {
    return rows.some((row) =>
      row.tickets.some((ticket) => ticket.result === '' || !/^[0-9]{3}$/.test(ticket.result))
    );
  };
  const handleSave = async () => {
    try {
      // Group results by date and time slot
      const resultsByDate = rows.reduce((acc, row) => {
        row.tickets.forEach((ticket) => {
          // Validate result is a 3-digit string
          if (ticket.result && /^[0-9]{3}$/.test(ticket.result)) {
            // Group by date
            if (!acc[selectedDate]) {
              acc[selectedDate] = []; // Create an array for the date if it doesn't exist
            }
  
            // Check if the selected time already exists for the given date
            let timeSlotExists = acc[selectedDate].some(entry => entry[selectedTime]);
  
            // If time slot doesn't exist for this date, create a new one
            if (!timeSlotExists) {
              acc[selectedDate].push({ [selectedTime]: [] });
            }
  
            // Find the existing entry for the selected time slot
            const timeSlotEntry = acc[selectedDate].find(entry => entry[selectedTime]);
  
            // Add the ticket result to the appropriate time slot and date
            timeSlotEntry[selectedTime].push({
              ticket: ticket.ticket,
              result: ticket.result
            });
          }
        });
        return acc;
      }, {});
  
      // Log the results being sent to the server for debugging
      console.log('Sending data:', resultsByDate);
  
      // Send data to the server wrapped in a "results" key
      const response = await fetch('http://localhost:5000/addResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ results: resultsByDate }), // Send as an object with dates as keys
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Data saved successfully:', responseData);
        alert('Data saved successfully!');
        setRows([...generateTopRows(), ...generateMainRows()]); // Reset rows after saving
      } else {
        const errorData = await response.json();
        console.error('Error from server:', errorData.message);
        alert(`Failed to save data: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };
  
  
  
  return (
    <div className="table-container">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {/* Render top 5 rows with 1 column */}
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

          {/* Render the remaining rows (10 rows with 3 columns) */}
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
                    placeholder="ABC"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Date and Time Selection */}
      <div className="date-time-selector">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          placeholder="Select Date"
        />
        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="1pm">1 PM</option>
          <option value="3pm">3 PM</option>
          <option value="6pm">6 PM</option>
          <option value="8pm">8 PM</option>
        </select>
      </div>

      {/* Save Button */}
      <div className="save-container">
        <button
          onClick={handleSave}
          disabled={isSaveButtonDisabled()} // Disable button if there are empty or invalid inputs
          className="save-button"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TicketTable;
