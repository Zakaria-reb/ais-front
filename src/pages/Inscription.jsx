import React, { useState } from 'react';
import { Lock, DollarSign, CheckCircle, User, LogOut, Shield, Receipt, AlertCircle, UserPlus } from 'lucide-react';

const PaymentManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState({ email: '', pin: '' });
  const [loggedUser, setLoggedUser] = useState(null);
  const [authError, setAuthError] = useState('');
  
  const [memberData, setMemberData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    major: ''
  });
  
  const [paymentData, setPaymentData] = useState({
    amount: '30',
    paymentMethod: 'especes',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynEUO-Q6b4HDi4glIQJkp9WfGB-4P3jyr1XklfzJ-_aM_Q-L9XDq3enUPEEbvfG2U/exec';

  const handleLogin = async () => {
    if (!authData.email || !authData.pin) {
      setAuthError('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'authenticate',
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

  const validateForm = () => {
    const errors = {};
    
    if (!memberData.email.trim()) errors.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(memberData.email)) errors.email = 'Email invalide';
    
    if (!memberData.firstName.trim()) errors.firstName = 'Prénom requis';
    if (!memberData.lastName.trim()) errors.lastName = 'Nom requis';
    if (!memberData.phoneNumber.trim()) errors.phoneNumber = 'Téléphone requis';
    if (!memberData.major.trim()) errors.major = 'Filière requise';
    
    if (!paymentData.amount || parseFloat(paymentData.amount) <= 0) {
      errors.amount = 'Montant invalide';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePaymentSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const paymentInfo = {
        action: 'recordPayment',
        memberEmail: memberData.email,
        memberName: `${memberData.firstName} ${memberData.lastName}`,
        memberPhone: memberData.phoneNumber,
        memberMajor: memberData.major,
        amount: parseFloat(paymentData.amount),
        paymentMethod: paymentData.paymentMethod,
        notes: paymentData.notes,
        responsibleEmail: loggedUser.email,
        responsibleName: loggedUser.name,
        responsibleRole: loggedUser.role
      };

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(paymentInfo)
      });

      const result = await response.json();
      
      if (result.success) {
        setReceiptData(result.receipt);
        setPaymentSuccess(true);
        
        setMemberData({
          email: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          major: ''
        });
        setPaymentData({
          amount: '30',
          paymentMethod: 'especes',
          notes: ''
        });
        setFormErrors({});
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

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedUser(null);
    setAuthData({ email: '', pin: '' });
    setMemberData({
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      major: ''
    });
    setPaymentData({
      amount: '30',
      paymentMethod: 'especes',
      notes: ''
    });
  };

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
                <span className="text-gray-400">Téléphone</span>
                <span className="text-white">{receiptData.memberPhone}</span>
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

  // PAGE PRINCIPALE - ENREGISTREMENT
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-black/40 border border-blue-400/30 rounded-lg p-4 flex items-center justify-between mb-8">
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

        {/* Formulaire Principal */}
        <div className="bg-black/40 border border-blue-400/30 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 flex items-center space-x-3">
            <UserPlus className="w-8 h-8" />
            <span>Enregistrer un Paiement</span>
          </h2>

          <div className="space-y-6">
            {/* Informations Membre */}
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Informations du Membre</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Prénom *</label>
                  <input
                    type="text"
                    value={memberData.firstName}
                    onChange={(e) => setMemberData({...memberData, firstName: e.target.value})}
                    className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      formErrors.firstName ? 'border-red-400 focus:ring-red-400/50' : 'border-blue-400/30 focus:ring-blue-400/50'
                    }`}
                    placeholder="Ahmed"
                  />
                  {formErrors.firstName && <span className="text-red-400 text-xs mt-1 block">{formErrors.firstName}</span>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Nom *</label>
                  <input
                    type="text"
                    value={memberData.lastName}
                    onChange={(e) => setMemberData({...memberData, lastName: e.target.value})}
                    className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      formErrors.lastName ? 'border-red-400 focus:ring-red-400/50' : 'border-blue-400/30 focus:ring-blue-400/50'
                    }`}
                    placeholder="Alami"
                  />
                  {formErrors.lastName && <span className="text-red-400 text-xs mt-1 block">{formErrors.lastName}</span>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Email *</label>
                  <input
                    type="email"
                    value={memberData.email}
                    onChange={(e) => setMemberData({...memberData, email: e.target.value})}
                    className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      formErrors.email ? 'border-red-400 focus:ring-red-400/50' : 'border-blue-400/30 focus:ring-blue-400/50'
                    }`}
                    placeholder="email@example.com"
                  />
                  {formErrors.email && <span className="text-red-400 text-xs mt-1 block">{formErrors.email}</span>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Téléphone *</label>
                  <input
                    type="tel"
                    value={memberData.phoneNumber}
                    onChange={(e) => setMemberData({...memberData, phoneNumber: e.target.value})}
                    className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      formErrors.phoneNumber ? 'border-red-400 focus:ring-red-400/50' : 'border-blue-400/30 focus:ring-blue-400/50'
                    }`}
                    placeholder="+212 6XX XX XX XX"
                  />
                  {formErrors.phoneNumber && <span className="text-red-400 text-xs mt-1 block">{formErrors.phoneNumber}</span>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2 text-sm">Filière *</label>
                  <input
                    type="text"
                    value={memberData.major}
                    onChange={(e) => setMemberData({...memberData, major: e.target.value})}
                    className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      formErrors.major ? 'border-red-400 focus:ring-red-400/50' : 'border-blue-400/30 focus:ring-blue-400/50'
                    }`}
                    placeholder="Ex: ISIC, 2ITE, GI..."
                  />
                  {formErrors.major && <span className="text-red-400 text-xs mt-1 block">{formErrors.major}</span>}
                </div>
              </div>
            </div>

            {/* Informations Paiement */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center space-x-2">
                <DollarSign className="w-6 h-6" />
                <span>Détails du Paiement</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Montant (DH) *</label>
                  <input
                    type="number"
                    value={30}
                    readOnly
                    className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 ${
                      formErrors.amount ? 'border-red-400 focus:ring-red-400/50' : 'border-green-400/30 focus:ring-green-400/50'
                    }`}
                  />
                  {formErrors.amount && <span className="text-red-400 text-xs mt-1 block">{formErrors.amount}</span>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Méthode de Paiement</label>
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

                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2 text-sm">Notes (optionnel)</label>
                  <textarea
                    value={paymentData.notes}
                    onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
                    className="w-full bg-black/30 border border-green-400/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50"
                    rows="3"
                    placeholder="Remarques..."
                  />
                </div>
              </div>
            </div>

            {/* Info Responsable */}
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
              <p className="text-sm text-gray-300 mb-1">Enregistré par:</p>
              <p className="text-white font-semibold">{loggedUser?.name} ({loggedUser?.role})</p>
            </div>

            {/* Bouton Submit */}
            <button
              onClick={handlePaymentSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Enregistrement en cours...</span>
                </>
              ) : (
                <>
                  <Receipt className="w-5 h-5" />
                  <span>Confirmer le Paiement</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;