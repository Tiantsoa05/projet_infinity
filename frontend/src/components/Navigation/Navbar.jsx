/* eslint-disable react/prop-types */
import { useState } from 'react';
import { 
  Menu, 
  X, 
  Globe, 
  BookOpen, 
  Settings, 
  LogOut 
} from 'lucide-react';

function Navbar({ 
  currentLanguage = null, 
  userProfile = null, 
  onLogout 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { 
      icon: BookOpen, 
      label: "Mes Cours", 
      action: () => {/* Navigation vers mes cours */} 
    },
    { 
      icon: Globe, 
      label: "Changer de Langue", 
      action: () => {/* Retour à la sélection de langue */} 
    },
    { 
      icon: Settings, 
      label: "Paramètres", 
      action: () => {/* Navigation vers paramètres */} 
    }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {currentLanguage && (
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-3xl mr-2">{currentLanguage.icon}</span>
              <span className="text-blue-800 font-medium">
                {currentLanguage.name}
              </span>
            </div>
          )}
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button 
              key={item.label}
              onClick={item.action}
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <item.icon className="mr-2" size={20} />
              {item.label}
            </button>
          ))}

          {/* Profil Utilisateur */}
          {userProfile && (
            <div className="flex items-center space-x-4">
              <img 
                src={userProfile.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
              <span className="font-medium">{userProfile.name}</span>
              <button 
                onClick={onLogout}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Se déconnecter"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-blue-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left flex items-center py-2 hover:bg-blue-50 rounded"
              >
                <item.icon className="mr-3" size={20} />
                {item.label}
              </button>
            ))}

            {/* Mobile User Section */}
            {userProfile && (
              <div className="border-t pt-3 space-y-2">
                <div className="flex items-center">
                  <img 
                    src={userProfile.avatar || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full mr-3 border-2 border-blue-500"
                  />
                  <div>
                    <p className="font-medium">{userProfile.name}</p>
                    <p className="text-sm text-gray-500">{userProfile.email}</p>
                  </div>
                </div>
                <button 
                  onClick={onLogout}
                  className="w-full text-left flex items-center text-red-500 hover:text-red-700"
                >
                  <LogOut className="mr-3" size={20} />
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;