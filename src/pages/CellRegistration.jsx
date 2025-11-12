import React, { useState } from 'react';
import { Users, Code, Brain, Shield, Calendar, DollarSign, Radio, CheckCircle, AlertCircle, Send, Loader } from 'lucide-react';

const CelluleSelection = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });
  
  const [selectedCells, setSelectedCells] = useState({
    projet: false,
    sponsoring: false,
    media: false,
    events: false
  });
  
  const [projetChoice, setProjetChoice] = useState({
    equipe: '',
    project: '',
    niveau: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationData, setConfirmationData] = useState(null);

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzC2e-WpA6VwlRowBxholnamPmR-iqaekXiaN6--qcRIjOrvqLrqeKqVedIBYzHIGcf/exec';

  const projetOptions = {
    dev: {
      label: 'Équipe Dev',
      icon: Code,
      projects: [
        { id: 'portfolio', name: 'Personal Portfolio', niveau: 'Débutant' },
        { id: 'jo', name: 'Plateforme JO', niveau: 'Intermédiaire' },
        { id: 'ctf', name: 'Plateforme CTF', niveau: 'Avancé' }
      ]
    },
    ai: {
      label: 'Équipe AI',
      icon: Brain,
      projects: [
        { id: 'music', name: 'Music Recommendation System', niveau: 'Débutant' },
        { id: 'fakenews', name: 'Fake News Detector', niveau: 'Intermédiaire' },
        { id: 'traffic', name: 'Traffic Predictor', niveau: 'Avancé' }
      ]
    },
    cyber: {
      label: 'Équipe Cyber',
      icon: Shield,
      projects: [
        { id: 'seclab', name: 'AIS-SecLab', niveau: 'Tous niveaux' }
      ]
    }
  };

  const handleCellToggle = (cell) => {
    setSelectedCells(prev => ({
      ...prev,
      [cell]: !prev[cell]
    }));
    
    if (cell === 'projet' && selectedCells.projet) {
      setProjetChoice({ equipe: '', project: '', niveau: '' });
    }
  };

  const handleSubmit = async () => {
    setErrorMessage('');
    
    // Validation
    if (!formData.email || !formData.firstName || !formData.lastName) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (!formData.email.includes('@')) {
      setErrorMessage('Email invalide');
      return;
    }
    
    const selectedCount = Object.values(selectedCells).filter(v => v).length;
    if (selectedCount === 0) {
      setErrorMessage('Veuillez sélectionner au moins une cellule');
      return;
    }
    
    if (selectedCells.projet && (!projetChoice.equipe || !projetChoice.project)) {
      setErrorMessage('Veuillez choisir une équipe et un projet');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        action: 'registerCellSelection',
        email: formData.email.trim().toLowerCase(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        cells: {
          projet: selectedCells.projet,
          sponsoring: selectedCells.sponsoring,
          media: selectedCells.media,
          events: selectedCells.events
        },
        projetDetails: selectedCells.projet ? {
          equipe: projetChoice.equipe,
          project: projetChoice.project,
          niveau: projetChoice.niveau
        } : null
      };

      // Utiliser fetch avec la méthode GET pour contourner les restrictions CORS
      const response = await fetch(SCRIPT_URL + '?' + new URLSearchParams({
        action: 'registerCellSelection',
        data: JSON.stringify(payload)
      }), {
        method: 'GET',
        redirect: 'follow'
      });

      const result = await response.json();

      if (result.success) {
        setConfirmationData({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          cells: Object.keys(selectedCells).filter(k => selectedCells[k]),
          projetInfo: selectedCells.projet ? projetChoice : null
        });
        setSubmitSuccess(true);
      } else {
        setErrorMessage(result.message || 'Erreur lors de l\'inscription');
      }
      
      setIsSubmitting(false);

    } catch (error) {
      console.error('Erreur:', error);
      setErrorMessage('Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.');
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ email: '', firstName: '', lastName: '' });
    setSelectedCells({ projet: false, sponsoring: false, media: false, events: false });
    setProjetChoice({ equipe: '', project: '', niveau: '' });
    setSubmitSuccess(false);
    setConfirmationData(null);
    setErrorMessage('');
  };

  // PAGE DE CONFIRMATION
  if (submitSuccess && confirmationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-black/40 border border-green-400/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="text-center mb-6 sm:mb-8">
              <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-400 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">
                Inscription Confirmée !
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"></div>
            </div>

            <div className="bg-black/30 border border-green-400/20 rounded-lg p-4 sm:p-6 mb-6">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Nom complet</span>
                  <p className="text-white font-semibold text-lg">{confirmationData.name}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Email</span>
                  <p className="text-green-400 text-sm break-all">{confirmationData.email}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm mb-2 block">Cellules sélectionnées</span>
                  <div className="flex flex-wrap gap-2">
                    {confirmationData.cells.map(cell => (
                      <span key={cell} className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm capitalize">
                        {cell}
                      </span>
                    ))}
                  </div>
                </div>
                {confirmationData.projetInfo && confirmationData.projetInfo.equipe && (
                  <div className="pt-3 border-t border-gray-700">
                    <span className="text-gray-400 text-sm mb-2 block">Détails Projet</span>
                    <div className="space-y-1">
                      <p className="text-white text-sm">
                        <span className="text-gray-400">Équipe:</span> {projetOptions[confirmationData.projetInfo.equipe]?.label}
                      </p>
                      <p className="text-white text-sm">
                        <span className="text-gray-400">Projet:</span> {
                          projetOptions[confirmationData.projetInfo.equipe]?.projects.find(
                            p => p.id === confirmationData.projetInfo.project
                          )?.name
                        }
                      </p>
                      <p className="text-white text-sm">
                        <span className="text-gray-400">Niveau:</span> {confirmationData.projetInfo.niveau}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-blue-400 text-sm">
                  Un email de confirmation avec les liens des groupes WhatsApp a été envoyé à votre adresse.
                </p>
              </div>
            </div>

            <button
              onClick={resetForm}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  // FORMULAIRE PRINCIPAL
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/40 border border-blue-400/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Rejoignez Nos Cellules
            </h1>
            <p className="text-gray-400">
              Sélectionnez les cellules qui vous intéressent
            </p>
          </div>

          {/* Informations Personnelles */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">Vos Informations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Prénom *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-black/30 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  placeholder="Ahmed"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Nom *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-black/30 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  placeholder="Alami"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-300 mb-2 text-sm">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/30 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Sélection des Cellules */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">Choisissez vos Cellules</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cellule Projet */}
              <div
                onClick={() => handleCellToggle('projet')}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedCells.projet
                    ? 'bg-blue-500/20 border-blue-400'
                    : 'bg-black/30 border-gray-600 hover:border-blue-400/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Code className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-semibold">Projet</span>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedCells.projet ? 'bg-blue-400 border-blue-400' : 'border-gray-500'
                  }`}>
                    {selectedCells.projet && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>

              {/* Cellule Sponsoring */}
              <div
                onClick={() => handleCellToggle('sponsoring')}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedCells.sponsoring
                    ? 'bg-green-500/20 border-green-400'
                    : 'bg-black/30 border-gray-600 hover:border-green-400/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-white font-semibold">Sponsoring</span>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedCells.sponsoring ? 'bg-green-400 border-green-400' : 'border-gray-500'
                  }`}>
                    {selectedCells.sponsoring && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>

              {/* Cellule Media */}
              <div
                onClick={() => handleCellToggle('media')}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedCells.media
                    ? 'bg-purple-500/20 border-purple-400'
                    : 'bg-black/30 border-gray-600 hover:border-purple-400/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Radio className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-semibold">Media</span>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedCells.media ? 'bg-purple-400 border-purple-400' : 'border-gray-500'
                  }`}>
                    {selectedCells.media && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>

              {/* Cellule Events */}
              <div
                onClick={() => handleCellToggle('events')}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedCells.events
                    ? 'bg-pink-500/20 border-pink-400'
                    : 'bg-black/30 border-gray-600 hover:border-pink-400/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-pink-400" />
                    <span className="text-white font-semibold">Events</span>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedCells.events ? 'bg-pink-400 border-pink-400' : 'border-gray-500'
                  }`}>
                    {selectedCells.events && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Détails Cellule Projet */}
          {selectedCells.projet && (
            <div className="mb-8 bg-blue-500/10 border border-blue-400/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Configuration Cellule Projet</span>
              </h3>
              
              <div className="space-y-4">
                {/* Sélection Équipe */}
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Choisissez votre équipe *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {Object.entries(projetOptions).map(([key, option]) => {
                      const Icon = option.icon;
                      return (
                        <div
                          key={key}
                          onClick={() => setProjetChoice({...projetChoice, equipe: key, project: '', niveau: ''})}
                          className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                            projetChoice.equipe === key
                              ? 'bg-blue-400/20 border-blue-400'
                              : 'bg-black/30 border-gray-600 hover:border-blue-400/50'
                          }`}
                        >
                          <Icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                          <p className="text-white text-sm text-center font-medium">{option.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sélection Projet */}
                {projetChoice.equipe && (
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Choisissez votre projet *</label>
                    <div className="space-y-2">
                      {projetOptions[projetChoice.equipe].projects.map(project => (
                        <div
                          key={project.id}
                          onClick={() => setProjetChoice({...projetChoice, project: project.id, niveau: project.niveau})}
                          className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                            projetChoice.project === project.id
                              ? 'bg-blue-400/20 border-blue-400'
                              : 'bg-black/30 border-gray-600 hover:border-blue-400/50'
                          }`}
                        >
                          <p className="text-white text-sm font-medium">{project.name}</p>
                          <p className="text-gray-400 text-xs mt-1">Niveau: {project.niveau}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message d'erreur */}
          {errorMessage && (
            <div className="mb-6 bg-red-500/10 border border-red-400/50 rounded-lg p-4 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-400 text-sm">{errorMessage}</span>
            </div>
          )}

          {/* Bouton de soumission */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-400/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Inscription en cours...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Confirmer mon inscription</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CelluleSelection;