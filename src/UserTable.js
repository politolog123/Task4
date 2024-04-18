import React, { useState, useEffect } from 'react';

const UserTable = ({ users, onDelete, currentUser, onLogout, setUsers }) => {
  const [lastLoginTime, setLastLoginTime] = useState(currentUser.lastLoginTime);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxChange = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter(u => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleBlockSelected = () => {
    const updatedUsers = users.map(user => {
      if (selectedUsers.includes(user)) {
        return { ...user, blocked: true };
      }
      return user;
    });
    setUsers(updatedUsers);
  
    const allUsersSelected = selectedUsers.length === users.length;
    const currentUserSelected = selectedUsers.includes(currentUser);
  
    // We check if only the current user is selected and he is already blocked, or if all users are selected including the current one
    if ((currentUserSelected && currentUser.blocked) || allUsersSelected) {
      onLogout(); // Logging out of the system
    }
    
    // Checking again after updating users
    const allUpdatedUsersSelected = updatedUsers.length === users.length && updatedUsers.every(user => user.blocked);
    const currentUserUpdated = updatedUsers.find(user => user.id === currentUser.id);
    if ((currentUserUpdated && currentUserUpdated.blocked) || allUpdatedUsersSelected) {
      onLogout(); // Logging out of the system
    }
  };
  
  
  const handleUnblockSelected = () => {
    const updatedUsers = users.map(user => {
      if (selectedUsers.includes(user)) {
        return { ...user, blocked: false };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleDeleteSelected = () => {
    const isCurrentUserSelected = selectedUsers.includes(currentUser);
    onDelete(selectedUsers);
  
    // Checking if the current user is being deleted
    if (isCurrentUserSelected) {
      onLogout(); // Logging out of the system
    }
  };

  // Updating the last login time when currentUser changes
  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    const lastLoginTime = `${hours}:${minutes}:${seconds}`;
    setLastLoginTime(lastLoginTime);
  }, [currentUser]);

  return (
    <div className="container mt-5">
      <h2>User Table</h2>
      <div className="mb-3 d-flex justify-content-end">
        <button className="btn btn-primary mr-2" onClick={handleBlockSelected}>Block Selected</button>
        <button className="btn btn-secondary mr-2" onClick={handleUnblockSelected}>Unblock Selected</button>
        <button className="btn btn-danger" onClick={handleDeleteSelected}>Delete Selected</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Registration Date</th>
              <th scope="col">Last Login Time</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
              <th scope="col">Blocked</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} style={{ backgroundColor: user.blocked ? '#eee' : 'transparent' }}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.registrationDate}</td>
                <td>{user === currentUser ? lastLoginTime : user.lastLoginTime}</td>
                <td>{user.id === currentUser.id ? 'Active' : 'Inactive'}</td>
                <td>{user.blocked ? 'Blocked' : 'Active'}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user)}
                    onChange={() => handleCheckboxChange(user)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {currentUser && (
        <div className="row">
          <div className="col-md-12">
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;