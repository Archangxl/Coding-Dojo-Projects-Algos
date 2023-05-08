import {BrowserRouter, Routes, Route}  from 'react-router-dom';
import Registration from './Components/Registration';
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';
import { useState } from 'react';

function App() {
    const [userIdCookies, setUserIdCookies] = useState("");
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login userIdToken={userIdCookies} setUserIdToken={setUserIdCookies} />} />
                <Route path='/register' element={<Registration />}/>
                <Route path='/dashboard' element={<Dashboard userIdCookies={userIdCookies} setUserIdCookies={setUserIdCookies} />} />
            </Routes>
        </BrowserRouter>
    </>
    );
}

export default App;
