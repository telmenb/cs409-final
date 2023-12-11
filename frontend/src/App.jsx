import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Carousel from './pages/Carousel';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserContext } from './contexts/UserContext';

function App() {
  const { username } = useContext(UserContext);
  return (
    <div className="App">
      <BrowserRouter basename="/geoquizzr-app">
        {username && <Navbar />}
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={username ? <Home /> : <Login />}
            />
          </Routes>
          <Routes>
            <Route
              path="/carousel"
              element={username ? <Carousel /> : <Login />}
            />
          </Routes>
          <Routes>
            <Route
              path="/login"
              element={username ? <Home /> : <Login />}
            />
          </Routes>
          <Routes>
            <Route
              path="/register"
              element={username ? <Home /> : <Register />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
