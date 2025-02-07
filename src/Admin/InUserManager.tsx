import  { FC } from 'react';
import './inUser.css'
import { IconTrash } from '@tabler/icons-react';
import { IconSettingsCog } from '@tabler/icons-react';
import { IconPlus } from '@tabler/icons-react';interface userProps {
  
}

const user: FC<userProps> = ({}) => {
  return (
    <>
      <div className='head'>
        <h2>user</h2>
        <h2>active</h2>
        <h2>com.</h2>
        <h2>del.</h2>
      </div>

      <div className='users'>
        <h2>user1</h2>
        <input type="checkbox" />
              <IconSettingsCog stroke={2} />
                <IconTrash stroke={2} /> 
             </div>

<div className='createuser'>
    
    
<IconPlus stroke={2} /></div>
    </>
  );
};

export default user;