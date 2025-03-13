import { FC, useState, useRef, useEffect, ChangeEvent } from 'react';
import { IconTrash } from '@tabler/icons-react';
import '../Main/home.css';
import Snavbar from './Snavbar';

const Home: FC = () => {
  const [selectedTime, setSelectedTime] = useState<string>('3PM');
  const [visibleDigit, setVisibleDigit] = useState<string | null>(null);
  const [numValue, setNumValue] = useState<string>('');
  const [numValue2, setNumValue2] = useState<string>('');
  const [numValue3, setNumValue3] = useState<string>('');
  const [countValue, setCountValue] = useState<string>(''); // Track count value for all digits
  const [tableRows, setTableRows] = useState<{ letter: string; num: string; count: string; amount: string }[]>([]); // Track letter, num, count, and amount
  const [setChecked, setSetChecked] = useState<boolean>(false); // Track the "Set" checkbox state
  const [isSaving, setIsSaving] = useState<boolean>(false); // Track if saving is in progress


  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);
  const inputRef3 = useRef<HTMLInputElement | null>(null);
  const inputRef4 = useRef<HTMLInputElement | null>(null);

  const generatePermutations = (str: string) => {
    const results: string[] = [];
  
    const permute = (arr: string[], memo: string[] = []) => {
      if (arr.length === 0) {
        results.push(memo.join(''));
        return;
      }
  
      for (let i = 0; i < arr.length; i++) {
        const currArr = arr.slice();
        const next = currArr.splice(i, 1);
        permute(currArr, memo.concat(next));
      }
    };
  
    permute(str.split('')); // Convert string to array of characters
    return [...new Set(results)]; // Remove duplicates
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
    if (value.length > 1) value = value.slice(0, 1); // Ensure only one digit is allowed
    setNumValue(value);
  
    // If a digit has been entered, focus on the count input
    if (value.length === 1 && inputRef4.current) {
      inputRef4.current.focus(); // Focus on the count input when the digit is complete
    }
  };
  
  const handleNumChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 2) value = value.slice(0, 2);
    setNumValue2(value);


    if (value.length === 2 && inputRef4.current) inputRef4.current.focus();

    if (value.length === 2 && inputRef3.current) inputRef3.current.focus();
  };

  const handleNumChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 3) value = value.slice(0, 3);
    setNumValue3(value);

    if (value.length === 3 && inputRef4.current) inputRef4.current.focus();
  };

  useEffect(() => {
    if (visibleDigit === 'digit1' && inputRef1.current) {
      inputRef1.current.focus(); // Focus on digit1 input
    } else if (visibleDigit === 'digit2' && inputRef2.current) {
      inputRef2.current.focus(); // Focus on digit2 input
    } else if (visibleDigit === 'digit3' && inputRef3.current) {
      inputRef3.current.focus(); // Focus on digit3 input
    }
  }, [visibleDigit]); // Effect runs when visibleDigit changes
  
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
  
    const startNum = parseInt(numValue3, 10);
    const endNum = parseInt(numValue, 10);
  
    if (startNum && endNum && startNum <= endNum) {
      for (let i = startNum; i <= endNum; i++) {
        setTableRows((prevRows) => [
          ...prevRows,
          { letter: value, num: i.toString(), count: countValue, amount: amount.toString() },
        ]);
      }
    } else {
      setTableRows((prevRows) => [
        ...prevRows,
        { letter: value, num: numValue3, count: countValue, amount: amount.toString() },
      ]);
    }
  
    if (setChecked) {  // Check if the 'Set' checkbox is checked
      const permutations = generatePermutations(numValue3); // Generate permutations of the entered number
      permutations.forEach(perm => {
        setTableRows((prevRows) => [
          ...prevRows,
          { letter: value, num: perm, count: countValue, amount: amount.toString() }, // Add permutations to the table
        ]);
      });
    }
  
    // Add data for "SUPER" and "BOX" if 'All' is selected
    if (value === 'All') {
      // Add SUPER data
      setTableRows((prevRows) => [
        ...prevRows,
        { letter: 'SUPER', num: numValue3, count: countValue, amount: amount.toString() },
      ]);
      // Add BOX data
      setTableRows((prevRows) => [
        ...prevRows,
        { letter: 'BOX', num: numValue3, count: countValue, amount: amount.toString() },
      ]);
    }
  
    setNumValue3(''); // Reset input after processing
    setCountValue(''); // Reset count value after processing
  };
  
  
  
  
  // Function to handle clicking "any" checkbox


  // Function to delete a random row from the table
  const handleDeleteRandomRow = () => {
    const randomIndex = Math.floor(Math.random() * tableRows.length);
    setTableRows((prevRows) => prevRows.filter((_, index) => index !== randomIndex));
  };
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText(); // Read clipboard content
  
      // Match format `num=operationcount`, supporting operators like '=', '-', '*', etc.
      const matches = text.match(/(\d+)([=\-*\/])(\d+)/g); // Match num=operationcount, num-4, num*4, etc.
  
      if (matches) {
        matches.forEach(match => {
          // Ensure the match is not null before calling .match()
          const matchParts = match.match(/(\d+)([=\-*\/])(\d+)/);
  
          if (matchParts) {
            const [_, num, operator, count] = matchParts; // Destructure the match result
            const numValue = parseInt(num, 10);
            const countValue = parseInt(count, 10);
  
            let amount = 0;
  
            // Perform the operation based on the operator
            switch (operator) {
              case '=':
                amount = 10 * countValue; // If `=` then multiply num by count
                break;
              case '-':
                amount = 10 * countValue; // If `-` then subtract count from num
                break;
              case '*':
                amount = 10 * countValue; // If `*` then multiply num by count
                break;
              default:
                console.error('Invalid operator:', operator);
                return;
            }
  
            // Only add to the table if count is greater than 0
            if (countValue > 0) {
              setTableRows(prevRows => [
                ...prevRows,
                { letter: 'Super', num: numValue.toString(), count: countValue.toString(), amount: amount.toString() }
              ]);
            }
          } else {
            console.error('Invalid match format:', match);
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
      setIsSaving(true);
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
  
      console.log(`currentTime: ${currentTime}`);
      console.log(`currentHour: ${currentHour}, currentMinute: ${currentMinute}`);
      console.log(`selectedTime: ${selectedTime}`);
  
      let timeBlock: string;
  
      // Time validation based on selected time block
      if (selectedTime === '1PM' && (currentHour > 12 || (currentHour === 12 && currentMinute > 55))) {
        alert('Cannot save data after 12:59 PM for 1PM block!');
        return;
      } else if (selectedTime === '3PM' && currentHour === 15 && currentMinute > 0) {
        alert('Cannot save data after 3:02 PM for 3PM block!');
        return;
      } else if (selectedTime === '6PM' && (currentHour > 17 || (currentHour === 18 && currentMinute > 55))) {
        alert('Cannot save data after 6:05 PM for 6PM block!');
        return;
      } else if (selectedTime === '8PM' && (currentHour > 19 || (currentHour === 19 && currentMinute > 5))) {
        alert('Cannot save data after 8:05 PM for 8PM block!');
        return;
      } else {
        timeBlock = selectedTime;
      }
  
      console.log(`Final timeBlock: ${timeBlock}`);
  
      // Fixed username "kunjippa"
      const username = "kunjippa"; 
  
      // Save data to the server
      const response = await fetch('http://localhost:5000/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedTime: timeBlock,
          tableRows, // All the table rows to save
          username: username,  // Fixed username "kunjippa"
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Data saved successfully. Custom ID:', data.customId);
  
        // Reset data after successful save
        setTableRows([]);  // Reset table rows after saving
        setSelectedTime('');  // Clear selected time
      } else {
        const errorData = await response.json();
        
        // Check if the error is due to username already existing
        if (errorData.message === "Username already exists in data") {
          console.log("Username already exists, but continuing to save the data.");
          
          // Proceed with the save operation, ignoring the "already exists" error.
          // You could either proceed with a new save or overwrite the old data depending on the backend's implementation
          const forceSaveResponse = await fetch('http://localhost:5000/addData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              selectedTime: timeBlock,
              tableRows,
              username: username,
            }),
          });
  
          if (forceSaveResponse.ok) {
            const forceSaveData = await forceSaveResponse.json();
            console.log('Data overwritten successfully. Custom ID:', forceSaveData.customId);
          } else {
            console.error('Force save failed:', forceSaveResponse.status);
          }
        } else {
          console.error('Error response from server:', {
            status: response.status,
            statusText: response.statusText,
            responseBody: errorData,
          });
  
          alert(`There was an error saving the data: ${errorData.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('An unexpected error occurred while saving the data.');
    } finally {
      setIsSaving(false);
    }
  };
  
  
  
  
  
  
  
  
  
  const handleSetCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSetChecked(e.target.checked);
  
    if (e.target.checked) {
      let numToPermute = '';
  
      // Based on the currently visible digit, pick the right num value
      if (visibleDigit === 'digit1') numToPermute = numValue;
      if (visibleDigit === 'digit2') numToPermute = numValue2;
      if (visibleDigit === 'digit3') numToPermute = numValue3;
  
      if (numToPermute) {
        // Generate the permutations for the current num value
        const permutations = generatePermutations(numToPermute);
        console.log('Generated Permutations:', permutations);
  
        const existingNumbers = new Set(tableRows.map(row => row.num)); // Track existing numbers in the table
  
        // Add permutations to the table rows
        permutations.forEach((perm) => {
          // Only add the permutation if it is not already in the table
          if (!existingNumbers.has(perm)) {
            setTableRows((prevRows) => [
              ...prevRows,
              { letter: 'SET', num: perm, count: countValue, amount: '0' }, // You can calculate the amount based on your logic
            ]);
            existingNumbers.add(perm); // Mark this permutation as added
          }
        });
      }
    }
  };
  
  
  

  return (
    <>
      
            <Snavbar handlePaste={handlePaste} />

      <div className='drp'>
        <div className="dropdown">
          <a className="btn btn-light" href="#" data-bs-toggle="dropdown">
            {selectedTime}
          </a>
        
          <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#" onClick={() => handleTimeSelect('3PM')}>3PM</a></li>
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

<button 
  className="btn-save" 
  onClick={saveData}
  disabled={isSaving}  // Disable the button while saving
>
  {isSaving ? 'Saving...' : 'Save'}
</button>

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
