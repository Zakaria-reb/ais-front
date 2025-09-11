import React, { useState } from 'react';
//import axios from 'axios';
import { Mail, User, Phone, Calendar, MapPin, GraduationCap, Code, Loader2, CheckCircle, Home, LogIn } from 'lucide-react';
const InscriptionPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    university: 'ENSA El Jadida',
    field: '',
    level: '',
    programmingExperience: '',
    interests: [],
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const interests = [
    'Web Development',
    'Mobile Development', 
    'Data Science',
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Cybersecurity',
    'Ethical Hacking',
    'Penetration Testing',
    'Network Security',
    'Game Development',
    'Unity Development',
    'Unreal Engine',
    'UI/UX Design',
    'Graphic Design',
    'DevOps',
    'Cloud Computing',
    'Docker & Kubernetes',
    'Blockchain',
    'Cryptocurrency',
    'IoT (Internet of Things)',
    'Robotics',
    'Arduino & Raspberry Pi',
    'Embedded Systems',
    '3D Modeling',
    'Animation',
    'Digital Marketing',
    'E-commerce',
    'Project Management',
    'Agile/Scrum',
    'Database Design',
    'Big Data',
    'Virtual Reality',
    'Augmented Reality'
  ];

  const fields = [
    { value: 'isic', label: 'Ingénierie des systèmes d\'information et de communication (ISIC)' },
    { value: 'g2e', label: 'Génie Energétique et Electrique (G2E)' },
    { value: 'gi', label: 'Génie Industriel (GI)' },
    { value: '2ite', label: 'Ingénierie Informatique et Technologies émergentes (2ITE)' },
    { value: 'gc', label: 'Génie Civil (GC)' },
    { value: 'ccn', label: 'Cybersécurité et Confiance Numérique (CCN)' },
    { value: 'master-ai', label: 'Master Intelligence Artificielle' },
    { value: 'prepa-1', label: '1ère année Cycle Préparatoire' },
    { value: 'prepa-2', label: '2ème année Cycle Préparatoire' }
  ];

  const getLevels = (selectedField) => {
    if (selectedField === 'prepa-1' || selectedField === 'prepa-2') {
      return [];
    }
    if (selectedField === 'master-ai') {
      return ['Master 1', 'Master 2'];
    }
    return ['1ère année', '2ème année', '3ème année'];
  };

  const programmingLevels = [
    { value: 'none', label: 'Aucune expérience' },
    { value: 'beginner', label: 'Débutant (0-6 mois)' },
    { value: 'basic', label: 'Basique (6 mois - 1 an)' },
    { value: 'intermediate', label: 'Intermédiaire (1-2 ans)' },
    { value: 'good', label: 'Bon niveau (2-3 ans)' },
    { value: 'advanced', label: 'Avancé (3-5 ans)' },
    { value: 'expert', label: 'Expert (5+ ans)' },
    { value: 'professional', label: 'Professionnel (Expérience en entreprise)' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'field') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        level: '' 
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!formData.field) newErrors.field = 'La filière est requise';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Vous devez accepter les conditions';

    // Only validate level if field requires it
    const selectedField = fields.find(f => f.value === formData.field);
    if (selectedField && !['prepa-1', 'prepa-2'].includes(formData.field) && !formData.level) {
      newErrors.level = 'Le niveau est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Prepare data for backend (excluding university and agreeTerms)
      const backendData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        field: formData.field,
        level: formData.level,
        programmingExperience: formData.programmingExperience,
        interests: formData.interests
      };

      // Replace with your actual backend URL
      const response = await axios.post('http://localhost:3001/api/inscriptions', backendData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Inscription successful:', response.data);
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        alert(`Erreur du serveur: ${error.response.data.message || 'Une erreur est survenue'}`);
      } else if (error.request) {
        // Request was made but no response received
        alert('Erreur de connexion. Vérifiez votre connexion internet.');
      } else {
        // Something else happened
        alert('Une erreur inattendue est survenue.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      university: 'ENSA El Jadida',
      field: '',
      level: '',
      programmingExperience: '',
      interests: [],
      agreeTerms: false
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-black/40 border border-green-400/30 rounded-2xl p-12 backdrop-blur-sm">
            <div className="mb-8">
              <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4 animate-pulse" />
              <h2 className="font-orbitron text-3xl font-bold text-green-400 mb-4">
                INSCRIPTION CONFIRMÉE
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"></div>
            </div>

            <div className="space-y-6 text-left">
              <div className="bg-black/30 border border-cyber-blue/20 rounded-lg p-6">
                <h3 className="font-orbitron text-lg font-semibold text-cyber-blue mb-4">
                  Prochaines étapes :
                </h3>
                <div className="space-y-3 font-rajdhani text-gray-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span>Un email de confirmation a été envoyé à <span className="text-cyan-400">{formData.email}</span></span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Vous recevrez un QR code pour rejoindre notre groupe WhatsApp</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Notre équipe vous contactera dans les 48h pour finaliser votre adhésion</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 border border-purple-400/20 rounded-lg p-6">
                <h3 className="font-orbitron text-lg font-semibold text-purple-400 mb-3">
                  En attendant...
                </h3>
                <p className="font-rajdhani text-gray-300 mb-4">
                  Suivez-nous sur nos réseaux sociaux pour ne rien manquer de nos activités !
                </p>
                <div className="flex space-x-4">
                  <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg px-4 py-2 text-cyber-blue font-rajdhani text-sm">
                    @AIS_Club
                  </div>
                  <div className="bg-purple-400/10 border border-purple-400/30 rounded-lg px-4 py-2 text-purple-400 font-rajdhani text-sm">
                    AIS LinkedIn
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={resetForm}
                className="bg-gradient-to-r from-cyber-blue to-cyan-400 text-black px-8 py-3 rounded-lg font-rajdhani font-semibold hover:shadow-lg hover:shadow-cyber-blue/30 transition-all duration-300 hover:-translate-y-1"
              >
                Nouvelle Inscription
              </button>
              <div>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="border border-purple-400 text-purple-400 px-8 py-3 rounded-lg font-rajdhani font-semibold hover:bg-purple-400/10 transition-all duration-300 hover:-translate-y-1"
                >
                  Retour à l'Accueil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest py-12 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-24 left-16 w-32 h-32 border border-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-24 right-20 w-40 h-40 border-2 border-cyber-blue/15 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-cyan-400/25 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="font-fira text-sm text-purple-400 bg-purple-400/10 px-4 py-2 rounded-full border border-purple-400/30">
              [INSCRIPTION_PROTOCOL]
            </span>
          </div>
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              REJOIGNEZ LA COMMUNAUTÉ AIS
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-6"></div>
          <p className="font-rajdhani text-lg text-gray-300 max-w-2xl mx-auto">
            Remplissez ce formulaire pour devenir membre du club AIS ENSA El Jadida et accéder à un écosystème 
            d'innovation et de collaboration technologique.
          </p>
        </div>
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <button 
            onClick={() => window.location.href = '/'}
            className="group flex items-center space-x-2 bg-black/40 border border-cyber-blue/30 text-cyber-blue px-6 py-3 rounded-lg font-rajdhani font-semibold hover:bg-cyber-blue/10 hover:border-cyber-blue/50 hover:shadow-lg hover:shadow-cyber-blue/20 transition-all duration-300 hover:-translate-y-1"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span>Retour Accueil</span>
          </button>
          
          <button 
            onClick={() => window.location.href = '/connexion'}
            className="group flex items-center space-x-2 bg-black/40 border border-purple-400/30 text-purple-400 px-6 py-3 rounded-lg font-rajdhani font-semibold hover:bg-purple-400/10 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300 hover:-translate-y-1"
          >
            <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span>Se Connecter</span>
          </button>
        </div>

        {/* Form */}
        <div className="bg-black/40 border border-cyber-blue/20 rounded-2xl p-8 backdrop-blur-sm">
          <div className="space-y-8">
            
            {/* Personal Information */}
            <div>
              <h3 className="font-orbitron text-xl font-semibold text-cyber-blue mb-6 flex items-center space-x-3">
                <User className="w-5 h-5" />
                <span>Informations Personnelles</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-rajdhani text-gray-300 mb-2">Prénom *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.firstName ? 'border-red-400 focus:ring-red-400/50' : 'border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue'
                    }`}
                    placeholder="Votre prénom"
                  />
                  {errors.firstName && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.firstName}</span>}
                </div>

                <div>
                  <label className="block font-rajdhani text-gray-300 mb-2">Nom *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.lastName ? 'border-red-400 focus:ring-red-400/50' : 'border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue'
                    }`}
                    placeholder="Votre nom"
                  />
                  {errors.lastName && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.lastName}</span>}
                </div>

                <div>
                  <label className="block font-rajdhani text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email ? 'border-red-400 focus:ring-red-400/50' : 'border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue'
                    }`}
                    placeholder="votre.email@example.com"
                  />
                  {errors.email && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.email}</span>}
                </div>

                <div>
                  <label className="block font-rajdhani text-gray-300 mb-2">Téléphone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.phone ? 'border-red-400 focus:ring-red-400/50' : 'border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue'
                    }`}
                    placeholder="+212 6 XX XX XX XX"
                  />
                  {errors.phone && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.phone}</span>}
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="font-orbitron text-xl font-semibold text-purple-400 mb-6 flex items-center space-x-3">
                <GraduationCap className="w-5 h-5" />
                <span>Informations Académiques</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-rajdhani text-gray-300 mb-2">Établissement</label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    readOnly
                    className="w-full bg-black/20 border border-purple-400/30 rounded-lg px-4 py-3 text-gray-400 font-rajdhani cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block font-rajdhani text-gray-300 mb-2">Filière *</label>
                  <select
                    name="field"
                    value={formData.field}
                    onChange={handleInputChange}
                    className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.field ? 'border-red-400 focus:ring-red-400/50' : 'border-purple-400/30 focus:ring-purple-400/50 focus:border-purple-400'
                    }`}
                  >
                    <option value="">Sélectionnez votre filière</option>
                    {fields.map(field => (
                      <option key={field.value} value={field.value} className="bg-cyber-darkest">
                        {field.label}
                      </option>
                    ))}
                  </select>
                  {errors.field && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.field}</span>}
                </div>

                {/* Show level only if field is selected and not prep years */}
                {formData.field && !['prepa-1', 'prepa-2'].includes(formData.field) && (
                  <div>
                    <label className="block font-rajdhani text-gray-300 mb-2">Niveau d'Études *</label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.level ? 'border-red-400 focus:ring-red-400/50' : 'border-purple-400/30 focus:ring-purple-400/50 focus:border-purple-400'
                      }`}
                    >
                      <option value="">Sélectionnez votre niveau</option>
                      {getLevels(formData.field).map(level => (
                        <option key={level} value={level} className="bg-cyber-darkest">{level}</option>
                      ))}
                    </select>
                    {errors.level && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.level}</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Technical Information */}
            <div>
              <h3 className="font-orbitron text-xl font-semibold text-cyan-400 mb-6 flex items-center space-x-3">
                <Code className="w-5 h-5" />
                <span>Expérience Technique</span>
              </h3>
              
              <div className="mb-6">
                <label className="block font-rajdhani text-gray-300 mb-2">Niveau de Programmation</label>
                <select
                  name="programmingExperience"
                  value={formData.programmingExperience}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 border border-cyan-400/30 rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-300"
                >
                  <option value="">Sélectionnez votre niveau</option>
                  {programmingLevels.map(level => (
                    <option key={level.value} value={level.value} className="bg-cyber-darkest">
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-rajdhani text-gray-300 mb-4">Centres d'Intérêt Techniques</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {interests.map(interest => (
                    <div
                      key={interest}
                      onClick={() => handleInterestChange(interest)}
                      className={`cursor-pointer border rounded-lg px-3 py-2 text-center font-rajdhani text-xs transition-all duration-300 hover:scale-105 ${
                        formData.interests.includes(interest)
                          ? 'bg-cyan-400/20 border-cyan-400/50 text-cyan-400'
                          : 'bg-black/30 border-gray-600/30 text-gray-300 hover:border-cyan-400/30'
                      }`}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-black/30 border border-purple-400/20 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-purple-400 bg-black border-purple-400 rounded focus:ring-purple-400/50"
                />
                <div className="flex-1">
                  <label className="font-rajdhani text-gray-300 text-sm">
                    J'accepte les conditions d'adhésion au club AIS et autorise le traitement de mes 
                    données personnelles conformément à la politique de confidentialité. *
                  </label>
                  {errors.agreeTerms && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.agreeTerms}</span>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-12 py-4 rounded-lg font-rajdhani font-semibold text-lg hover:shadow-lg hover:shadow-purple-400/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center space-x-3 mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Traitement en cours...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>CONFIRMER L'INSCRIPTION</span>
                  </>
                )}
              </button>              
              <p className="font-rajdhani text-gray-400 text-sm mt-4">
                Vous recevrez un email de confirmation avec le QR code WhatsApp
              </p>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/30 border border-cyber-blue/20 rounded-lg p-6">
            <Mail className="w-8 h-8 text-cyber-blue mb-3" />
            <h4 className="font-orbitron font-semibold text-cyber-blue mb-2">Confirmation Email</h4>
            <p className="font-rajdhani text-gray-300 text-sm">
              Vérifiez votre boîte mail après l'inscription
            </p>
          </div>
          
          <div className="bg-black/30 border border-purple-400/20 rounded-lg p-6">
            <Phone className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="font-orbitron font-semibold text-purple-400 mb-2">WhatsApp Group</h4>
            <p className="font-rajdhani text-gray-300 text-sm">
              QR code inclus dans l'email de confirmation
            </p>
          </div>
          
          <div className="bg-black/30 border border-green-400/20 rounded-lg p-6">
            <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
            <h4 className="font-orbitron font-semibold text-green-400 mb-2">Contact Équipe</h4>
            <p className="font-rajdhani text-gray-300 text-sm">
              Suivi personnalisé sous 48h maximum
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InscriptionPage;