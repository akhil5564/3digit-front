import  { FC } from 'react';
import './reporter.css'

interface ReporterProps {}

const Reporter: FC<ReporterProps> = ({}) => {
  // Example table data
  const tableData = [
    { id: 1, type: 'SUPER', Number: 525,count:'3', amnt: '30' },
    { id: 2, type: 'SUPER', Number: 730,count:'6', amnt: '60' },
    { id: 3, type: 'SUPER', Number: 835,count:'5', amnt: '50' },
    { id: 4, type: 'SUPER', Number: 410,count:'10', amnt: '100' },
  ];

  return (
    <>
      
      {/* Table structure */}
      <table  className="reporter-table">
        <thead>
        <tr>
            <th>Bill No:567</th>
            <th></th>

            <th>5/7/25</th>
            <th></th>
            <th></th>

            <th>4:10 pm</th>
            </tr>
          <tr>
            <th>username</th>
            <th>type</th>
            <th>num</th>
            <th>count</th>
            <th>amnt</th>
            <th>tamnt</th>
          </tr>
         
        </thead>
        <tbody>
          {/* Map over tableData to create rows */}
          {tableData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.type}</td>
              <td>{data.Number}</td>
              <td>{data.count}</td>
              <td>{data.amnt}</td>
              <td>{data.amnt}</td>


            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Reporter;
