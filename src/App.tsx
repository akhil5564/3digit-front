import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Main/Home';
import Login from './login/Login';
import Salesreport from './Main/Salesreport';
import Winning from './Main/Winning';
import More from './Admin/More';
import Netpay from './Main/Netpay';
import Pnl from './Main/Pnl';
import Countreport from './Main/Countreport';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login Page Route */}
        <Route path="/home" element={<Home />} /> {/* Home Page Route */}
        <Route path="/sales" element={<Salesreport />} /> {/* Sales route */}
        <Route path="/winning" element={<Winning />} /> {/* Sales route */}
        <Route path="/more" element={<More/>} /> {/* Sales route */}
        <Route path="/netpay" element={<Netpay />} /> {/* Sales route */}
        <Route path="/pnl" element={<Pnl />} /> {/* Sales route */}
        <Route path="/countreport" element={<Countreport />} /> {/* Sales route */}






      </Routes>
    </Router>
  );
};

export default App;
