import { Check } from 'lucide-react';

function Pricing() {
  const plans = [
    {
      name: "Débutant",
      price: 0,
      features: [
        "Accès à 2 langues",
        "Leçons basiques",
        "Tests de niveau",
        "Support communautaire"
      ],
      recommended: false
    },
    {
      name: "Intérmédiaire",
      price: 60000,
      features: [
        "Accès illimité",
        "Cours avancés",
        "Conversations avec IA",
        "Suivi personnalisé",
        "Support prioritaire"
      ],
      recommended: true
    },
    {
      name: "Avancé",
      price: 100000,
      features: [
        "Formations sur mesure",
        "Langues spécialisées",
        "Coaching individuel",
        "Certification",
        "Support dédié"
      ],
      recommended: false
    }
  ];

  return (
    <section id="prix" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Nos <span className="text-blue-600">forfaits</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`
                bg-white p-6 rounded-lg shadow-md text-center 
                ${plan.recommended ? 'border-2 border-blue-600 transform scale-105' : ''}
              `}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {plan.name}
                {plan.recommended && (
                  <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Recommandé
                  </span>
                )}
              </h3>
              
              <div className="text-4xl font-bold text-blue-600 mb-6">
                {plan.price === 0 ? 'Gratuit' : `${plan.price}Ar/mois`}
              </div>
              
              <ul className="mb-6 space-y-3">
                {plan.features.map((feature) => (
                  <li 
                    key={feature} 
                    className="flex items-center justify-center text-gray-700"
                  >
                    <Check className="text-green-500 mr-2" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Choisir ce plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Pricing;