import { FC, useState, useRef, useEffect } from 'react';
import Navbar from '../Admin/Navbar';
import { IconTrash } from '@tabler/icons-react';
import './home.css';

const Home: FC = () => {
  const [selectedTime, setSelectedTime] = useState<string>('3PM');
  const [visibleDigit, setVisibleDigit] = useState<string | null>(null);

  const [numValue, setNumValue] = useState<string>('');
  const [numValue2, setNumValue2] = useState<string>('');
  const [numValue3, setNumValue3] = useState<string>('');
  const [countValue, setCountValue] = useState<string>(''); // Track count value for all digits

  const [digit1Value, setDigit1Value] = useState<string>('');
  const [digit2Value, setDigit2Value] = useState<string>('');
  const [digit3Value, setDigit3Value] = useState<string>('');

  const [combinedValue, setCombinedValue] = useState<string>(''); 
  const [tableRows, setTableRows] = useState<{ letter: string; num: string; count: string; amount: string }[]>([]); // Track letter, num, count, and amount

  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);
  const inputRef3 = useRef<HTMLInputElement | null>(null);
  const inputRef4 = useRef<HTMLInputElement | null>(null);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    console.log('Selected time:', time);
  };

  const handleButtonClick = (digit: string) => {
    setVisibleDigit(digit);
  };

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 1) value = value.slice(0, 1);
    setNumValue(value);

    if (value.length === 1 && inputRef2.current) inputRef2.current.focus();
  };

  const handleNumChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 2) value = value.slice(0, 2);
    setNumValue2(value);

    if (value.length === 2 && inputRef3.current) inputRef3.current.focus();
  };

  const handleNumChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 3) value = value.slice(0, 3);
    setNumValue3(value);

    if (value.length === 3 && inputRef4.current) inputRef4.current.focus();
  };

  useEffect(() => {
    if (visibleDigit === 'digit1' && inputRef1.current) inputRef1.current.focus();
    else if (visibleDigit === 'digit2' && inputRef2.current) inputRef2.current.focus();
    else if (visibleDigit === 'digit3' && inputRef3.current) inputRef3.current.focus();
  }, [visibleDigit]);

  const handleDigit1ButtonClick = (value: string) => {
    if (value === 'All') {
      // Add A, B, and C to the table
      setTableRows((prevRows) => [
        ...prevRows,
        { letter: 'A', num: numValue, count: countValue, amount: (parseInt(countValue, 10) * 12).toString() },
        { letter: 'B', num: numValue, count: countValue, amount: (parseInt(countValue, 10) * 12).toString() },
        { letter: 'C', num: numValue, count: countValue, amount: (parseInt(countValue, 10) * 12).toString() },
      ]);
    } else {
      const combined = `${value}${numValue}`;
      setDigit1Value(value);
      setCombinedValue(combined);
  
      const count = parseInt(countValue, 10) || 0;
      const amount = count * 12;
  
      setTableRows((prevRows) => [
        ...prevRows,
        { letter: value, num: numValue, count: countValue, amount: amount.toString() },
      ]);
    }
  };
  
  const handleDigit2ButtonClick = (value: string) => {
    if (value === 'All') {
      // Add AB, BC, and AC to the table
      setTableRows((prevRows) => [
        ...prevRows,
        { letter: 'AB', num: numValue2, count: countValue, amount: (parseInt(countValue, 10) * 10).toString() },
        { letter: 'BC', num: numValue2, count: countValue, amount: (parseInt(countValue, 10) * 10).toString() },
        { letter: 'AC', num: numValue2, count: countValue, amount: (parseInt(countValue, 10) * 10).toString() },
      ]);
    } else {
      const combined = `${value}${numValue2}`;
      setDigit2Value(value);
      setCombinedValue(combined);
  
      const count = parseInt(countValue, 10) || 0;
      const amount = count * 10;
  
      setTableRows((prevRows) => [
        ...prevRows,
        { letter: value, num: numValue2, count: countValue, amount: amount.toString() },
      ]);
    }
  };
  
  const handleDigit3ButtonClick = (value: string) => {
    if (value === 'All') {
      // Add SUPER and BOX to the table
      setTableRows((prevRows) => [
        ...prevRows,
        { letter: 'SUPER', num: numValue3, count: countValue, amount: (parseInt(countValue, 10) * 10).toString() },
        { letter: 'BOX', num: numValue3, count: countValue, amount: (parseInt(countValue, 10) * 10).toString() },
      ]);
    } else {
      const combined = `${value}${numValue3}`;
      setDigit3Value(value);
      setCombinedValue(combined);
  
      const count = parseInt(countValue, 10) || 0;
      const amount = count * 10;
  
      setTableRows((prevRows) => [
        ...prevRows,
        { letter: value, num: numValue3, count: countValue, amount: amount.toString() },
      ]);
    }
  };
  

  // Function to delete a row from the table
  const handleDeleteRow = (index: number) => {
    setTableRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  return (
    <>
      <Navbar />
      <div className='drp'>
        <div className="dropdown">
          <a className="btn btn-light" href="#" data-bs-toggle="dropdown">
            {selectedTime}
          </a>
        
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#" onClick={() => handleTimeSelect('1PM')}>1PM</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => handleTimeSelect('6PM')}>6PM</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => handleTimeSelect('8PM')}>8PM</a></li>
          </ul>
        </div>
        
        <div className="digits">
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-dark gray" onClick={() => handleButtonClick('digit1')}>1</button>
            <button type="button" className="btn btn-info" onClick={() => handleButtonClick('digit2')}>2</button>
            <button type="button" className="btn btn-success" onClick={() => handleButtonClick('digit3')}>3</button>
          </div>
        </div>
      </div>

      {visibleDigit === 'digit1' && (
        <div className="digit1">
          <div className="input1">
            <input
              type="number"
              placeholder="Num"
              value={numValue}
              onChange={handleNumChange}
              ref={inputRef1}
            />
            <input
              type="number"
              placeholder="Count"
              value={countValue}
              onChange={(e) => setCountValue(e.target.value)} // Update count value
              ref={inputRef4}
            />
            <div className='chckbx'>
              <input type="checkbox" />
              <input type="checkbox" />
              
            </div>
          </div>

          <div className="type">
            <button type="button" className="btn btn-dark gray" onClick={() => handleDigit1ButtonClick('A')}>A</button>
            <button type="button" className="btn btn-dark gray" onClick={() => handleDigit1ButtonClick('B')}>B</button>
            <button type="button" className="btn btn-dark gray" onClick={() => handleDigit1ButtonClick('C')}>C</button>
            <button type="button" className="btn btn-dark gray" onClick={() => handleDigit1ButtonClick('All')}>All</button>
            </div>
         
        </div>
      )}

      {visibleDigit === 'digit2' && (
        <div className="digit2">
          <div className="input2">
            <input
              type="number"
              placeholder="Num"
              value={numValue2}
              onChange={handleNumChange2}
              ref={inputRef2}
            />
            <input
              type="number"
              placeholder="Count"
              value={countValue}
              onChange={(e) => setCountValue(e.target.value)} // Update count value for digit2
              ref={inputRef4}
            />
            <div className='chckbx'>
              <input type="checkbox" />
              <input type="checkbox" />
            </div>
          </div>

          <div className="type">
            <button type="button" className="btn btn-info" onClick={() => handleDigit2ButtonClick('AB')}>AB</button>
            <button type="button" className="btn btn-info" onClick={() => handleDigit2ButtonClick('BC')}>BC</button>
            <button type="button" className="btn btn-info" onClick={() => handleDigit2ButtonClick('AC')}>AC</button>
            <button type="button" className="btn btn-dark gray" onClick={() => handleDigit2ButtonClick('All')}>All</button>
            </div>
         
        </div>
      )}

      {visibleDigit === 'digit3' && (
        <div className="digit3">
          <div className="input3">
            <input
              type="number"
              placeholder="Num"
              value={numValue3}
              onChange={handleNumChange3}
              ref={inputRef3}
            />
            <input
              type="number"
              placeholder="Count"
              value={countValue}
              onChange={(e) => setCountValue(e.target.value)} // Update count value for digit3
              ref={inputRef4}
            />
            <div className='chckbx'>
              <input type="checkbox" />
              <input type="checkbox" />
            </div>
          </div>

          <div className="type">
            <button type="button" className="btn btn-success" onClick={() => handleDigit3ButtonClick('super')}>SUPER</button>
            <button type="button" className="btn btn-success" onClick={() => handleDigit3ButtonClick('BOX')}>BOX</button>
            <button type="button" className="btn btn-dark gray" onClick={() => handleDigit3ButtonClick('All')}>All</button>
            </div>
         
        </div>
      )}

      <button className="save">Save</button>

      <div className="table-container">
        <h1 className="tamount">
          Total: {tableRows.reduce((total, row) => total + (parseInt(row.amount, 10) || 0), 0)}
        </h1>
        <table className="table">
        
        <tbody>
  {tableRows
    .slice() // Create a copy of the tableRows array (important to avoid mutating state)
    .reverse() // Reverse the order of the rows
    .map((row, index) => (
      <tr key={index}>
        <td>{row.letter}</td>
        <td>{row.num}</td>
        <td>{row.count}</td> {/* Display count */}
        <td>{row.amount}</td> {/* Display amount */}
        <td>
          <IconTrash stroke={2} onClick={() => handleDeleteRow(index)} /> {/* Delete row on trash icon click */}
        </td>
      </tr>
    ))}
</tbody>

        </table>
      </div>
    </>
  );
};

export default Home;
