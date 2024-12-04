/* eslint-disable react/prop-types */
import { Globe } from 'lucide-react';

function LevelResult({ 
  selectedLanguage, 
  finalLevel,
  onStartLearningJourney 
}) {
  const getLevelDescription = () => {
    switch (finalLevel) {
      case 'debutant':
        return "Parfait pour commencer votre apprentissage !";
      case 'intermediaire':
        return "Vous avez de solides bases à développer.";
      case 'avance':
        return "Vous êtes prêt pour des défis linguistiques !";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-4xl font-bold mb-6">
        Votre niveau en <span className="text-blue-600">{selectedLanguage.name}</span>
      </h2>
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-lg p-8">
        <Globe className="mx-auto text-blue-600 mb-6" size={80} />
        <h3 className="text-2xl font-semibold capitalize mb-4">
          Niveau {finalLevel}
        </h3>
        <p className="text-gray-600 mb-6">
          {getLevelDescription()}
        </p>
        <button 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          onClick={onStartLearningJourney}
        >
          Commencer mon parcours
        </button>
      </div>
    </div>
  );
}

export default LevelResult;