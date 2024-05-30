import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users, type, closeOverlay }) => {
  return (
    <div className="user-list">
      {users.length ? (
        users.map((user) => (
          <div key={user.id}
          className="user-item-container">
            <Link
              to={`/Profile/${user.id}`}
              className="user-item"
              onClick={closeOverlay} 
            >
              <img
                src={`http://localhost:5000${user.profilePicture}`}
                alt={`${user.username} profile pic`}
                className="user-pic"
              />
              <span>{user.username}</span>
            </Link>
            <button className='box-btn'>remove</button>
          </div>
        ))
      ) : (
        <p className='user-item'>No {type}.</p>
      )}
    </div>
  );
};

export default UserList;
