import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import useThemeCustomizer from './hooks/useThemeCustomizer';
import useConfig from './hooks/useConfig';
import { UniversalProvider} from './context/UniversalContext';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerification from './pages/EmailVerification';
import Homepage from './pages/HomePage';

function App() {
  useConfig();
  useThemeCustomizer();
  return (
    <UniversalProvider>
       
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:email" element={<ResetPassword/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<EmailVerification/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Homepage/>} />
        <Route path="/dashboard/*" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
    </UniversalProvider>
  );
}

export default App;