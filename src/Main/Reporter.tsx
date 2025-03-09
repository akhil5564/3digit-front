import { FC, useState, useEffect, ReactNode } from 'react';
import './reporter.css';  // CSS for styling
import { IconTrash, IconCopy } from '@tabler/icons-react';  // Trash and Copy icons
import axios from 'axios';  // Axios for making API calls
import { useLocation } from 'react-router-dom';  // To access query parameters in the URL

// Define the structure of the data
interface TableData {
  type: ReactNode;
  tableRows: {
    _id: number;
    letter: string;
    num: string;
    count: string;
    amount: string;
    time: string;
  }[];
  _id: string;
  customId: string;
  createdAt: string;
  selectedTime: string;
}

const Reporter: FC = () => {
  // States for data, loading, error handling, etc.
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filteredData, setFilteredData] = useState<TableData[]>([]);

  // Access URL query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedTime = queryParams.get('time');  // e.g., '3PM'

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://manu-netflix.onrender.com/getData');
        if (Array.isArray(response.data)) {
          setTableData(response.data);
        } else {
          setError('The received data format is invalid. Expected an array.');
        }
      } catch (err: any) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on the selected time from query parameters
  useEffect(() => {
    if (selectedTime) {
      const filtered = tableData.filter((data) => data.selectedTime === selectedTime);
      setFilteredData(filtered);
    } else {
      setFilteredData(tableData);  // Show all data if no time is selected
    }
  }, [selectedTime, tableData]);

  // State for row selection and detecting long press
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [longPress, setLongPress] = useState<boolean>(false);

  // Function to delete a specific container (table)
  const deleteContainer = async (id: string) => {
    try {
      await axios.delete(`https://manu-netflix.onrender.com/deleteData/${id}`);
      setTableData((prevData) => prevData.filter((data) => data._id !== id));
      alert('Data deleted successfully');
    } catch (error) {
      alert('Failed to delete data. Please try again.');
    }
  };

  // Handle row click (select or deselect a row)
  const handleClick = (_id: string): void => {
    setSelectedRow((prev) => (prev === _id ? null : _id));  // Toggle row selection
  };

  // Handle long press (right-click or long tap)
  const handleLongPress = (_id: string) => {
    setLongPress(true);
    setSelectedRow(_id);  // Show delete button for this row
  };

  // Function to delete a row
  const deleteRow = async (_id: string) => {
    try {
      await axios.delete(`https://manu-netflix.onrender.com/deleteRow/${_id}`);
      setTableData((prevData) => prevData.map((data) => ({
        ...data,
        tableRows: data.tableRows.filter((row) => row._id !== _id),
      })));
      alert('Row deleted successfully');
    } catch (error) {
      alert('Failed to delete row. Please try again.');
    }
    setLongPress(false);  // Hide delete button after action
  };


// Format data for copy to clipboard
const formatDataForCopy = (tableData: TableData[]) => {
  let formattedString = '';

  tableData.forEach((data) => {
    data.tableRows.forEach((row) => {
      const num = row.num;
      let count = parseInt(row.count); // Ensure count is a number
      const letter = row.letter.split(',');

      // Only include data where the count is greater than or equal to 5
      if (count < 5) {
        return; // Skip this row if count is less than 5
      }

      // Subtract 5 from the count
      count -= 5;

      letter.forEach((type) => {
        // Handle cases based on type
        if (type === 'super') {
          formattedString += `${num}=${count}Super\n`;  // Showing 'Super' for the 'super' type
        } else if (type === 'box') {
          formattedString += `${num}=${count}B\n`;  // For 'box', appending 'B'
        } else {
          // For types like ab, bc, ac
          type.split(',').forEach((subType) => {
            formattedString += `${subType}=${num}=${count}\n`;
          });
        }
      });
    });
  });

  return formattedString.trim(); // Return the formatted data
};


const handleCopy = () => {
    const formattedData = formatDataForCopy(filteredData);
    navigator.clipboard.writeText(formattedData)
      .then(() => {
        alert('Data copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy data to clipboard.');
      });
  };

  // Loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="table-containers">
      {filteredData.length === 0 ? (
        <p>No data available for the selected time</p>
      ) : (
        <>
          <button className="copy-button" onClick={handleCopy}>
            <IconCopy stroke={2} /> Copy Data
          </button>
          {filteredData.map((data) => (
            <div className="table-wrapper" key={data._id}>
              <table className="reporter-table">
                <thead>
                  <tr>
                    <th colSpan={6} className="bill-infos">
                      Bill No: {data.customId}
                      {new Date(data.createdAt).toLocaleString()}
                      <button className="delete-button" onClick={() => deleteContainer(data._id)}>
                        <IconTrash stroke={2} />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.tableRows.map((row, index) => (
                    <tr
                      key={row._id || index}
                      onClick={() => handleClick(row._id)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        handleLongPress(row._id);
                      }}
                      style={{ backgroundColor: selectedRow === row._id ? '#f0f0f0' : 'white' }}
                    >
                      <td>{row.num}</td>
                      <td>{row.letter}</td>
                      <td>{row.count}</td>
                      <td>{row.amount}</td>
                      {selectedRow === row._id && longPress && (
                        <td>
                          <button className="delete-button" onClick={() => deleteRow(row._id)}>
                            <IconTrash stroke={2} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Reporter;
