import React, { useState } from 'react';
import { Lock, DollarSign, Search, CheckCircle, User, Mail, Phone, Calendar, CreditCard, LogOut, Shield, Receipt, AlertCircle } from 'lucide-react';

const Inscription = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState({ email: '', pin: '' });
  const [loggedUser, setLoggedUser] = useState(null);
  const [authError, setAuthError] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const [paymentData, setPaymentData] = useState({
    amount: '100',
    paymentMethod: 'especes',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // URL de votre Google Apps Script
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzxEiGP3stOx4eY7BOz-bhFXDWjkxd75Y9NRuDgrEKZHn9gLeQRmhZhEvcgQQxSW4i6/exec';

  // Authentification du membre du bureau
  const handleLogin = async () => {
    if (!authData.email || !authData.pin) {
      setAuthError('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await fetch(`${SCRIPT_URL}?action=authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: authData.email,
          pin: authData.pin
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setIsAuthenticated(true);
        setLoggedUser(result.user);
        setAuthError('');
      } else {
        setAuthError(result.message || 'Email ou PIN incorrect');
      }
    } catch (error) {
      console.error('Erreur authentification:', error);
      setAuthError('Erreur de connexion. Réessayez.');
    }
  };

  // Recherche de membre
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(`${SCRIPT_URL}?action=searchMember`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          requesterEmail: loggedUser.email
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSearchResults(result.members || []);
      }
    } catch (error) {
      console.error('Erreur recherche:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Sélection d'un membre
  const selectMember = (member) => {
    setSelectedMember(member);
    setSearchResults([]);
    setSearchQuery('');
  };

  // Enregistrement du paiement
  const handlePaymentSubmit = async () => {
    if (!selectedMember) {
      alert('Veuillez sélectionner un membre');
      return;
    }

    if (!paymentData.amount || parseFloat(paymentData.amount) <= 0) {
      alert('Montant invalide');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const paymentInfo = {
        memberEmail: selectedMember.email,
        memberName: `${selectedMember.firstName} ${selectedMember.lastName}`,
        amount: parseFloat(paymentData.amount),
        paymentMethod: paymentData.paymentMethod,
        notes: paymentData.notes,
        responsibleEmail: loggedUser.email,
        responsibleName: loggedUser.name,
        responsibleRole: loggedUser.role
      };

      const response = await fetch(`${SCRIPT_URL}?action=recordPayment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentInfo)
      });

      const result = await response.json();
      
      if (result.success) {
        setReceiptData(result.receipt);
        setPaymentSuccess(true);
        
        // Reset form
        setSelectedMember(null);
        setPaymentData({
          amount: '100',
          paymentMethod: 'especes',
          notes: ''
        });
      } else {
        alert('Erreur: ' + (result.message || 'Échec de l\'enregistrement'));
      }
    } catch (error) {
      console.error('Erreur enregistrement paiement:', error);
      alert('Erreur lors de l\'enregistrement. Réessayez.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Déconnexion
  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedUser(null);
    setAuthData({ email: '', pin: '' });
    setSelectedMember(null);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Reset après succès
  const resetAfterSuccess = () => {
    setPaymentSuccess(false);
    setReceiptData(null);
  };

  // PAGE DE CONNEXION
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-black/40 border border-blue-400/30 rounded-2xl p-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h1 className="font-bold text-3xl text-white mb-2">
                Accès Bureau AIS
              </h1>
              <p className="text-gray-400 text-sm">
                Gestion des Cotisations
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Email Officiel</label>
                <input
                  type="email"
                  value={authData.email}
                  onChange={(e) => setAuthData({...authData, email: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full bg-black/30 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  placeholder="votre.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">Code PIN Personnel</label>
                <input
                  type="password"
                  value={authData.pin}
                  onChange={(e) => setAuthData({...authData, pin: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full bg-black/30 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  placeholder="••••"
                  maxLength="4"
                />
              </div>

              {authError && (
                <div className="bg-red-500/10 border border-red-400/50 rounded-lg p-3 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-sm">{authError}</span>
                </div>
              )}

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-400/30 transition-all duration-300"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Se Connecter</span>
                </div>
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-xs">
                Accès réservé aux membres du bureau AIS
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PAGE DE SUCCÈS
  if (paymentSuccess && receiptData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-black/40 border border-green-400/30 rounded-2xl p-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold text-green-400 mb-2">
                Paiement Enregistré !
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"></div>
            </div>

            <div className="bg-black/30 border border-green-400/20 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Reçu N°</span>
                <span className="text-green-400 font-bold">{receiptData.receiptNumber}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Membre</span>
                <span className="text-white font-semibold">{receiptData.memberName}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Montant</span>
                <span className="text-green-400 text-2xl font-bold">{receiptData.amount} DH</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Méthode</span>
                <span className="text-white capitalize">{receiptData.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Date</span>
                <span className="text-white">{receiptData.date}</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mb-6">
              <p className="text-blue-400 text-sm text-center">
                ✅ Un email de confirmation avec le reçu a été envoyé à <br />
                <span className="font-semibold">{receiptData.memberEmail}</span>
              </p>
            </div>

            <div className="text-center space-y-3">
              <button
                onClick={resetAfterSuccess}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 w-full"
              >
                Enregistrer un Autre Paiement
              </button>
              <button
                onClick={handleLogout}
                className="border border-gray-500 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-500/10 transition-all duration-300 w-full"
              >
                Se Déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PAGE PRINCIPALE - GESTION DES PAIEMENTS
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-8 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-black/40 border border-blue-400/30 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-white font-semibold">{loggedUser?.name}</h2>
              <p className="text-gray-400 text-sm">{loggedUser?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500/20 border border-red-400/30 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Section Recherche */}
          <div className="bg-black/40 border border-blue-400/30 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center space-x-2">
              <Search className="w-6 h-6" />
              <span>Rechercher un Membre</span>
            </h3>

            <div className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Nom, email ou téléphone..."
                  className="flex-1 bg-black/30 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:opacity-50"
                >
                  {isSearching ? '...' : 'Chercher'}
                </button>
              </div>
            </div>

            {/* Résultats de recherche */}
            {searchResults.length > 0 && (
              <div className="space-y-2 mb-4">
                {searchResults.map((member, index) => (
                  <div
                    key={index}
                    onClick={() => selectMember(member)}
                    className="bg-black/30 border border-blue-400/20 rounded-lg p-4 cursor-pointer hover:bg-blue-500/10 hover:border-blue-400/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold">{member.firstName} {member.lastName}</p>
                        <p className="text-gray-400 text-sm">{member.email}</p>
                        <p className="text-gray-500 text-xs">{member.major} - {member.academicYear}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        member.paidStatus === 'OUI' 
                          ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-400/30'
                      }`}>
                        {member.paidStatus === 'OUI' ? 'Payé' : 'Non Payé'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Membre sélectionné */}
            {selectedMember && (
              <div className="bg-gradient-to-r from-blue-500/20 to-pink-500/20 border border-blue-400/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">Membre Sélectionné</h4>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-red-400 text-sm hover:text-red-300"
                  >
                    Annuler
                  </button>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-white">{selectedMember.firstName} {selectedMember.lastName}</p>
                  <p className="text-gray-300">{selectedMember.email}</p>
                  <p className="text-gray-300">{selectedMember.phoneNumber}</p>
                  <p className="text-gray-400">{selectedMember.major} - {selectedMember.academicYear}</p>
                </div>
              </div>
            )}
          </div>

          {/* Section Enregistrement Paiement */}
          <div className="bg-black/40 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center space-x-2">
              <DollarSign className="w-6 h-6" />
              <span>Enregistrer le Paiement</span>
            </h3>

            {!selectedMember ? (
              <div className="text-center py-12">
                <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Sélectionnez d'abord un membre</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Montant (DH)</label>
                  <input
                    type="number"
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
                    className="w-full bg-black/30 border border-green-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Méthode de Paiement</label>
                  <select
                    value={paymentData.paymentMethod}
                    onChange={(e) => setPaymentData({...paymentData, paymentMethod: e.target.value})}
                    className="w-full bg-black/30 border border-green-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  >
                    <option value="especes">Espèces</option>
                    <option value="virement">Virement Bancaire</option>
                    <option value="mobile">Paiement Mobile</option>
                    <option value="cheque">Chèque</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Notes (optionnel)</label>
                  <textarea
                    value={paymentData.notes}
                    onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
                    className="w-full bg-black/30 border border-green-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50"
                    rows="3"
                    placeholder="Remarques..."
                  />
                </div>

                <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                  <p className="text-sm text-gray-300 mb-1">Enregistré par:</p>
                  <p className="text-white font-semibold">{loggedUser?.name} ({loggedUser?.role})</p>
                </div>

                <button
                  onClick={handlePaymentSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <>
                      <Receipt className="w-5 h-5" />
                      <span>Confirmer le Paiement</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inscription;