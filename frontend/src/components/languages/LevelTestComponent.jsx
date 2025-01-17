/* eslint-disable react/prop-types */
import{ useState } from 'react';
import { LEVEL_TEST } from '../../constants/levelTest';
import { ArrowLeft } from 'lucide-react';

function LevelTestComponent({ 
  selectedLanguage, 
  onLevelTestComplete ,
  back
}) {
  const [levelTestAnswers, setLevelTestAnswers] = useState({});

  const handleLevelTestAnswer = (question, answer) => {
    setLevelTestAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  const calculateLevel = () => {
    onLevelTestComplete(levelTestAnswers);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="align">
        <button
          className="text-blue-600 px-4 py-2 rounded-md float-left mb-16 text-xl"
          onClick={back}
        >
          <ArrowLeft size={40} color='black'/>
        </button>
        <h2 className="text-3xl font-bold text-center mb-8">
          Test de niveau en <span className="text-blue-600">{selectedLanguage.name}</span>
        </h2>
      </div>
      {Object.entries(LEVEL_TEST).map(([level, questions]) => (
        <div key={level} className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 capitalize">{level}</h3>
          {questions.map((q, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="mb-4">{q.question}</p>
              {q.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  onClick={() => handleLevelTestAnswer(q.question, option)}
                  className={`
                    w-full text-left p-2 mb-2 rounded 
                    ${levelTestAnswers[q.question] === option 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white hover:bg-blue-100'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          ))}
        </div>
      ))}
      <div className="text-center">
        <button 
          onClick={calculateLevel}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Soumettre
        </button>
      </div>
    </div>
  );
}

export default LevelTestComponent;