/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { UserPlus, Mail, Lock, UserCircle, GraduationCap, Languages, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LANGUES_MATERNELLES = [
    'Malagasy',
    'Français', 
    'Anglais', 
    'Arabe', 
    'Espagnol', 
    'Allemand', 
    'Chinois', 
    'Italien', 
    'Portugais', 
    'Russe', 
    'Autre'
];

const RegisterPage = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('ETUDIANT');
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [niveauLangue, setNiveauLangue] = useState('debutant');
    const [langueMaternelle, setLangueMaternelle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/auth/register', {
                nom,
                prenom,
                email,
                password,
                role,
                niveau_langue: niveauLangue,
                langue_maternelle: langueMaternelle
            });

            localStorage.setItem('token', response.data.token);

            navigate('/login');
        } catch (err) {

            setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
            console.error('Erreur d\'inscription', err);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Section Formulaire d'Inscription */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-blue-300">
                <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-xl border border-gray-100">
                    <div>
                        <div className="flex justify-center items-center mb-6">
                            <UserPlus className="h-12 w-12 text-blue-600" />
                            <h2 className="ml-3 text-3xl font-extrabold text-gray-900">
                                Créer un Compte
                            </h2>
                        </div>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                {error}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Champ Nom */}
                            <div>
                                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                                    Nom
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserCircle className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="nom"
                                        name="nom"
                                        type="text"
                                        required
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                        className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Votre nom"
                                    />
                                </div>
                            </div>

                            {/* Champ Prénom */}
                            <div>
                                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                                    Prénom
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserCircle className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="prenom"
                                        name="prenom"
                                        type="text"
                                        required
                                        value={prenom}
                                        onChange={(e) => setPrenom(e.target.value)}
                                        className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Votre prénom"
                                    />
                                </div>
                            </div>

                            {/* Champ Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Adresse Email
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="votre.email@example.com"
                                    />
                                </div>
                            </div>

                            {/* Champ Mot de Passe */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Mot de Passe
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Votre mot de passe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="langueMaternelle" className="block text-sm font-medium text-gray-700">
                                    Langue Maternelle
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Globe className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        id="langueMaternelle"
                                        name="langueMaternelle"
                                        required
                                        value={langueMaternelle}
                                        onChange={(e) => setLangueMaternelle(e.target.value)}
                                        className="pl-10 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="">Sélectionnez votre langue maternelle</option>
                                        {LANGUES_MATERNELLES.map((langue) => (
                                            <option key={langue} value={langue}>
                                                {langue}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Sélection du Rôle */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Vous êtes :
                                </label>
                                <div className="flex space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio"
                                            name="role"
                                            value="ETUDIANT"
                                            checked={role === 'ETUDIANT'}
                                            onChange={() => setRole('ETUDIANT')}
                                        />
                                        <span className="ml-2 flex items-center">
                                            <GraduationCap className="h-5 w-5 mr-1 text-blue-600" />
                                            Étudiant
                                        </span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio"
                                            name="role"
                                            value="ENSEIGNANT"
                                            checked={role === 'ENSEIGNANT'}
                                            onChange={() => setRole('ENSEIGNANT')}
                                        />
                                        <span className="ml-2 flex items-center">
                                            <UserCircle className="h-5 w-5 mr-1 text-blue-600" />
                                            Professeur
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Niveau de Langue
                                </label>
                                <div className="flex space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio"
                                            name="niveauLangue"
                                            value="debutant"
                                            checked={niveauLangue === 'debutant'}
                                            onChange={() => setNiveauLangue('debutant')}
                                        />
                                        <span className="ml-2 flex items-center">
                                            <Languages className="h-5 w-5 mr-1 text-blue-600" />
                                            Débutant
                                        </span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio"
                                            name="niveauLangue"
                                            value="intermediaire"
                                            checked={niveauLangue === 'intermediaire'}
                                            onChange={() => setNiveauLangue('intermediaire')}
                                        />
                                        <span className="ml-2 flex items-center">
                                            <Languages className="h-5 w-5 mr-1 text-blue-600" />
                                            Intermédiaire
                                        </span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio"
                                            name="niveauLangue"
                                            value="avance"
                                            checked={niveauLangue === 'avance'}
                                            onChange={() => setNiveauLangue('avance')}
                                        />
                                        <span className="ml-2 flex items-center">
                                            <Languages className="h-5 w-5 mr-1 text-blue-600" />
                                            Avancé
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Bouton d'Inscription */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    S'inscrire
                                </button>
                            </div>
                        </form>

                        {/* Section Connexion */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Déjà un compte ? {' '}
                                <Link to={"/login"} className="font-medium text-blue-600 hover:text-blue-500">
                                    Connectez-vous
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Separateur vertical */}
            <div className="hidden lg:block w-px bg-gray-200"></div>

            {/* Section Illustration */}
            <div className="hidden lg:block lg:w-1/2 bg-blue-50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src="/images/register.jpg"
                        alt="register infinity"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute bottom-6 left-0 right-0 p-8 text-center bg-white/70">
                    <h3 className="text-2xl font-bold text-blue-800 mb-4">
                        Rejoignez notre communauté d'apprentissage
                    </h3>
                    <p className="text-blue-600">
                        Commencez votre parcours d'apprentissage avec Infinity
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;