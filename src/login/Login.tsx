import  { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './login.css'

const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate to the next page
  const handleLogin = () => {
    if (username === 'sas' && password === 'pops') {
      navigate('/home'); // Redirect to home page on successful login
    } else {
      alert("Invalid username or password.");
    }
  };
  
  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
