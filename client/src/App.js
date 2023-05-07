import {BrowserRouter, Routes, Route}  from 'react-router-dom';
import LoginRegistration from './Components/LoginRegistration';

function App() {
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginRegistration />}/>
            </Routes>
        </BrowserRouter>
    </>
    );
}

export default App;
