import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes> 
    </Router>
  );
}

export default App;
