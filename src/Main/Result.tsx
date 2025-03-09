import  { useState, useEffect, SetStateAction } from 'react';
import './Result.css'; // Assuming you have a Result.css file for styling
import Winner from './Winner'; // Import WinningNumbersTable

const Result = () => {
  const [results, setResults] = useState<any[]>([]); // Assuming the result type is `any[]`, adjust as necessary
  const [salesReport, setSalesReport] = useState<any[]>([]); // Sales report data
  const [winners, setWinners] = useState<any[]>([]); // State to store winners' information

  // Fetch result data from API
 

  // Fetch sales report data
  const fetchResultData = async () => {
    try {
      const response = await fetch('http://localhost:5000/getresult');
      if (response.ok) {
        const data = await response.json();
        console.log('Result Data:', data);  // Log result data to ensure it’s fetched
        setResults(data);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const fetchSalesReport = async () => {
    try {
      const response = await fetch('http://localhost:5000/getData');
      if (response.ok) {
        const data = await response.json();
        console.log('Sales Report Data:', data);  // Log sales data to ensure it’s fetched
        setSalesReport(data);
      } else {
        console.error('Failed to fetch sales report:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching sales report:', error);
    }
  };
  

  // Fetch data when component mounts
  useEffect(() => {
    fetchResultData();
    fetchSalesReport();
  }, []);

  useEffect(() => {
    const matchingTickets: SetStateAction<any[]> = [];
  
    // Loop through results and salesReport to find matching tickets
    results.forEach((result) => {
      salesReport.forEach((sale) => {
        if (result.ticket === sale.ticket) {
          // Log to check ticket matches
          console.log(`Matching Ticket Found: ${result.ticket}`);
  
          const prize = sale.count * 5000;
          matchingTickets.push({
            ticket: result.ticket,
            count: sale.count,
            prize: prize,
          });
        }
      });
    });
  
    setWinners(matchingTickets);
  }, [results, salesReport]);
  console.log('Winners:', winners); // Log winners before rendering

  return (
    <div className="result-container">
      <div className="result-grid">
        {/* Render other content, such as the results */}
        {results.slice(0, 5).map((result, index) => (
          <div key={index} className="result-item single-column">
            <span className="ticket">{result.ticket} : </span>
            <span className="result">{result.result}</span>
          </div>
        ))}
      </div>

      {/* Show the Winner table if matching tickets are found */}
      {winners && winners.length > 0 && <Winner winners={winners} />}
      </div>
  );
};

export default Result;
