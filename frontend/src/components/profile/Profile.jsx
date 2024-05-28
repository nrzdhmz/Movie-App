import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <Link to="/Profile">
        <div className='profileBtn'>
          <img src="https://www.gravatar.com/avatar/?d=mp&s=55" alt="profile pic" />
        </div>
    </Link>
  )
}

export default Profile