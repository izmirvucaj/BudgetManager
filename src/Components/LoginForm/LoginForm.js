import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import { Form, Input, Button, message } from 'antd';
import './LoginForm.css';
import axios from 'axios';
const LoginForm = ({ setUsername }) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const {username,password}=values;
    const apiUrl = 'https://v1.nocodeapi.com/izmir123456/google_sheets/AEYbdWLtNngNVUkY?tabId=Sheet1';

    try {
      const response = await axios.get(apiUrl);
      const allData = response.data.data;
      const user = allData.find(user => user.username === username && user.password === password);

      if (user) {
        setSuccess(true);
        message.success('Login Successful');
        setUser(user);
        navigate('/welcome',{state:{user:user}}); // Başarılı giriş sonrası yönlendirme
        console.log(user.username);
      } else {
        setSuccess(false);
        setError('Invalid username or password');
        message.error('Invalid username or password');
      }
      } catch (error) {
      console.error('Failed to fetch data', error);
      message.error('Veriler alınamadı. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <div className='wrapper'>
      <div className='form-container'>
        <Form onFinish={handleSubmit}>
          <h1>Login</h1>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input
              prefix={<FaUser className='icon' />}
              placeholder='Username'
        
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password
              prefix={<FaLock className='icon' />}
              placeholder='Password'
              
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Form.Item>
            <Button type="primary" htmlType="submit" className='login-form-button'>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
