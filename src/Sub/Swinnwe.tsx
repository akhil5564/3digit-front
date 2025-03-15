import { useState, useEffect } from 'react';
import axios from 'axios';
import '../Main/result.css';

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
  username: string;  // Added this to match against logged-in user
  customId: number;
  selectedTime: string;
  tableRows: TableRow[];
}

const ResultsComponent: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);

  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user);

    const fetchResults = async () => {
      try {
        const response = await axios.get('https://manu-netflix.onrender.com/getresult');
        setResults(response.data);
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

  // **Filter data based on logged-in user**
  const userData = data.filter((entry) => entry.username === loggedInUser);

  // Get AB matches (First 2 digits)
  const getABMatches = (result: string) => {
    return userData.flatMap((item) =>
      item.tableRows.filter((row) => row.letter === 'AB' && row.num === result.slice(0, 2))
    );
  };

  // Get BC matches (Last 2 digits)
  const getBCMatches = (result: string) => {
    return userData.flatMap((item) =>
      item.tableRows.filter((row) => row.letter === 'BC' && row.num === result.slice(1, 3))
    );
  };

  // Get AC matches (First and Last digit)
  const getACMatches = (result: string) => {
    return userData.flatMap((item) =>
      item.tableRows.filter((row) => row.letter === 'AC' && row.num === result[0] + result[2])
    );
  };

  // Get full 3-digit matches (Uses full result)
  const getThreeDigitMatches = (result: string) => {
    return userData.flatMap((item) =>
      item.tableRows.filter((row) => row.num === result)
    );
  };

  // Get ABC matches (ONLY checks the first result digit)
  const getABCMatches = (result: string) => {
    return userData.flatMap((item) =>
      item.tableRows.filter((row) =>
        (row.letter === 'A' && row.num === result[0]) ||
        (row.letter === 'B' && row.num === result[1]) ||
        (row.letter === 'C' && row.num === result[2])
      )
    );
  };

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
        return 20 * count;
    }
  };

  const getCommission = (ticket: string, count: number) => {
    switch (ticket) {
      case '1':
        return 400 * count;
      case '2':
        return 50 * count;
      case '3':
        return 20 * count;
      case '4':
        return 20 * count;
      case '5':
        return 20 * count;
      default:
        return 10 * count;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const winningResults = filteredResults.filter(
    (result) =>
      getThreeDigitMatches(result.result).length > 0 || getABCMatches(result.result).length > 0
  );

  return (
    <div className="results-container">
      <div className="date-time-picker">
        <label>
          Select Date:
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </label>

        <label>
          Select Time:
          <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
            <option value="">Select Time</option>
            <option value="1pm">1 PM</option>
            <option value="3pm">3 PM</option>
            <option value="6pm">6 PM</option>
            <option value="8pm">8 PM</option>
          </select>
        </label>

        <button onClick={handleSubmit}>Submit</button>
      </div>

      {winningResults.length > 0 && (
        <div className="winning-results">
          <table className="results-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Num</th>
                <th>Letter</th>
                <th>Prize</th>
                <th>Commission</th>
              </tr>
            </thead>
            <tbody>
              {winningResults.flatMap((result, index) => {
                const abcMatches = getABCMatches(result.result);
                const abMatches = getABMatches(result.result);
                const bcMatches = getBCMatches(result.result);
                const acMatches = getACMatches(result.result);
                const threeDigitMatches = getThreeDigitMatches(result.result);

                let formattedRows: any[] = [];

                threeDigitMatches.forEach((match) => {
                  const count = parseInt(match.count, 10);
                  formattedRows.push({
                    ticket: result.ticket,
                    num: result.result,
                    letter: match.letter,
                    prize: getPrize(result.ticket, count),
                    commission: getCommission(result.ticket, count),
                  });
                });

                if (result.ticket === '1') {
                  [...abcMatches, ...abMatches, ...bcMatches, ...acMatches].forEach((match) => {
                    const count = parseInt(match.count, 10);
                    formattedRows.push({
                      ticket: '1',
                      num: `${match.letter} ${match.num}`,
                      letter: match.letter,
                      prize: count * (['AB', 'BC', 'AC'].includes(match.letter) ? 700 : 100),
                      commission: count * (['AB', 'BC', 'AC'].includes(match.letter) ? 30 : 0),
                    });
                  });
                }

                return formattedRows.map((row, idx) => (
                  <tr key={`${index}-${idx}`}>
                    <td>{row.ticket}</td>
                    <td>{row.num}</td>
                    <td>{row.letter}</td>
                    <td>{row.prize.toFixed(2)}</td>
                    <td>{row.commission.toFixed(2)}</td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResultsComponent;
