import React, { useState } from 'react';
import {Link} from 'react-router-dom'


const FormPayement = () => {
  const [nomComplet, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {durationFollow,priceFollow} = localStorage

  const submitSubscribe = ()=>{
    setPaymentSuccess(true)
    console.log({durationFollow,priceFollow})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isTermsAccepted) {
      alert("Veuillez accepter les conditions générales.");
      return;
    }

    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">S'abonner au prof pour suivre ses cours</h2>
        <hr className="my-4 border-gray-300" />
        <h3 className='text-center border-l-8'>Montant : {priceFollow} Ar</h3>
        <hr className="my-4 border-gray-300" />
        {paymentSuccess ? (
          <div>
            <p className="text-green-500 text-center">Merci pour votre achat ! Vous pouvez maintenant avoir accès aux cours de ce prof.</p>
            <Link to={'/home'}>
              <button 
                className='flex align-middle justify-center p-6 bg-green-500'
              >Ok</button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label htmlFor="nomComplet" className="block text-gray-700 font-medium">Nom Complet</label>
              <input
                type="text"
                id="nomComplet"
                value={nomComplet}
                onChange={(e) => setNom(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium">Adresse Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mdp" className="block text-gray-700 font-medium">Mot de Passe</label>
              <input
                type="password"
                id="mdp"
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  required
                  className="mr-2"
                />
                J'accepte les conditions générales
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSubmit}
            >
              Payer
            </button>
          </form>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Confirmation de Paiement</h3>
            <p className="text-gray-700 mb-4">Confirmez-vous le paiement de l'abonnement à ce prof?</p>
            <div className="flex justify-center gap-8">
              <button
                onClick={submitSubscribe}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Oui
              </button>
              <button 
                className='w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
                onClick={closeModal}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPayement;
