/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Edit2, Trash2, X, BookOpen, Clock, Globe, BarChart3 } from 'lucide-react';

export function CoursesSection() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    langue: '',
    niveau_difficulte: 'debutant',
    duree: 0,
    prix: 0
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cours');
      setCourses(response.data.data);
    } catch (error) {
      setAlert({ type: 'error', message: 'Erreur lors du chargement des cours' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentCourse) {
        await axios.put(`http://localhost:3000/cours/${currentCourse.id_cours}`, formData);
        setAlert({ type: 'success', message: 'Cours mis à jour avec succès' });
      } else {
        await axios.post('http://localhost:3000/cours', formData);
        setAlert({ type: 'success', message: 'Cours créé avec succès' });
      }
      fetchCourses();
      setShowModal(false);
      setCurrentCourse(null);
      setFormData({
        nom: '',
        description: '',
        langue: '',
        niveau_difficulte: 'debutant',
        duree: 0,
        prix: 0
      });
    } catch (error) {
      setAlert({ type: 'error', message: 'Une erreur est survenue' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      try {
        await axios.delete(`http://localhost:3000/cours/${id}`);
        fetchCourses();
        setAlert({ type: 'success', message: 'Cours supprimé avec succès' });
      } catch (error) {
        setAlert({ type: 'error', message: 'Erreur lors de la suppression' });
      }
    }
  };

  const navigateToLessons = (courseId) => {
    navigate(`/cours/${courseId}/lecons`);
  };

  const filteredCourses = courses.filter(course =>
    course.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mes Cours</h2>
        <button
          onClick={() => {
            setCurrentCourse(null);
            setFormData({
              nom: '',
              description: '',
              langue: '',
              niveau_difficulte: 'debutant',
              duree: 0,
              prix: 0
            });
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <PlusCircle size={20} />
          Ajouter un cours
        </button>
      </div>

      {/* Recherche */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher un cours..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md"
        />
      </div>

      {/* Liste des cours */}
      <div className="grid gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id_cours} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{course.nom}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateToLessons(course.id_cours)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <BookOpen size={20} />
                  Leçons
                </button>
                <button
                  onClick={() => {
                    setCurrentCourse(course);
                    setFormData(course);
                    setShowModal(true);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(course.id_cours)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Globe size={16} />
                {course.langue}
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 size={16} />
                {course.niveau_difficulte}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {course.duree} min
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{course.prix}Ar</span>
              </div>
            </div>
          </div>
        ))}
      </div>

     {/* La partie modale mise à jour */}
{showModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
    <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl">
      {/* En-tête de la modale */}
      <div className="border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {currentCourse ? 'Modifier le cours' : 'Ajouter un nouveau cours'}
          </h2>
          <button 
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-500 mt-1">
          {currentCourse ? 'Modifiez les informations du cours existant' : 'Remplissez les informations pour créer un nouveau cours'}
        </p>
      </div>

      {/* Corps de la modale */}
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6">
          {/* Section Informations Générales */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
              <BookOpen size={20} />
              Informations Générales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du cours *
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                  placeholder="Ex: Apprendre le Francais"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Langue *
                </label>
                <div className="relative">
                  <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.langue}
                    onChange={(e) => setFormData({ ...formData, langue: e.target.value })}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                    placeholder="Ex: Français"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows="3"
                placeholder="Décrivez le contenu et les objectifs du cours..."
              />
            </div>
          </div>

          {/* Section Paramètres du Cours */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2 pt-4">
              <BarChart3 size={20} />
              Paramètres du Cours
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau
                </label>
                <select
                  value={formData.niveau_difficulte}
                  onChange={(e) => setFormData({ ...formData, niveau_difficulte: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                >
                  <option value="debutant">Débutant</option>
                  <option value="intermediaire">Intermédiaire</option>
                  <option value="avance">Avancé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durée (minutes)
                </label>
                <div className="relative">
                  <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    value={formData.duree}
                    onChange={(e) => setFormData({ ...formData, duree: Number(e.target.value) })}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    min="0"
                    placeholder="Ex: 120"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix (Ar)
                </label>
                <input
                  type="number"
                  step="1"
                  value={formData.prix}
                  onChange={(e) => setFormData({ ...formData, prix: Number(e.target.value) })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  min="0"
                  placeholder="Ex: 50000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pied de la modale */}
        <div className="border-t px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center gap-2"
          >
            {currentCourse ? 'Mettre à jour' : 'Créer le cours'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}