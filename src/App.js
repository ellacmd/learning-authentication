import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './store/auth-context';
import { useContext } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
    const ctx = useContext(AuthContext);
    return ( 
        <Layout>
            <Routes>
                <Route path='/' element={ctx.isLoggedIn && <HomePage />} />
                <Route path='/auth' element={<AuthPage />} />
                <Route
                    path='profile'
                    element={!ctx.isLoggedIn ? <Navigate to="/auth"/> : <UserProfile/>}
                />
                <Route path='*' element={<Navigate replace to="/auth" />} />
                  
            </Routes>
        </Layout>
    );
}

export default App;
