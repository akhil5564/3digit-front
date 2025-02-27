import { FC, useState, useRef, useEffect, ChangeEvent } from 'react';
import Navbar from '../Admin/Navbar';
import { IconTrash } from '@tabler/icons-react';
import './home.css';

const Home: FC = () => {
  const [selectedTime, setSelectedTime] = useState<string>('3PM');
  const [visibleDigit, setVisibleDigit] = useState<string | null>(null);
  const [isEndVisible, setIsEndVisible] = useState<boolean>(false); // 
  const [numValue, setNumValue] = useState<string>('');
  const [numValue2, setNumValue2] = useState<string>('');
  const [numValue3, setNumValue3] = useState<string>('');
  const [countValue, setCountValue] = useState<string>(''); // Track count value for all digits
  const [tableRows, setTableRows] = useState<{ letter: string; num: string; count: string; amount: string }[]>([]); // Track letter, num, count, and amount
  const [isSetChecked, setIsSetChecked] = useState<boolean>(false);


  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);
  const inputRef3 = useRef<HTMLInputElement | null>(null);
  const inputRef4 = useRef<HTMLInputElement | null>(null);

  const generatePermutations = (num: string): string[] => {
    const permutations: Set<string> = new Set();  // Use Set to avoid duplicates
    
    // Function to generate all permutations of a string
    const permute = (str: string, prefix: string) => {
      if (str.length === 0) {
        permutations.add(prefix); // Add the final permutation to the Set
      } else {
        for (let i = 0; i < str.length; i++) {
          const remaining = str.substring(0, i) + str.substring(i + 1);
          permute(remaining, prefix + str[i]);
        }
      }
    };
  
    permute(num, '');
  
    return Array.from(permutations); // Convert Set back to array for easier handling
  };
  
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
      const count = parseInt(countValue, 10) || 0;
      const amount = count * 12;
  
      setTableRows((prevRows) => [
        ...prevRows,
        { letter: value, num: numValue, count: countValue, amount: amount.toString() },
      ]);
    }
  
    // Clear the inputs after adding to the table
    setNumValue('');
    setCountValue('');
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
      const count = parseInt(countValue, 10) || 0;
      const amount = count * 10;
  
      setTableRows((prevRows) => [
        ...prevRows,
        { letter: value, num: numValue2, count: countValue, amount: amount.toString() },
      ]);
    }
  
    // Clear the inputs after adding to the table
    setNumValue2('');
    setCountValue('');
  };
  const handleDigit3ButtonClick = (value: string) => {
    const count = parseInt(countValue, 10) || 0;
    const amount = count * 10;
  
    // Check if both numValue3 and the end input are provided
    const startNum = parseInt(numValue3, 10);
    const endNum = parseInt(numValue, 10);  // You can use `numValue` for the end value, or create a separate variable for it.
  
    if (startNum && endNum && startNum <= endNum) {
      // Loop through all numbers from startNum to endNum
      for (let i = startNum; i <= endNum; i++) {
        setTableRows((prevRows) => [
          ...prevRows,
          { letter: value, num: i.toString(), count: countValue, amount: amount.toString() },
        ]);
      }
    } else {
      // If no valid range, add just the starting number
      setTableRows((prevRows) => [
        ...prevRows,
        { letter: value, num: numValue3, count: countValue, amount: amount.toString() },
      ]);
    }
  
    // Clear the inputs after adding to the table
    setNumValue3('');
    setCountValue('');
  };
  
  // Function to handle clicking "any" checkbox
  const handleAnyCheckboxChange = () => {
    setIsEndVisible(!isEndVisible); // Toggle visibility of "end" input field
  };


  // Function to delete a random row from the table
  const handleDeleteRandomRow = () => {
    const randomIndex = Math.floor(Math.random() * tableRows.length);
    setTableRows((prevRows) => prevRows.filter((_, index) => index !== randomIndex));
  };


  // Function to handle paste
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText(); // Read clipboard content
  
      // Match format `num=operationcount`, supporting operators like *, -, +, etc.
      const matches = text.match(/(\d+)([+\-*\/])(\d+)/g);
  
      if (matches) {
        matches.forEach(match => {
          const [num, operator, count] = match.match(/(\d+)([+\-*\/])(\d+)/).slice(1);
          const countNum = parseInt(count, 10);
  
          // Only add to the table if count is greater than 0
          if (countNum > 0) {
            let amount = 0;
  
            // Perform the operation based on the operator
            switch (operator) {
              case '+':
                amount = parseInt(num, 10) + countNum;
                break;
              case '-':
                amount = parseInt(num, 10) - countNum;
                break;
              case '*':
                amount = parseInt(num, 10) * countNum;
                break;
              case '/':
                amount = parseInt(num, 10) / countNum;
                break;
              default:
                console.error('Invalid operator');
            }
  
            setTableRows(prevRows => [
              ...prevRows,
              { letter: 'Super', num, count: countNum.toString(), amount: amount.toString() }
            ]);
          }
        });
      } else {
        console.error('No valid data in clipboard or incorrect format');
      }
    } catch (error) {
      console.error('Failed to read clipboard data:', error);
    }
  };
  
  const saveData = async () => {
    try {
      const response = await fetch('http://localhost:5000/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedTime,
          tableRows,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Data saved successfully. Custom ID:', data.customId);
  
        // Clear the table data
        setTableRows([]);  // Reset table rows
        setSelectedTime('');  // Reset selected time
      } else {
        throw new Error('Error saving data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  
  const handleSetCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSetChecked(e.target.checked);
  };
  

  return (
    <>
      
            <Navbar handlePaste={handlePaste} />

      <div className='drp'>
        <div className="dropdown">
          <a className="btn btn-light" href="#" data-bs-toggle="dropdown">
            {selectedTime}
          </a>
        
          <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#" onClick={() => handleTimeSelect('1PM')}>3PM</a></li>
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
            <input className='inputs'
              type="number"
              placeholder="Num"
              value={numValue}
              onChange={handleNumChange}
              ref={inputRef1}
            />
            <input className='inputs'
              type="number"
              placeholder="Count"
              value={countValue}
              onChange={(e) => setCountValue(e.target.value)} // Update count value
              ref={inputRef4}
            />
            <div className='chckbx'>
            <label> Set
  <input type="checkbox" /> 
</label>
<label>
any <input type="checkbox" /> 
</label>
              
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
            <input className='inputs'
              type="number"
              placeholder="Num"
              value={numValue2}
              onChange={handleNumChange2}
              ref={inputRef2}
            />
            <input className='inputs'
              type="number"
              placeholder="Count"
              value={countValue}
              onChange={(e) => setCountValue(e.target.value)} // Update count value for digit2
              ref={inputRef4}
            />
            <div className='chckbx'>
            <label> Set
  <input type="checkbox" /> 
</label>
<label>
any <input type="checkbox" /> 
</label>

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
        className="inputs"
        type="number"
        placeholder="Num"
        value={numValue3}
        onChange={handleNumChange3}
        ref={inputRef3}
      />
      <input 
        className="inputs"
        type="number"
        placeholder="End"
        value={numValue} // This will be used for the end value
        onChange={(e) => setNumValue(e.target.value)}
      />
      <input 
        className="inputs"
        type="number"
        placeholder="Count"
        value={countValue}
        onChange={(e) => setCountValue(e.target.value)} 
        ref={inputRef4}
      />
      <div className="chckbx">
        <label>
          Set
          <input type="checkbox" onChange={handleSetCheckboxChange} />
        </label>
        <label>
          any
          <input type="checkbox" />
        </label>
      </div>
    </div>
    <div className="type">
      <button 
        type="button" 
        className="btn btn-success" 
        onClick={() => handleDigit3ButtonClick('SUPER')}
      >
        SUPER
      </button>
      <button 
        type="button" 
        className="btn btn-success" 
        onClick={() => handleDigit3ButtonClick('BOX')}
      >
        BOX
      </button>
      <button 
        type="button" 
        className="btn btn-dark gray" 
        onClick={() => handleDigit3ButtonClick('All')}
      >
        All
      </button>
    </div>
  </div>
)}

  


{/* 
      <ul>
        <li> <Link to='/sales'>sales report</Link></li>
        <li> <Link to='/winning'>winning</Link></li>
        <li> <Link to='/more'>more</Link></li>
        <li> <Link to='/netpay'>net pay</Link></li>
        <li> <Link to='/pnl'>profit and loss</Link></li>
        <li> <Link to='/countreport'>count report</Link></li>

        

      </ul> */}

<button className="btn-save" onClick={saveData}>Save</button>

      <div className="table-container-home">
        <h1 className="tamount">
          Total: {tableRows.reduce((total, row) => total + (parseInt(row.amount, 10) || 0), 0)}
        </h1>
        <table className="table">
          <tbody>
          {tableRows
  .slice() // Create a copy of the tableRows array
  .reverse() // Reverse the order of the rows
  .map((row, index) => (
    <tr
      key={index}
      style={
        row.num.length === 3
          ? { backgroundColor: 'green' }
          : row.num.length === 2
          ? { backgroundColor: 'blue' }
          : {}
      }
    >
      <td>{row.letter}</td>
      <td>{row.num}</td>
      <td>{row.count}</td>
      <td>{row.amount}</td>
      <td>
        <IconTrash stroke={2} onClick={handleDeleteRandomRow} />
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
