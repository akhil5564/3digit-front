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

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);

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
  const getPrize = (ticket: string, _count: number, _letter: string) => {
    // Adjust your logic based on the ticket, count, and letter
    switch (ticket) {
      case '1':
        return 5000;
      case '2':
        return 500;
      case '3':
        return 250;
      case '4':
        return 100;
      case '5':
        return 50;
      default:
        return 20; // For all other ticket numbers
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

  // Group results

  const group2 = filteredResults
    .filter((result) => !['1', '2', '3', '4', '5'].includes(result.ticket))
    .slice(0, 30);

  // If there are fewer than 30 results in group2, add more from the remaining results
  if (group2.length < 30) {
    const remainingResults = filteredResults
      .filter((result) => !group2.find((r) => r.ticket === result.ticket))
      .slice(0, 30 - group2.length);
    group2.push(...remainingResults);
  }

  // Filter winning results: These are results that have a match
  const winningResults = filteredResults.filter((result) => getMatchedData(result.result).length > 0);

  return (
    <div className="results-container">
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
    <h3>Winning Results</h3>
    <table className="results-table">
      <thead>
        <tr>
          <th>Ticket</th>
          <th>Count</th>
          <th>Prize</th> {/* New column for prize */}
        </tr>
      </thead>
      <tbody>
        {winningResults.map((result, index) => {
          const matchedData = getMatchedData(result.result);
          return (
            <tr key={index}>
              <td>{result.ticket}.{result.result}</td>
              {matchedData.length > 0 ? (
                <>
                  <td>{matchedData[0].count}</td>
                  {/* Calculate prize: matchedData[0].count * getPrize(result.ticket) */}
                  <td>{parseInt(matchedData[0].count, 10) * getPrize(result.ticket, parseInt(matchedData[0].count, 10), matchedData[0].letter)}</td>
                  </>
              ) : (
                <td colSpan={2}>No Winning</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
)}


      {/* Group 2: Remaining Results */}
    
    </div>
  );
};

export default ResultsComponent;



