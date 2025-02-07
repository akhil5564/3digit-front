import React, { FC } from 'react';
import './Usercom.css';  // Import the CSS file for styling

interface UsercomProps {}

const Usercom: FC<UsercomProps> = ({}) => {
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Commission</th>
          </tr>
        </thead>
        <tbody>
       <tr>
        <td>a</td>
        <td>b</td>
        <td>c</td>
        <td>ab</td>
        <td>bc</td>
        <td>ac</td>
        <td>super</td>
        <td>box</td>

       </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Usercom;
