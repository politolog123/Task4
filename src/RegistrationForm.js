import React, { useState } from 'react';

const RegistrationForm = ({ onUserRegistration }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...user };
    onUserRegistration(newUser);
    setUser({
      username: '',
      email: '',
      password: ''
    });
    setRegistrationSuccess(true); // Устанавливаем состояние успешной регистрации
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Registration Form</h2>
          {registrationSuccess && <p className="text-success">Регистрация прошла успешно!</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" name="username" value={user.username} onChange={handleChange} placeholder="Username" />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Registration</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;