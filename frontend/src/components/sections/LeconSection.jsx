/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PlusCircle, Edit2, Trash2, X } from 'lucide-react';
import Navbar from '../Navigation/Navbar';

export function LeconsSection() {
  const { coursId } = useParams();
  const [lecons, setLecons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentLecon, setCurrentLecon] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    titre: '',
    contenu: '',
    exercices: [],
    duree: 0
  });

  useEffect(() => {
    fetchLecons();
  }, [coursId]);

  const fetchLecons = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/cours/${coursId}/lecons`);
      setLecons(response.data.data);
    } catch (error) {
      setAlert({ type: 'error', message: 'Erreur lors du chargement des leçons' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentLecon) {
        await axios.put(`http://localhost:3000/lecons/${currentLecon.id_lecon}`, formData);
        setAlert({ type: 'success', message: 'Leçon mise à jour avec succès' });
      } else {
        await axios.post(`http://localhost:3000/cours/${coursId}/lecons`, formData);
        setAlert({ type: 'success', message: 'Leçon créée avec succès' });
      }
      fetchLecons();
      setShowModal(false);
      resetForm();
    } catch (error) {
      setAlert({ type: 'error', message: 'Une erreur est survenue' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette leçon ?')) {
      try {
        await axios.delete(`http://localhost:3000/lecons/${id}`);
        fetchLecons();
        setAlert({ type: 'success', message: 'Leçon supprimée avec succès' });
      } catch (error) {
        setAlert({ type: 'error', message: 'Erreur lors de la suppression' });
      }
    }
  };

  const resetForm = () => {
    setCurrentLecon(null);
    setFormData({
      titre: '',
      contenu: '',
      exercices: [],
      duree: 0
    });
  };

  return (
    <div className="min-h-screen bg-gray-50"> {/* Background pour toute la page */}
      <Navbar />
      <div className="pt-20 pb-12 px-4"> {/* Padding ajusté pour la Navbar */}
        <div className="max-w-5xl mx-auto"> {/* Container légèrement plus large */}
          <div className="bg-white shadow-sm rounded-lg p-6 mb-8"> {/* Header section */}
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Leçons du cours</h2>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                <PlusCircle size={20} />
                Ajouter une leçon
              </button>
            </div>

            {alert.message && (
              <div className={`mt-4 p-4 rounded-md ${alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {alert.message}
                <button onClick={() => setAlert({ type: '', message: '' })} className="float-right">
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          <div className="grid gap-6">
            {lecons.map((lecon) => (
              <div key={lecon.id_lecon} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">{lecon.titre}</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setCurrentLecon(lecon);
                        setFormData(lecon);
                        setShowModal(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(lecon.id_lecon)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{lecon.contenu}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    Durée: {lecon.duree} minutes
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4">
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentLecon ? 'Modifier la leçon' : 'Ajouter une nouvelle leçon'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={formData.titre}
                      onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contenu
                    </label>
                    <textarea
                      value={formData.contenu}
                      onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="6"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Durée (minutes)
                    </label>
                    <input
                      type="number"
                      value={formData.duree}
                      onChange={(e) => setFormData({ ...formData, duree: Number(e.target.value) })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t px-6 py-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  {currentLecon ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}