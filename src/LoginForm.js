import React, { useState } from 'react';

const LoginForm = ({ users, onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === credentials.email && user.password === credentials.password);
    if (user) {
      if (user.blocked) {
        alert('Your account has been blocked. Please contact support.');
      } else {
        onLogin(user);
      }
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Login Form</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input type="email" className="form-control" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;