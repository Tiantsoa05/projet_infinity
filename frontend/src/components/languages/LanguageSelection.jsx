/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { LANGUAGES } from '../../constants/Languages';

function LanguageSelection({ onSelectLanguage }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Choisissez votre <span className="text-blue-600">langue d'apprentissage</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {LANGUAGES.map(language => (
          <div 
            key={language.id}
            onClick={() => onSelectLanguage(language)}
            className="bg-white border rounded-lg p-6 text-center cursor-pointer hover:shadow-xl transition-all"
          >
            <div className="text-6xl mb-4">{language.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{language.name}</h3>
            <p className="text-gray-600">{language.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelection;