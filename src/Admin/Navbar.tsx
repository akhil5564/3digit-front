import React, { useState } from 'react';
import './navbar.css'; // Import the corresponding CSS file
import logo from '../assets/6075689.webp';
import { IconAlignRight } from '@tabler/icons-react';
import { IconClipboardCopy } from '@tabler/icons-react';
import { IconCamera } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false); // State to control dropdown visibility
  const navigate = useNavigate(); // Initialize navigate

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <button><IconClipboardCopy stroke={2} /></button>
      <button><IconCamera stroke={2} /></button>

      {/* Toggle dropdown button */}
      <button onClick={toggleDropdown}>
        <IconAlignRight stroke={2} />
      </button>

      {/* Dropdown menu */}
      {isDropdownVisible && (
        <div className="dropdown">
          <ul>
            {/* Using navigate to go to '/sales' when clicked */}
            <li onClick={() => navigate('/sales')} className="dropdown-item">
              SALES REPORT
            </li>
            <li onClick={() => navigate('/sales')} className="dropdown-item">
            WINNER'S REPORT</li>
            <li>PROFIT AND LOSS</li>
            <li>NET PAY</li>
            <li>COUNT REPORT</li>
            <li>RESULT</li>
            <li onClick={() => ("isLoggedIn") && navigate("/")}>LOGOUT</li>
            <li>MORE</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
