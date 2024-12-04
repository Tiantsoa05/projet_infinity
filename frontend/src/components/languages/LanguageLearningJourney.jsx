import { useState } from 'react';
import LevelTestComponent from './LevelTestComponent';
import LevelResult from './LevelResult';
import LanguageSelection from './LanguageSelection';
import { calculateLevel } from '../../constants/levelTest';
import Navbar from '../Navigation/Navbar';

function LanguageLearningJourney() {
  const [step, setStep] = useState('language-selection');
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [finalLevel, setFinalLevel] = useState(null);

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setStep('level-test');
  };

  const handleLevelTestComplete = (levelTestAnswers) => {
    const level = calculateLevel(levelTestAnswers);
    setFinalLevel(level);
    setStep('level-result');
  };

  const startLearningJourney = () => {
    // Redirection vers le parcours d'apprentissage
    console.log(`Début du parcours pour ${selectedLanguage.name} - Niveau ${finalLevel}`);
  };

  const currentLanguage = {
    id: 'en',
    name: 'Anglais',
    icon: '🇬🇧'
  };

  const userProfile = {
    name: 'Jean Dupont',
    email: 'jean@example.com',
    avatar: '/path-to-avatar.jpg'
  };

  const handleLogout = () => {
    // Logique de déconnexion
  };
  return (
    <div>
    <Navbar 
      currentLanguage={currentLanguage}
      userProfile={userProfile}
      onLogout={handleLogout}
    />
    
      {step === 'language-selection' && (
        <LanguageSelection onSelectLanguage={selectLanguage} />
      )}
      {step === 'level-test' && (
        <LevelTestComponent 
          selectedLanguage={selectedLanguage} 
          onLevelTestComplete={handleLevelTestComplete}
        />
      )}
      {step === 'level-result' && (
        <LevelResult 
          selectedLanguage={selectedLanguage}
          finalLevel={finalLevel}
          onStartLearningJourney={startLearningJourney}
        />
      )}
    </div>
  );
}

export default LanguageLearningJourney;