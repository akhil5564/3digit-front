import { FC, useState, useEffect } from 'react';
import './reporter.css';  // CSS for styling
import { IconTrash} from '@tabler/icons-react';  // Trash and Copy icons
import axios from 'axios';  // Axios for making API calls
import { useLocation } from 'react-router-dom';  // To access query parameters in the URL

// Define the structure of the data
interface TableData {
  type: string;
  tableRows: {
    id: string;
    _id: number;
    letter: string;
    num: string;
    count: string;
    amount: string;
    time: string;  // Store time in 12-hour format (e.g., '1PM')
  }[];
  _id: string;
  customId: string;
  createdAt: string;
  selectedTime: string;
}

const Reporter: FC = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filteredData, setFilteredData] = useState<TableData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>(''); // To store the error message when trying to delete after cutoff time

  // Access URL query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedTime = queryParams.get('time'); // e.g., '1PM'
  const fromDate = queryParams.get('fromDate');
  const toDate = queryParams.get('toDate');

  // Define cutoff times for each time slot (in 24-hour format)
  const cutoffTimes: { [key: string]: string } = {
    '1pm': '12:56',
    '3pm': '15:00',
    '6pm': '17:56',
    '8pm': '19:56',
  };

  // Function to get the current time in HH:MM format (24-hour)
  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Ensure 2 digits
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits
    return `${hours}:${minutes}`;
  };

  // Function to check if the delete button should be disabled for a specific row based on its time
  const shouldDisableDelete = (timeSlot: string): boolean => {
    const currentTime = getCurrentTime();
    const cutoffTime = cutoffTimes[timeSlot.toLowerCase()]; // Get the cutoff time for the selected time slot
    return currentTime > cutoffTime; // If the current time is greater than the cutoff, disable delete
  };

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

  // Filter data based on the selected time, fromDate, and toDate
  useEffect(() => {
    const filtered = tableData.filter((data) => {
      // Filter by selected time (from query params) for the entire report
      const timeMatches = selectedTime === 'All' || data.selectedTime === selectedTime;

      // Filter by date range (if present)
      const date = new Date(data.createdAt).toISOString().split('T')[0]; // Format to YYYY-MM-DD
      const withinDateRange = (!fromDate || date >= fromDate) && (!toDate || date <= toDate);

      // Combine both time and date range filters
      return timeMatches && withinDateRange;
    });

    setFilteredData(filtered);
  }, [selectedTime, fromDate, toDate, tableData]);

  // Loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Handle Delete Container Action (delete the entire set of rows within a container)
  const handleDeleteContainer = async (containerId: string) => {
    if (shouldDisableDelete(selectedTime || '')) {
      setErrorMessage(`Cannot delete data for ${selectedTime}. The cutoff time has passed.`);
      return; // Prevent deletion if the time has passed
    }
  
    try {
      // Send a DELETE request to the backend API
      const response = await axios.delete(`https://manu-netflix.onrender.com/deleteData/${containerId}`);
      
      if (response.status === 200) {
        // Successfully deleted the container, update state to remove it from the UI
        const updatedData = filteredData.filter((data) => data._id !== containerId);
        setFilteredData(updatedData);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to delete container. Please try again later.');
    }
  };
  

  // Handle Delete Row Action (delete an individual row)
  const handleDeleteRow = (rowId: number) => {
    if (shouldDisableDelete(selectedTime || '')) {
      setErrorMessage(`Cannot delete data for ${selectedTime}. The cutoff time has passed.`);
      return; // Prevent deletion if time has passed
    }

    const updatedData = filteredData.map((data) => ({
      ...data,
      tableRows: data.tableRows.filter((row) => row._id !== rowId),
    }));
    setFilteredData(updatedData);
  };

  return (
    <div className="table-containers">
      {filteredData.length === 0 ? (
        <p>No data available for the selected time and date range</p>
      ) : (
        <>
          {/* Display error message if delete is not allowed */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Data Tables */}
          {filteredData.map((data) => (
            <div className="table-wrapper" key={data._id}>
              <table className="reporter-table">
                <thead>
                  <tr>
                    <th colSpan={6} className="bill-infos">
                      Bill No: {data.customId}
                      {new Date(data.createdAt).toLocaleString()}

                      <button
  className="delete-container-btn"
  onClick={() => handleDeleteContainer(data._id)} // Delete entire container
  aria-label="Delete Container"
>
  <IconTrash
    stroke={2}
    style={shouldDisableDelete(data.selectedTime) ? { cursor: 'not-allowed', opacity: 0.5 } : {}}
  />
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
                      <td>{row.amount}</td>
                      <td>{row.time}</td>
                      <td>
                        <IconTrash
                          className="icon-trash"
                          onClick={() => handleDeleteRow(row._id)} // Handle delete for row
                          stroke={2}
                          style={shouldDisableDelete(selectedTime || '') ? { cursor: 'not-allowed', opacity: 0.5 } : {}}
                        />
                      </td>
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
