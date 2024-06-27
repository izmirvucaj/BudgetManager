import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import Welcome from './Components/welcome';
import './App.css';

function App() {
  const [username, setUsername] = useState(''); // Kullanıcının adını saklamak için durum

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm setUsername={setUsername} />} />
          <Route path="/welcome" element={<Welcome username={username} />} /> {/* Kullanıcı adını prop olarak geçin */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
