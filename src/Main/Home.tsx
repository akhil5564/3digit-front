import { FC, useState, useRef, useEffect } from 'react';
import Navbar from '../Admin/Navbar';
import { IconTrash } from '@tabler/icons-react';
import './home.css';

const Home: FC = () => {
  const [selectedTime, setSelectedTime] = useState<string>('3PM');
  const [visibleDigit, setVisibleDigit] = useState<string | null>(null);

  const [numValue, setNumValue] = useState<string>(''); // Digit 1 num value
  const [numValue2, setNumValue2] = useState<string>(''); // Digit 2 num value
  const [numValue3, setNumValue3] = useState<string>(''); // Digit 3 num value
  const [countValue, setCountValue] = useState<string>(''); // Track count value for all digits

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
    if (value.length > 1) value = value.slice(0, 1); // Limit to a single character
    setNumValue(value);

    if (value.length === 1 && inputRef2.current) inputRef2.current.focus();
  };

  const handleNumChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 2) value = value.slice(0, 2); // Limit to 2 characters
    setNumValue2(value);

    if (value.length === 2 && inputRef3.current) inputRef3.current.focus();
  };

  const handleNumChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 3) value = value.slice(0, 3); // Limit to 3 characters
    setNumValue3(value);

    if (value.length === 3 && inputRef4.current) inputRef4.current.focus();
  };

  useEffect(() => {
    if (visibleDigit === 'digit1' && inputRef1.current) inputRef1.current.focus();
    else if (visibleDigit === 'digit2' && inputRef2.current) inputRef2.current.focus();
    else if (visibleDigit === 'digit3' && inputRef3.current) inputRef3.current.focus();
  }, [visibleDigit]);

  const handleDigitButtonClick = (digit: string, numValue: string, countValue: string, letter: string) => {
    const amount = parseInt(countValue, 10) * 10;
    setTableRows((prevRows) => [
      ...prevRows,
      { letter, num: numValue, count: countValue, amount: amount.toString() },
    ]);
  };

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
          </div>

          <div className="type">
            <button type="button" className="btn btn-dark gray" onClick={() => handleDigitButtonClick('A', numValue, countValue, 'A')}>A</button>
            <button type="button" className="btn btn-dark gray" onClick={() => handleDigitButtonClick('B', numValue, countValue, 'B')}>B</button>
            <button type="button" className="btn btn-dark gray" onClick={() => handleDigitButtonClick('C', numValue, countValue, 'C')}>C</button>
            <button type="button" className="btn btn-dark gray" onClick={() => handleDigitButtonClick('All', numValue, countValue, 'All')}>All</button>
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
              onChange={(e) => setCountValue(e.target.value)} // Update count value
              ref={inputRef4}
            />
          </div>

          <div className="type">
            <button type="button" className="btn btn-info" onClick={() => handleDigitButtonClick('AB', numValue2, countValue, 'AB')}>AB</button>
            <button type="button" className="btn btn-info" onClick={() => handleDigitButtonClick('BC', numValue2, countValue, 'BC')}>BC</button>
            <button type="button" className="btn btn-info" onClick={() => handleDigitButtonClick('AC', numValue2, countValue, 'AC')}>AC</button>
            <button type="button" className="btn btn-dark gray" onClick={() => handleDigitButtonClick('All', numValue2, countValue, 'All')}>All</button>
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
              onChange={(e) => setCountValue(e.target.value)} // Update count value
              ref={inputRef4}
            />
          </div>

          <div className="type">
            <button type="button" className="btn btn-success" onClick={() => handleDigitButtonClick('SUPER', numValue3, countValue, 'SUPER')}>SUPER</button>
            <button type="button" className="btn btn-success" onClick={() => handleDigitButtonClick('BOX', numValue3, countValue, 'BOX')}>BOX</button>
            <button type="button" className="btn btn-dark gray" onClick={() => handleDigitButtonClick('All', numValue3, countValue, 'All')}>All</button>
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
