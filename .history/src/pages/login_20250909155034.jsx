import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, Shield, User, AlertTriangle, CheckCircle } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Simulate backend validation
  const validateCredentials = (email, password) => {
    // Mock user database - In real app, this would be backend API call
    const mockUsers = [
      { email: 'admin@ais.ensa.ma', password: 'AIS2024!', role: 'admin', name: 'Admin AIS' },
      { email: 'president@ais.ensa.ma', password: 'President123!', role: 'president', name: 'Mohammed Alami' },
      { email: 'member@ais.ensa.ma', password: 'Member2024', role: 'member', name: 'Fatima Benali' },
      { email: 'test@student.ma', password: 'Test123', role: 'member', name: 'Test User' }
    ];

    return mockUsers.find(user => user.email === email && user.password === password);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    if (isLocked) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Validate credentials
    const user = validateCredentials(formData.email, formData.password);

    if (user) {
      // Success - In real app, store JWT token, redirect to dashboard
      console.log('Login successful:', user);
      localStorage.setItem('ais_user', JSON.stringify(user)); // Note: In real app, use secure token storage
      setLoginAttempts(0);
      // Redirect to dashboard would happen here
      alert(`Connexion réussie! Bienvenue ${user.name}`);
    } else {
      // Failed login
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        setErrors({ general: 'Compte temporairement verrouillé après 3 tentatives échouées. Réessayez dans 15 minutes.' });
        // In real app, implement server-side lockout
        setTimeout(() => {
          setIsLocked(false);
          setLoginAttempts(0);
        }, 15 * 60 * 1000); // 15 minutes
      } else {
        setErrors({ 
          general: `Identifiants incorrects. ${3 - newAttempts} tentative(s) restante(s).`
        });
      }
    }

    setIsLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!resetEmail.trim()) {
      setErrors({ resetEmail: 'L\'email est requis' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setErrors({ resetEmail: 'Format d\'email invalide' });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In real app, send reset email via backend
    setResetSent(true);
    setIsLoading(false);
    
    // Auto close after 3 seconds
    setTimeout(() => {
      setShowForgotPassword(false);
      setResetSent(false);
      setResetEmail('');
    }, 3000);
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest flex items-center justify-center px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-24 left-16 w-32 h-32 border border-purple-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-24 right-20 w-40 h-40 border-2 border-cyber-blue/15 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-cyan-400/25 rounded-full animate-bounce-slow"></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          <div className="bg-black/40 border border-purple-400/30 rounded-2xl p-8 backdrop-blur-sm">
            {resetSent ? (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-pulse" />
                <h2 className="font-orbitron text-2xl font-bold text-green-400 mb-4">
                  EMAIL ENVOYÉ
                </h2>
                <p className="font-rajdhani text-gray-300 mb-6">
                  Un lien de réinitialisation a été envoyé à <span className="text-cyan-400">{resetEmail}</span>
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"></div>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="inline-block mb-4">
                    <span className="font-fira text-sm text-purple-400 bg-purple-400/10 px-4 py-2 rounded-full border border-purple-400/30">
                      [PASSWORD_RECOVERY]
                    </span>
                  </div>
                  <h1 className="font-orbitron text-3xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      RÉCUPÉRATION
                    </span>
                  </h1>
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-4"></div>
                  <p className="font-rajdhani text-gray-300">
                    Entrez votre email pour recevoir un lien de réinitialisation
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block font-rajdhani text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.resetEmail ? 'border-red-400 focus:ring-red-400/50' : 'border-purple-400/30 focus:ring-purple-400/50 focus:border-purple-400'
                      }`}
                      placeholder="votre.email@example.com"
                    />
                    {errors.resetEmail && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.resetEmail}</span>}
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handleForgotPassword}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-rajdhani font-semibold hover:shadow-lg hover:shadow-purple-400/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center space-x-3"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          <span>ENVOYER LE LIEN</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setShowForgotPassword(false);
                        setResetEmail('');
                        setErrors({});
                      }}
                      className="w-full border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-rajdhani font-semibold hover:bg-gray-600/10 transition-all duration-300 hover:-translate-y-1"
                    >
                      Retour à la connexion
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-24 left-16 w-32 h-32 border border-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-24 right-20 w-40 h-40 border-2 border-cyber-blue/15 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-cyan-400/25 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Panel - Login Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-black/40 border border-cyber-blue/20 rounded-2xl p-8 backdrop-blur-sm">
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-block mb-4">
                  <span className="font-fira text-sm text-cyber-blue bg-cyber-blue/10 px-4 py-2 rounded-full border border-cyber-blue/30">
                    [AUTH_PROTOCOL]
                  </span>
                </div>
                <h1 className="font-orbitron text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyber-blue via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    CONNEXION
                  </span>
                </h1>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent mx-auto mb-4"></div>
                <p className="font-rajdhani text-gray-300">
                  Accédez à votre espace membre AIS
                </p>
              </div>

              {/* Error Message */}
              {errors.general && (
                <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4 mb-6 flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="font-rajdhani text-red-400 text-sm">{errors.general}</span>
                </div>
              )}

              {/* Login Form */}
              <div className="space-y-6">
                <div>
                  <label className="block font-rajdhani text-gray-300 mb-2 flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email ? 'border-red-400 focus:ring-red-400/50' : 'border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue'
                    }`}
                    placeholder="votre.email@ais.ensa.ma"
                  />
                  {errors.email && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.email}</span>}
                </div>

                <div>
                  <label className="block font-rajdhani text-gray-300 mb-2 flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Mot de passe *</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full bg-black/30 border rounded-lg px-4 py-3 pr-12 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.password ? 'border-red-400 focus:ring-red-400/50' : 'border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue'
                      }`}
                      placeholder="Votre mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyber-blue transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.password}</span>}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-cyber-blue bg-black border-cyber-blue rounded focus:ring-cyber-blue/50"
                    />
                    <label className="font-rajdhani text-gray-300 text-sm">Se souvenir de moi</label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="font-rajdhani text-cyan-400 text-sm hover:text-cyan-300 transition-colors duration-300"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                {/* Login Attempts Warning */}
                {loginAttempts > 0 && !isLocked && (
                  <div className="bg-orange-400/10 border border-orange-400/30 rounded-lg p-3 flex items-center space-x-3">
                    <Shield className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span className="font-rajdhani text-orange-400 text-xs">
                      {loginAttempts} tentative(s) échouée(s). Compte verrouillé après 3 tentatives.
                    </span>
                  </div>
                )}

                {/* Login Button */}
                <button
                  onClick={handleLogin}
                  disabled={isLoading || isLocked}
                  className="w-full bg-gradient-to-r from-cyber-blue to-cyan-400 text-black px-6 py-4 rounded-lg font-rajdhani font-semibold text-lg hover:shadow-lg hover:shadow-cyber-blue/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center space-x-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Connexion...</span>
                    </>
                  ) : isLocked ? (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>COMPTE VERROUILLÉ</span>
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5" />
                      <span>SE CONNECTER</span>
                    </>
                  )}
                </button>

                {/* Sign Up Link */}
                <div className="text-center pt-4 border-t border-gray-700/30">
                  <p className="font-rajdhani text-gray-400 text-sm">
                    Pas encore membre ?{' '}
                    <button className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300">
                      Rejoignez AIS
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Info */}
          <div className="order-1 lg:order-2 space-y-6">
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/30 border border-cyber-blue/20 rounded-lg p-4">
                <Mail className="w-6 h-6 text-cyber-blue mb-2" />
                <h4 className="font-orbitron font-semibold text-cyber-blue text-sm mb-1">Notifications</h4>
                <p className="font-rajdhani text-gray-300 text-xs">
                  Recevez les dernières actualités du club
                </p>
              </div>
              
              <div className="bg-black/30 border border-green-400/20 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
                <h4 className="font-orbitron font-semibold text-green-400 text-sm mb-1">Événements</h4>
                <p className="font-rajdhani text-gray-300 text-xs">
                  Inscrivez-vous aux ateliers et conférences
                </p>
              </div>

              <div className="bg-black/30 border border-purple-400/20 rounded-lg p-4">
                <User className="w-6 h-6 text-purple-400 mb-2" />
                <h4 className="font-orbitron font-semibold text-purple-400 text-sm mb-1">Profil</h4>
                <p className="font-rajdhani text-gray-300 text-xs">
                  Gérez vos informations personnelles
                </p>
              </div>

              <div className="bg-black/30 border border-cyan-400/20 rounded-lg p-4">
                <Shield className="w-6 h-6 text-cyan-400 mb-2" />
                <h4 className="font-orbitron font-semibold text-cyan-400 text-sm mb-1">Sécurité</h4>
                <p className="font-rajdhani text-gray-300 text-xs">
                  Connexion sécurisée et protection des données
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 text-gray-500 font-rajdhani text-xs">
            <span>© 2024 AIS Club ENSA El Jadida</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>Système sécurisé</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>Support: contact@ais.ensa.ma</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add custom animations via CSS-in-JS or global styles
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500&display=swap');
  
  :root {
    --cyber-dark: #0a0a0a;
    --cyber-darker: #050505;
    --cyber-darkest: #000000;
    --cyber-blue: #00d4ff;
  }
  
  .font-orbitron { font-family: 'Orbitron', monospace; }
  .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
  .font-fira { font-family: 'Fira Code', monospace; }
  
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  .animate-spin-slow { animation: spin-slow 20s linear infinite; }
  .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
`;
document.head.appendChild(style);

export default LoginPage;