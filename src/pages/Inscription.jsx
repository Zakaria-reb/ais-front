import React, { useState } from 'react';
import { Lock, DollarSign, CheckCircle, LogOut, Shield, Receipt, AlertCircle, UserPlus, Users, Search, X, Menu, ArrowLeft } from 'lucide-react';

const PaymentManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState({ email: '', pin: '' });
  const [loggedUser, setLoggedUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [currentView, setCurrentView] = useState('payment');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
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
  
  const [paidMembers, setPaidMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxkj1zY-Fns-gJ5IRjaGM8ZZgFfxcgtu_Pxruod3GGYW1lsRzXEmDeksUUCP246NKvHoQ/exec';

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

  const loadPaidMembers = async () => {
    setIsLoadingMembers(true);
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'getPaidMembers',
          requesterEmail: loggedUser.email
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setPaidMembers(result.members);
      } else {
        alert('Erreur: ' + result.message);
      }
    } catch (error) {
      console.error('Erreur chargement membres:', error);
      alert('Erreur de chargement des membres');
    } finally {
      setIsLoadingMembers(false);
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
    setCurrentView('payment');
    setPaidMembers([]);
    setSearchQuery('');
    setShowMobileMenu(false);
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
    setCurrentView('payment');
    setShowMobileMenu(false);
  };

  const switchView = (view) => {
    setCurrentView(view);
    setShowMobileMenu(false);
    if (view === 'members' && paidMembers.length === 0) {
      loadPaidMembers();
    }
  };

  const filteredMembers = paidMembers.filter(member => {
    const query = searchQuery.toLowerCase();
    return (
      member.email.toLowerCase().includes(query) ||
      member.firstName.toLowerCase().includes(query) ||
      member.lastName.toLowerCase().includes(query) ||
      (member.phoneNumber && String(member.phoneNumber).includes(query)) ||
      member.major.toLowerCase().includes(query)
    );
  });

  // PAGE DE CONNEXION
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-black/40 border border-blue-400/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="text-center mb-6 sm:mb-8">
              <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto mb-3 sm:mb-4" />
              <h1 className="font-bold text-2xl sm:text-3xl text-white mb-2">
                Accès Bureau AIS
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm">
                Gestion des Cotisations
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 text-xs sm:text-sm">Email Officiel</label>
                <input
                  type="email"
                  value={authData.email}
                  onChange={(e) => setAuthData({...authData, email: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full bg-black/30 border border-blue-400/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  placeholder="votre.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-xs sm:text-sm">Code PIN Personnel</label>
                <input
                  type="password"
                  value={authData.pin}
                  onChange={(e) => setAuthData({...authData, pin: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full bg-black/30 border border-blue-400/30 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  placeholder="••••"
                  maxLength="4"
                />
              </div>

              {authError && (
                <div className="bg-red-500/10 border border-red-400/50 rounded-lg p-3 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
                  <span className="text-red-400 text-xs sm:text-sm">{authError}</span>
                </div>
              )}

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-400/30 transition-all duration-300 text-sm sm:text-base"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Se Connecter</span>
                </div>
              </button>
            </div>

            <div className="mt-4 sm:mt-6 text-center">
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-black/40 border border-green-400/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="text-center mb-6 sm:mb-8">
              <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-400 mx-auto mb-3 sm:mb-4 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">
                Paiement Enregistré !
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"></div>
            </div>

            <div className="bg-black/30 border border-green-400/20 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                  <span className="text-gray-400 text-sm">Reçu N°</span>
                  <span className="text-green-400 font-bold text-sm sm:text-base">{receiptData.receiptNumber}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                  <span className="text-gray-400 text-sm">Membre</span>
                  <span className="text-white font-semibold text-sm sm:text-base break-words">{receiptData.memberName}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                  <span className="text-gray-400 text-sm">Téléphone</span>
                  <span className="text-white text-sm sm:text-base">{receiptData.memberPhone}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                  <span className="text-gray-400 text-sm">Montant</span>
                  <span className="text-green-400 text-xl sm:text-2xl font-bold">{receiptData.amount} DH</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                  <span className="text-gray-400 text-sm">Méthode</span>
                  <span className="text-white capitalize text-sm sm:text-base">{receiptData.paymentMethod}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                  <span className="text-gray-400 text-sm">Date</span>
                  <span className="text-white text-sm sm:text-base">{receiptData.date}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-blue-400 text-xs sm:text-sm text-center">
                 Un email de confirmation avec le reçu a été envoyé à <br />
                <span className="font-semibold break-all">{receiptData.memberEmail}</span>
              </p>
            </div>

            <div className="text-center space-y-2 sm:space-y-3">
              <button
                onClick={resetAfterSuccess}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 w-full text-sm sm:text-base"
              >
                Enregistrer un Autre Paiement
              </button>
              <button
                onClick={handleLogout}
                className="border border-gray-500 text-gray-300 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-500/10 transition-all duration-300 w-full text-sm sm:text-base"
              >
                Se Déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VUE LISTE DES MEMBRES PAYÉS
  if (currentView === 'members') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pb-4">
        {/* Header Mobile Amélioré */}
        <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-purple-400/30">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => switchView('payment')}
                className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Retour</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500/20 border border-red-400/30 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition-all text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h2 className="text-white font-semibold text-sm truncate">{loggedUser?.name}</h2>
                <p className="text-gray-400 text-xs">{loggedUser?.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4 max-w-6xl mx-auto">
          <div className="bg-black/40 border border-purple-400/30 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-400 flex items-center space-x-2">
                <Users className="w-6 h-6 sm:w-7 sm:h-7" />
                <span>Membres Payés</span>
              </h2>
              {!isLoadingMembers && paidMembers.length > 0 && (
                <div className="bg-purple-500/20 border border-purple-400/30 text-purple-400 px-3 py-1.5 rounded-lg font-semibold text-sm self-start sm:self-auto">
                  {filteredMembers.length} membre{filteredMembers.length > 1 ? 's' : ''}
                </div>
              )}
            </div>

            {/* Barre de recherche */}
            {paidMembers.length > 0 && (
              <div className="mb-4 sm:mb-6 relative">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full bg-black/30 border border-purple-400/30 rounded-lg pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Bouton Charger */}
            {paidMembers.length === 0 && !isLoadingMembers && (
              <div className="text-center py-8 sm:py-12">
                <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">Cliquez pour charger la liste</p>
                <button
                  onClick={loadPaidMembers}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                >
                  Charger les Membres
                </button>
              </div>
            )}

            {/* Loading */}
            {isLoadingMembers && (
              <div className="text-center py-8 sm:py-12">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-400 text-sm sm:text-base">Chargement...</p>
              </div>
            )}

            {/* Liste des membres */}
            {!isLoadingMembers && paidMembers.length > 0 && (
              <div className="space-y-2 sm:space-y-3">
                {filteredMembers.length === 0 ? (
                  <div className="text-center py-6 sm:py-8">
                    <p className="text-gray-400 text-sm sm:text-base">Aucun membre trouvé pour "{searchQuery}"</p>
                  </div>
                ) : (
                  filteredMembers.map((member, index) => (
                    <div
                      key={index}
                      className="bg-black/30 border border-purple-400/20 rounded-lg p-3 sm:p-4 hover:border-purple-400/50 transition-all duration-300"
                    >
                      <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-3">
                        <div>
                          <p className="text-gray-400 text-xs mb-0.5 sm:mb-1">Nom Complet</p>
                          <p className="text-white font-semibold text-sm sm:text-base">{member.fullName}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-0.5 sm:mb-1">Email</p>
                          <p className="text-purple-400 text-xs sm:text-sm break-all">{member.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-0.5 sm:mb-1">Téléphone</p>
                          <p className="text-white text-sm sm:text-base">{member.phoneNumber || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-0.5 sm:mb-1">Filière</p>
                          <p className="text-white text-sm sm:text-base">{member.major || 'N/A'}</p>
                        </div>
                      </div>
                      {member.level && (
                        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-700">
                          <p className="text-gray-400 text-xs mb-0.5 sm:mb-1">Niveau</p>
                          <p className="text-white text-sm">{member.level}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // PAGE PRINCIPALE - ENREGISTREMENT
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 pb-4">
      {/* Header Mobile Amélioré */}
      <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-blue-400/30">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <Shield className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h2 className="text-white font-semibold text-sm truncate">{loggedUser?.name}</h2>
                <p className="text-gray-400 text-xs">{loggedUser?.role}</p>
              </div>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
              <button
                onClick={() => switchView('members')}
                className="flex items-center space-x-1.5 bg-purple-500/20 border border-purple-400/30 text-purple-400 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-purple-500/30 transition-all text-xs sm:text-sm"
              >
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Membres</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 bg-red-500/20 border border-red-400/30 text-red-400 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-red-500/30 transition-all text-xs sm:text-sm"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Sortir</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire Principal */}
      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-black/40 border border-blue-400/30 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4 sm:mb-6 flex items-center space-x-2">
            <UserPlus className="w-6 h-6 sm:w-7 sm:h-7" />
            <span>Nouveau Paiement</span>
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {/* Informations Membre */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-cyan-400 mb-3 sm:mb-4">Informations du Membre</h3>
              <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3">
                <div>
                  <label className="block text-gray-300 mb-1.5 sm:mb-2 text-xs sm:text-sm">Prénom *</label>
                  <input
                    type="text"
                    value={memberData.firstName}
                    onChange={(e) => setMemberData({...memberData, firstName: e.target.value})}
                    className={`w-full bg-black/30 border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      formErrors.firstName ? 'border-red-400 focus:ring-red-400/50' : 'border-blue-400/30 focus:ring-blue-400/50'
                    }`}
                    placeholder="Ahmed"
                  />
                  {formErrors.firstName && <span className="text-red-400 text-xs mt-1 block">{formErrors.firstName}</span>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 sm:mb-2 text-xs sm:text-sm">Nom *</label>
                  <input
                    type="text"
                    value={memberData.lastName}
                    onChange={(e) => setMemberData({...memberData, lastName: e.target.value})}
                    className={`w-full bg-black/30 border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      formErrors.lastName ? 'border-red-400 focus:ring-red-400/50' : 'border-blue-400/30 focus:ring-blue-400/50'
                    }`}
                    placeholder="Alami"
                  />
                  {formErrors.lastName && <span className="text-red-400 text-xs mt-1 block">{formErrors.lastName}</span>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 sm:mb-2 text-xs sm:text-sm">Email *</label>
                  <input
                    type="email"
                    value={memberData.email}
                    onChange={(e) => setMemberData({...memberData, email: e.target.value})}
                    className={`w-full bg-black/30 border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      formErrors.email ? 'border-red-400 focus:ring-red-400/50' : 'border-blue-400/30 focus:ring-blue-400/50'
                    }`}
                    placeholder="email@example.com"
                  />
                  {formErrors.email && <span className="text-red-400 text-xs mt-1 block">{formErrors.email}</span>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 sm:mb-2 text-xs sm:text-sm">Téléphone *</label>
                  <input
                    type="tel"
                    value={memberData.phoneNumber}
                    onChange={(e) => setMemberData({...memberData, phoneNumber: e.target.value})}
                    className={`w-full bg-black/30 border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      formErrors.phoneNumber ? 'border-red-400 focus:ring-red-400/50' : 'border-blue-400/30 focus:ring-blue-400/50'
                    }`}
                    placeholder="+212 6XX XX XX XX"
                  />
                  {formErrors.phoneNumber && <span className="text-red-400 text-xs mt-1 block">{formErrors.phoneNumber}</span>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-300 mb-1.5 sm:mb-2 text-xs sm:text-sm">Filière *</label>
                  <input
                    type="text"
                    value={memberData.major}
                    onChange={(e) => setMemberData({...memberData, major: e.target.value})}
                    className={`w-full bg-black/30 border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      formErrors.major ? 'border-red-400 focus:ring-red-400/50' : 'border-blue-400/30 focus:ring-blue-400/50'
                    }`}
                    placeholder="Ex: ISIC, 2ITE, GI..."
                  />
                  {formErrors.major && <span className="text-red-400 text-xs mt-1 block">{formErrors.major}</span>}
                </div>
              </div>
            </div>

            {/* Informations Paiement */}
            <div className="border-t border-gray-700 pt-4 sm:pt-6">
              <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-3 sm:mb-4 flex items-center space-x-2">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Détails du Paiement</span>
              </h3>
              <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3">
                <div>
                  <label className="block text-gray-300 mb-1.5 sm:mb-2 text-xs sm:text-sm">Montant (DH) *</label>
                  <input
                    type="number"
                    value={30}
                    readOnly
                    className="w-full bg-black/30 border border-green-400/30 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 sm:mb-2 text-xs sm:text-sm">Méthode de Paiement</label>
                  <select
                    value={paymentData.paymentMethod}
                    onChange={(e) => setPaymentData({...paymentData, paymentMethod: e.target.value})}
                    className="w-full bg-black/30 border border-green-400/30 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  >
                    <option value="especes">Espèces</option>
                    <option value="virement">Virement Bancaire</option>
                    <option value="mobile">Paiement Mobile</option>
                    <option value="cheque">Chèque</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-gray-300 mb-1.5 sm:mb-2 text-xs sm:text-sm">Notes (optionnel)</label>
                  <textarea
                    value={paymentData.notes}
                    onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
                    className="w-full bg-black/30 border border-green-400/30 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 resize-none"
                    rows="3"
                    placeholder="Remarques..."
                  />
                </div>
              </div>
            </div>

            {/* Info Responsable */}
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-300 mb-1">Enregistré par:</p>
              <p className="text-white font-semibold text-sm sm:text-base">{loggedUser?.name} ({loggedUser?.role})</p>
            </div>

            {/* Bouton Submit */}
            <button
              onClick={handlePaymentSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 sm:py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Enregistrement...</span>
                </>
              ) : (
                <>
                  <Receipt className="w-4 h-4 sm:w-5 sm:h-5" />
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