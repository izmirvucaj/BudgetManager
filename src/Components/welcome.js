import React, { useState, useEffect } from 'react';
import { Button, Drawer, Menu } from 'antd';
import { MenuOutlined, AppstoreOutlined, CalendarOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Calendar from './Calendar';
import axios from 'axios';
import Time from './timeline';
import "./welcome.css";

const Welcome = () => {
  const{state}=useLocation();
  const user=state?.user;

  const [open, setOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('profile');
  const navigate = useNavigate();

  

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (e) => {
    if (e.key === 'signout') {
      navigate('/');
    } else {
      setSelectedMenuItem(e.key);
      setOpen(false);
    }
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'profile':
        return <Profile user={user}/>;
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'calendar':
        return <Calendar user={user}/>;
        case 'timeline':
          return <Time user={user}/>;
      default:
        return <p>Select an option from the menu.</p>;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Button
        type="primary"
        onClick={showDrawer}
        style={{ position: 'absolute', top: 15, left: 20 }}
        icon={<MenuOutlined />}
      />
      <Drawer
        title={user.username}
        placement="left"
        onClose={onClose}
        open={open}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        <Menu onClick={handleMenuClick} mode="vertical" className="custom-menu">
          <Menu.Item key="profile" icon={<UserOutlined />}>Profile</Menu.Item>
          <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>Dashboard</Menu.Item>
          <Menu.Item key="calendar" icon={<CalendarOutlined />}>Calendar</Menu.Item>
          <Menu.Item key="timeline" icon={<CalendarOutlined />}>Time Line</Menu.Item>
          <Menu.Item key="signout" icon={<PoweroffOutlined />}>Sign Out</Menu.Item>
        </Menu>
      </Drawer>
      <div style={{ marginLeft: open ? 320 : -50, padding: 70, flexGrow: 1 }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Welcome;
