import  { FC } from 'react';
import { IconSticker2 } from '@tabler/icons-react';
import './createuser.css';  // Make sure to import the CSS file

interface createuserProps {}

const createuser: FC<createuserProps> = ({}) => {
  return (
    <div className="createuser-container">
      <div className="nameandpass">
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
      </div>

      <button>
        <IconSticker2 stroke={2} />
      </button>
    </div>
  );
};

export default createuser;
