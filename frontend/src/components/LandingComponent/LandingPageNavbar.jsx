import{Menu, X} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LandingPageNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleClick = () => {
    navigate("/langue");
  }

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <img 
          src="/logo.png" 
          alt="Infinity" 
          className="h-10 w-auto"
        />
        <span className="ml-2 text-xl font-bold text-blue-600">
          Infinity
        </span>
      </div>

      {/* Menu desktop */}
      <div className="hidden md:flex space-x-6">
        <a href="#features" className="text-gray-700 hover:text-blue-600">
          Fonctionnalités
        </a>
        <a href="#prix" className="text-gray-700 hover:text-blue-600">
          Tarifs
        </a>
        <a href="#temoignages" className="text-gray-700 hover:text-blue-600">
          Témoignages
        </a>
      </div>

      {/* Boutons d'action */}
      <div className="hidden md:flex items-center space-x-4">
      <button onClick={handleLogin} className="w-full text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md">
              Connexion
            </button>
        <button onClick={handleClick} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Commencer
        </button>
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden">
        <button 
          onClick={toggleMenu} 
          className="text-gray-500 hover:text-blue-600"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>

    {/* Menu mobile */}
    {isMenuOpen && (
      <div className="md:hidden bg-white shadow-md">
        <div className="px-4 pt-2 pb-4 space-y-3">
          <a 
            href="#features" 
            className="block text-gray-700 hover:text-blue-600"
          >
            Fonctionnalités
          </a>
          <a 
            href="#prix" 
            className="block text-gray-700 hover:text-blue-600"
          >
            Tarifs
          </a>
          <a 
            href="#temoignages" 
            className="block text-gray-700 hover:text-blue-600"
          >
            Témoignages
          </a>
          <div className="space-y-2 pt-2 border-t">
            <button className="w-full text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md">
              Connexion
            </button>
            <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Commencer
            </button>
          </div>
        </div>
      </div>
    )}   
    </nav>
  )
}

export default LandingPageNavbar
