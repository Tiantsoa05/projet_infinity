function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>
        <nav className="space-x-4">
          <a href="#" className="hover:text-blue-600">Accueil</a>
          <a href="#" className="hover:text-blue-600">Cours</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </nav>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Commencer
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-6 flex items-center">
        <div className="w-1/2 space-y-6">
          <h1 className="text-5xl font-bold">
            Titre Accrocheur
          </h1>
          <p className="text-xl text-gray-600">
            Description détaillée du platforme
          </p>
          <div className="space-x-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md">
              Démarrer
            </button>
            <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-md">
              En savoir plus
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <img 
            src="/image.png" 
            alt="Hero Image" 
            className="w-full h-auto"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center">
        © 2024 DarkZangetsu. Tous droits réservés.
      </footer>
    </div>
  )
}

export default LandingPage
