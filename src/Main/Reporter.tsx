import { FC, useState, useEffect, ReactNode } from 'react'; // Ensure ReactNode is imported
import './reporter.css';
import { IconTrash } from '@tabler/icons-react';

import axios from 'axios';

interface TableData {
  type: ReactNode;
  tableRows: {
    _id: number; letter: string; num: string; count: string; amount: string;
  }[];
  _id: string;
  customId: string;
  createdAt: string;
}

const Reporter: FC = () => {
  const [tableData, setTableData] = useState<TableData[]>([]); // State for table data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(''); // Error state

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getData');
        console.log('API Response:', response.data);

        if (Array.isArray(response.data)) {
          setTableData(response.data); // Correct state setter
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

    // Cleanup: Re-enable scrolling when the component is unmounted
    return () => {
      document.body.style.overflow = 'auto'; // Ensure scrolling is reset on unmount
    };
  }, []); // Empty dependency array to fetch only once when component mounts

  // Delete a specific container (table) and remove from state
  const deleteContainer = async (id: string) => {
    try {
      // Send DELETE request to backend to delete the data
      await axios.delete(`http://localhost:5000/deleteData/${id}`);
      
      // If successful, update state to remove the table from view
      setTableData((prevData) => prevData.filter((data) => data._id !== id));
      alert("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete data. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>; // Show loading message

  if (error) return <p>{error}</p>; // Show error message if any

  function handleDeleteRandomRow(event: MouseEvent<SVGSVGElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      {/* Container to hold both header and data */}
      <div className="table-container">
        {tableData.map((data) => (
          <div className="table-wrapper" key={data._id}>
            <table className="reporter-table">
              <thead>
                {/* Display the Bill No and createdAt with the Delete button */}
                <tr>
                  <th colSpan={6} className="bill-info">
                    <span>Bill No: {data.customId}</span>
                    <span className="created-at">
                      {new Date(data.createdAt).toLocaleString()}
                    </span>
                    {/* Delete button to remove this container */}
                    <button className="delete-button" onClick={() => deleteContainer(data._id)}>
                    <IconTrash stroke={2} onClick={handleDeleteRandomRow} />

                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Map over tableData to create rows */}
                {data.tableRows.map((row, index) => (
                  <tr key={row._id || index}> {/* Ensure each row has a unique key */}
                    <td>sas</td> {/* Assuming _id represents the username */}
                    <td>{data.type}</td> {/* Display type */}
                    <td>{row.num}</td>
                    <td>{row.count}</td>
                    <td>{row.amount}</td>
                    <td>{(parseFloat(row.count) * parseFloat(row.amount)).toFixed(2)}</td> {/* Calculate total amount */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};

export default Reporter;
