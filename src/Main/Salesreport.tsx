import { FC, useState, useEffect } from 'react';
import { IconZoomCode } from '@tabler/icons-react';
import '../Main/Salesreport.css';
import { Link } from 'react-router-dom';

interface salesReportProps {
  // You can add more props if needed for further customization
}

const SalesReport: FC<salesReportProps> = ({}) => {
  const [number, setNumber] = useState<number | string>(''); // State for the number input
  const [date, setDate] = useState<string>(''); // State for the calendar input
  const [selectedOption, setSelectedOption] = useState<string>(''); // State for dropdown selection
  const [selectedTime, setSelectedTime] = useState<string>(''); // State for time selection

  // Set today's date in YYYY-MM-DD format as the default value for the date input
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    setDate(formattedDate); // Set the formatted date as the default value
  }, []);

  // Handle number input change
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  // Handle dropdown change
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  // Handle time dropdown change
  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  // Handle date input change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div className="sales-report-container">
      <div className="form-group">
        {/* Time Dropdown */}
        <div className="form-group">
          <label className="form-label">Select Time</label>
          <select className="form-input" value={selectedTime} onChange={handleTimeChange}>
            <option value="1PM">1PM</option>
            <option value="3PM">3PM</option>
            <option value="6PM">6PM</option>
            <option value="8PM">8PM</option>
            <option value="All">All</option>

          </select>
        </div>

        {/* Date range selection */}
        <div className="form-group">
          <label className="form-label">From:</label>
          <input
            className="form-input"
            type="date"
            value={date}
            onChange={handleDateChange}
          />

          <label className="form-label">To:</label>
          <input
            className="form-input"
            type="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>

        {/* User dropdown */}
        <div className="form-group">
          <label className="form-label">User</label>
          <select
            className="form-input"
            value={selectedOption}
            onChange={handleDropdownChange}
          >
            <option value="option1">All</option>
            <option value="option2">User1</option>
            <option value="option3">User2</option>
            <option value="option4">User3</option>
          </select>
        </div>

        {/* Number of digits selection */}
        <div className="form-group">
          <label className="form-label">No of Digits</label>
          <select
            className="form-input"
            value={selectedOption}
            onChange={handleDropdownChange}
          >
            <option value="option1">ALL</option>
            <option value="option2">1</option>
            <option value="option3">2</option>
            <option value="option4">3</option>
          </select>
        </div>

        {/* Ticket selection */}
        <div className="form-group">
          <label className="form-label">Ticket</label>
          <select
            className="form-input"
            value={selectedOption}
            onChange={handleDropdownChange}
          >
            <option value="option1">A</option>
            <option value="option2">B</option>
            <option value="option3">C</option>
          </select>
        </div>

        {/* Number input */}
        <div className="form-group">
          <label className="form-label">Number:</label>
          <input
            className="form-input"
            type="number"
            placeholder="Enter number"
            value={number}
            onChange={handleNumberChange}
          />
        </div>
      </div>

      {/* Submit button to go to Reporter page with selected time as a query parameter */}
    
      <button className="submit-button">
  <Link to={`/reporter?time=${selectedTime}`}>
    <IconZoomCode stroke={2} />
  </Link>
</button>
    </div>
  );
};

export default SalesReport;