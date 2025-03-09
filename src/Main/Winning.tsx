import { FC, useState, useEffect, ReactNode } from 'react';
import './reporter.css';
import { IconTrash } from '@tabler/icons-react';
import axios from 'axios';

interface TableData {
  type: ReactNode;
  tableRows: {
    _id: number;
    letter: string;
    num: string;
    count: string;
    amount: string;
    time: string;
    winning: number;
  }[];
  _id: string;
  customId: string;
  createdAt: string;
  selectedTime: string;
}

interface ReporterProps {
  selectedDate: string;
  selectedTime: string;
  commonNumbers: string[]; // Added prop for common numbers
}

const Reporter: FC<ReporterProps> = ({ selectedDate, selectedTime, commonNumbers }) => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filteredData, setFilteredData] = useState<TableData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getData');
        console.log('API Response:', response.data);

        if (Array.isArray(response.data)) {
          // Map over the data to calculate the "winning" field
          const updatedData = response.data.map((data: TableData) => ({
            ...data,
            tableRows: data.tableRows.map((row) => ({
              ...row,
              winning: parseInt(row.count) * 5000, // Calculate the winning amount
            })),
          }));
          setTableData(updatedData);
        } else {
          setError('The received data format is invalid. Expected an array.');
        }
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Fetch data on mount

  // Filter data based on selected time, date, and common numbers
  useEffect(() => {
    if (selectedTime && selectedDate && commonNumbers.length > 0) {
      const filtered = tableData.filter((data) => {
        const isTimeMatch = data.selectedTime === selectedTime;
        const isDateMatch = new Date(data.createdAt).toLocaleDateString() === new Date(selectedDate).toLocaleDateString();
        const isNumMatch = data.tableRows.some((row) => commonNumbers.includes(row.num)); // Match num with common numbers

        return isTimeMatch && isDateMatch && isNumMatch; // Only include data that matches all conditions
      });

      setFilteredData(filtered);
    } else {
      setFilteredData(tableData); // Show all data if no time or common numbers are selected
    }
  }, [selectedTime, selectedDate, commonNumbers, tableData]); // Re-run when selectedTime, selectedDate, or commonNumbers changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="table-containers">
      {filteredData.length === 0 ? (
        <p>No data available for the selected time, date, and common numbers</p>
      ) : (
        filteredData.map((data) => (
          <div className="table-wrapper" key={data._id}>
            <table className="reporter-table">
              <thead>
                <tr>
                  <th colSpan={7} className="bill-infos">
                    Bill No: {data.customId}
                    {new Date(data.createdAt).toLocaleString()}
                    <button className="delete-button">
                      <IconTrash stroke={2} />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.tableRows.map((row) => (
                  <tr key={row._id}>
                    <td>{row.num}</td>
                    <td>{row.letter}</td>
                    <td>{row.count}</td>
                    <td>{row.winning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default Reporter;
