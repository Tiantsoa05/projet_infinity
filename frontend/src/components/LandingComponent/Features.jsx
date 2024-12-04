import { 
    Book, 
    Headphones, 
    MessageCircle, 
    Globe 
  } from 'lucide-react';
  
  function Features() {
    const features = [
      {
        icon: Book,
        title: 'Contenu Interactif',
        description: 'Des leçons dynamiques et engageantes avec des exercices variés.'
      },
      {
        icon: Headphones,
        title: 'Audio et Prononciation',
        description: 'Apprenez à prononcer comme un locuteur natif avec nos enregistrements.'
      },
      {
        icon: MessageCircle,
        title: 'Conversations Réelles',
        description: 'Pratiquez avec des locuteurs natifs et des IA conversationnelles.'
      },
      {
        icon: Globe,
        title: 'Immersion Culturelle',
        description: 'Découvrez la culture à travers l\'apprentissage de la langue.'
      }
    ];
  
    return (
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Comment ça <span className="text-blue-600">fonctionne</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <feature.icon className="text-blue-600 w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default Features;