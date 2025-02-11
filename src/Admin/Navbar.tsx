import React, { useState } from 'react';
import './navbar.css';
import logo from '../assets/6075689.webp';
import { IconAlignRight, IconClipboardCopy, IconCamera } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  handlePaste: () => void; // Define the type for the handlePaste function prop
}

const Navbar: React.FC<NavbarProps> = ({ handlePaste }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button className='nbtn' onClick={handlePaste}>
      <IconClipboardCopy stroke={2} />
      </button>
      <button className='nbtn' ><IconCamera stroke={2} /></button>

      {/* Toggle dropdown button */}
      <button className='nbtn' onClick={toggleDropdown}>
        <IconAlignRight stroke={2} />
      </button>

     

      {/* Dropdown menu */}
      {isDropdownVisible && (
        <div className="dropdown-1">
          <ul>
            <li><Link to='/sales'>SALES REPORT</Link></li>
            <li><Link to='/winning'>WINNER'S REPORT</Link></li>
            <li><Link to='/pnl'>PROFIT AND LOSS</Link></li>
            <li><Link to='/netpay'>NET PAY</Link></li>
            <li><Link to='/countreport'>COUNT REPORT</Link></li>
            <li><Link to='/more'>MORE</Link></li>
            <li><Link to='/logout'>LOGOUT</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
