import React from 'react';
import './navbar.css'; // Import the corresponding CSS file
import logo from '../assets/6075689.webp'
import { IconAlignRight } from '@tabler/icons-react';
import { IconClipboardCopy } from '@tabler/icons-react';
import { IconCamera } from '@tabler/icons-react';


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
    
      <button><IconClipboardCopy stroke={2} /></button>
      <button><IconCamera stroke={2} /></button>
      <button><IconAlignRight stroke={2} /></button>

     
    </nav>
  );
}

export default Navbar;
