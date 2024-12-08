import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LanguageLearningJourney from "./components/languages/LanguageLearningJourney";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/langue" element={<LanguageLearningJourney />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Route>
      </Routes> 
    </Router>
  );
}

export default App;

const useAuth = () => {

  const token = localStorage.getItem('token');
  
  return !!token;
};

const ProtectedRoute = () => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};