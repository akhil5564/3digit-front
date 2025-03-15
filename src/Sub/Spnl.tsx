import { useState, useEffect } from 'react';
import axios from 'axios';
import '../Main/result.css'; // Import the CSS file

interface Result {
  ticket: string;
  result: string;
  date: string;
  time: string;
}

interface TableRow {
  letter: string;
  num: string;
  count: string;
  amount: string;
}

interface Data {
  customId: number;
  selectedTime: string;
  tableRows: TableRow[];
}

const ResultsComponent: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]); // Store fetched results
  const [data, setData] = useState<Data[]>([]); // Store fetched table data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const [selectedDate, setSelectedDate] = useState<string>(''); // Date picker state
  const [selectedTime, setSelectedTime] = useState<string>(''); // Time picker state
  const [filteredResults, setFilteredResults] = useState<Result[]>([]); // Filtered results

  // Fetching results and table data from the server
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('https://manu-netflix.onrender.com/getresult');
        const sortedResults = response.data.sort((a: Result, b: Result) => {
          return parseInt(a.ticket, 10) - parseInt(b.ticket, 10);
        });
        setResults(sortedResults);
      } catch (err) {
        setError('Failed to fetch results');
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get('https://manu-netflix.onrender.com/getData');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch table data');
      }
    };

    fetchResults();
    fetchData();
  }, []);

  // Handle form submission to filter the results by selected date and time
  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      const filtered = results.filter(
        (result) => result.date === selectedDate && result.time === selectedTime
      );
      setFilteredResults(filtered);
    }
  };

  // Get matching data from tableRows based on result (3-digit number)
  const getMatchedData = (result: string) => {
    const match = data.flatMap((item) =>
      item.tableRows.filter((row) => row.num === result)
    );
    return match;
  };

  // Prize calculation based on ticket number
  const getPrize = (ticket: string, count: number) => {
    switch (ticket) {
      case '1':
        return 5000 * count;
      case '2':
        return 500 * count;
      case '3':
        return 250 * count;
      case '4':
        return 100 * count;
      case '5':
        return 50 * count;
      default:
        return 20 * count; // For all other ticket numbers
    }
  };

  // Commission calculation based on ticket type and count
  const getCommission = (ticket: string, count: number) => {
    switch (ticket) {
      case '1':
        return 400 * count; // First prize commission is 400 * count
      case '2':
        return 50 * count; // Second prize commission is 50 * count
      case '3':
        return 20 * count; // Third prize commission is 20 * count
      case '4':
        return 20 * count; // Fourth prize commission is 20 * count
      case '5':
        return 20 * count; // Fifth prize commission is 20 * count
      default:
        return 10 * count; // Commission for other tickets
    }
  };

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error if data fetching fails
  if (error) {
    return <div>{error}</div>;
  }

  // Filtered results that are winning results
  const winningResults = filteredResults.filter(
    (result) => getMatchedData(result.result).length > 0
  );

  // Calculate the total prize and commission
  const calculateTotalPrizeAndCommission = () => {
    let totalPrize = 0;
    let totalCommission = 0;

    winningResults.forEach((result) => {
      const matchedData = getMatchedData(result.result);
      if (matchedData.length > 0) {
        const count = parseInt(matchedData[0].count, 10);
        totalPrize += getPrize(result.ticket, count);
        totalCommission += getCommission(result.ticket, count);
      }
    });

    return { totalPrize, totalCommission };
  };

  const { totalPrize, totalCommission } = calculateTotalPrizeAndCommission();
  const totalOfTotals = totalPrize + totalCommission;

  return (
    <div className="results-container">
      {/* Date and Time Filter Section */}
      <div className="date-time-picker">
        <label>
          Select Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>

        <label>
          Select Time:
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Select Time</option>
            <option value="1pm">1 PM</option>
            <option value="3pm">3 PM</option>
            <option value="6pm">6 PM</option>
            <option value="8pm">8 PM</option>
          </select>
        </label>

        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Winning Results Table */}
      {winningResults.length > 0 && (
        <div className="winning-results">
          <table className="results-table">
            <thead>
              <tr>
\               
              </tr>
            </thead>
            <tbody>
              {winningResults.map((result, index) => {
                const matchedData = getMatchedData(result.result);
                return (
                  <tr key={index}>
                    {matchedData.length > 0 ? (
                      <>
                      </>
                    ) : (
                      <td colSpan={3}>No Winning</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer for Total Prize and Commission */}
      <div className="footer">
       
{/* Footer for Total Prize and Commission */}
<div className="footer">
  <div><strong>Total Prize: </strong>{totalPrize.toFixed(2)}</div>
  <div><strong>Total Commission: </strong>{totalCommission.toFixed(2)}</div>
  <div><strong>Total of Totals: </strong>{totalOfTotals.toFixed(2)}</div>
</div>
        </div>
      </div>
  );
};

export default ResultsComponent;
