export function CoursesSection() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Mes Cours</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* Cartes de cours */}
          {[1,2,3,4,5,6].map((course) => (
            <div 
              key={course} 
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <h3 className="font-semibold">Cours {course}</h3>
              <p className="text-gray-500">Description du cours</p>
            </div>
          ))}
        </div>
      </div>
    );
  }