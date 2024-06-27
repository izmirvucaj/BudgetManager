import React from 'react';
import { Typography, Card } from 'antd';
import './Profile.css'; 

const Profile = ({ user }) => (
  <div className="profile-container">
    <Card
      title={<Typography className="card-title">Profile</Typography>}
      bordered={false}
      className="card-container"
    >
      <p className="card-content">Name Surname: {user.username}</p>
      <p className="card-content">Age: {user.age}</p>
      <p className="card-content">Phone: {user.phone}</p>
      <p className="card-content">Email: {user.email}</p>
      <p className="card-content">Address: {user.ev}</p>
      <p className="card-content">Phone: {user.phone}</p>
    </Card>
  </div>
);

export default Profile;
