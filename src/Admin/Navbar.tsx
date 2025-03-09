import  { useState } from 'react';
import './navbar.css';
import logo from '../assets/6075689.webp';
import { IconAlignRight, IconClipboardCopy, IconCamera } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

// Explicitly type the handlePaste function in NavbarProps interface
interface NavbarProps {
  handlePaste: () => void;
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

      {/* Camera button to start or stop the camera */}
      <button
      >
        <IconCamera stroke={2} />
      </button>


      {/* Dropdown menu */}
      <button className='nbtn' onClick={toggleDropdown}>
        <IconAlignRight stroke={2} />
      </button>

      {/* Dropdown content */}
      {isDropdownVisible && (
        <div className="dropdown-1">
          <ul>
            <li><Link to='/sales'>SALES REPORT</Link></li>
            <li><Link to='/winning'>WINNER'S REPORT</Link></li>
            <li><Link to='/pnl'>PROFIT AND LOSS</Link></li>
            <li><Link to='/netpay'>NET PAY</Link></li>
            <li><Link to='/countreport'>COUNT REPORT</Link></li>
            <li><Link to='/more'>MORE</Link></li>
            <li><Link to='/result'>Result</Link></li>
            <li><Link to='/logout'>LOGOUT</Link></li>
          </ul>
        </div>
      )}

      
    </nav>
  );
};

export default Navbar;
