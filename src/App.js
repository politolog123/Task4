import React, { useState, useEffect } from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import UserTable from './UserTable';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(savedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleUserRegistration = (user) => {
    const newUser = {
      ...user,
      id: uuidv4(), // Generating a unique id
      registrationDate: new Date().toLocaleString(),
      lastLoginDate: null,
      status: 'Active'
    };
    setUsers([...users, newUser]);
  };
  const handleLogin = (user) => {
    // Set the status only for the current user
    user.status = 'Active';
  
    // Update the last login for the current user
    user.lastLoginDate = new Date().toLocaleString();
  
    // Updating the current user
    setCurrentUser(user);
  
    // Update users state to reflect changes
    setUsers(prevUsers => prevUsers.map(u => (u.id === user.id ? user : u)));
  };
  

  

  const handleDeleteUser = (usersToDelete) => {
    const remainingUsers = users.filter(user => !usersToDelete.includes(user));
    setUsers(remainingUsers);
  };

  const handleBlockUser = (userToBlock) => {
    const updatedUsers = users.map(user => {
      if (user.id === userToBlock.id) {
        return { ...user, blocked: !user.blocked };
      }
      return user;
    });
    setUsers(updatedUsers);
    if (currentUser && currentUser.id === userToBlock.id && !userToBlock.blocked) {
      handleLogout();
    }
  };
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <RegistrationForm onUserRegistration={handleUserRegistration} />
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <button onClick={handleLogout} className="btn btn-primary" title="You can leave">Logout</button>
          ) : (
            <LoginForm users={users} onLogin={handleLogin} />
          )}
        </div>
      </div>
      {currentUser && (
        <div className="row">
          <div className="col-md-12">
            <UserTable
              users={users}
              onDelete={handleDeleteUser}
              onBlock={handleBlockUser} // Passing the handleBlockUser function
              onLogin={handleLogin} // Passing the handleLogin function
              currentUser={currentUser}
              onLogout={handleLogout}
              setUsers={setUsers} //
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;