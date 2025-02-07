// src/pages/Login.tsx
import  { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Assuming you will create the required styles for this design

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in (this could be done by checking a token or session)
    if (localStorage.getItem('userLoggedIn')) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = () => {
    if (email && password) {
      // After successful login, set the logged-in status in localStorage
      localStorage.setItem('userLoggedIn', 'true');
      navigate('/home');
    } else {
      alert('Please fill in both email and password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-navbar">
        <h1 className="logo">NETFLIX</h1>
      </div>

      <div className="hero-section">
        <div className="hero-content">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <p>Ready to watch? Enter your email to create or restart your membership.</p>

          <div className="login-form">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" onClick={handleLogin}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
