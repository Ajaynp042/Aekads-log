import React, { useDebugValue, useState } from 'react';
import '../styles/App.css';
import background from '../assets/background.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [isOtpSent, setIsOtpSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('OTP sent to user');
    setIsOtpSent(true);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault(); 
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember Password:', rememberPassword);
    console.log('OTP:', otp.join(''));
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus(); 
    }
  };

  const handleResendOtp = () => {
    console.log('Resend OTP clicked');
    // Add your resend OTP logic here 
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <div className="left">  
        <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/Aek Ads Logo (1).svg`} alt="Logo" className="logo" />
          <p>Gujarat's largest Digital Screen Network</p>
        </div>
      </div>
      <div className="login-form">
        {!isOtpSent ? (
          <>
            <h2>Login to Account</h2>
            <p>Please enter your email and password to continue</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                />
                <a href="/forgot-password" className="forgot-password">
                  Forgot Password?
                </a>
              </div>
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="rememberPassword"
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                  style={{ width: '17px', height: '17px' }}
                />
                <label htmlFor="rememberPassword">Remember Password</label>
              </div>
              <button type="submit" className="sign-in-button">
                Sign In
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>OTP Verification</h2>
            <p>Enter the verification code we just sent to your Email ID xyz@gmail.com</p>
            <form onSubmit={handleOtpSubmit}>
              <div className="otp-inputs">
                {otp.map((data, index) => (
                  <input
                    type="text"
                    name="otp"
                    maxLength="1"

                    key={index}
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                ))}
              </div>
              <p className="resend-otp">
                Didn't receive code? <a href="#" onClick={handleResendOtp}>Resend</a>
              </p>
              <button type="submit" className="verify-button">
                Verify
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;