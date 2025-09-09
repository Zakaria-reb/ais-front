import React, { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff, Loader2, Shield, AlertTriangle, CheckCircle, ArrowRight, User, Key } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Simulate lockout timer
  useEffect(() => {
    let timer;
    if (isLocked && lockoutTime > 0) {
      timer = setInterval(() => {
        setLockoutTime(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockoutTime]);

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
    if (!validateForm() || isLocked) return;

    setIsLoading(true);

    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     password: formData.password,
      //     rememberMe: formData.rememberMe
      //   })
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate different login scenarios
      const mockResponse = simulateLoginResponse(formData.email, formData.password);

      if (mockResponse.success) {
        // TODO: Store authentication token
        // localStorage.setItem('authToken', mockResponse.token);
        // localStorage.setItem('userInfo', JSON.stringify(mockResponse.user));
        
        // TODO: Redirect to dashboard
        // window.location.href = '/dashboard';
        console.log('Login successful:', mockResponse);
        alert('Connexion réussie ! Redirection vers le tableau de bord...');
        
      } else {
        // Handle failed login
        setLoginAttempts(prev => prev + 1);
        
        if (loginAttempts + 1 >= 3) {
          setIsLocked(true);
          setLockoutTime(300); // 5 minutes lockout
          setErrors({ general: 'Trop de tentatives échouées. Compte verrouillé pendant 5 minutes.' });
        } else {
          setErrors({ 
            general: mockResponse.message,
            attemptsLeft: `${3 - (loginAttempts + 1)} tentative(s) restante(s)`
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Erreur de connexion. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function to simulate different login responses
  const simulateLoginResponse = (email, password) => {
    // Simulate successful login for demo
    if (email === 'admin@ais.com' && password === 'password123') {
      return {
        success: true,
        token: 'mock_jwt_token_' + Date.now(),
        user: {
          id: 1,
          email: email,
          firstName: 'Admin',
          lastName: 'AIS',
          role: 'admin',
          lastLogin: new Date().toISOString()
        }
      };
    }
    
    // Simulate member login
    if (email === 'member@ais.com' && password === 'member123') {
      return {
        success: true,
        token: 'mock_jwt_token_' + Date.now(),
        user: {
          id: 2,
          email: email,
          firstName: 'Membre',
          lastName: 'Test',
          role: 'member',
          lastLogin: new Date().toISOString()
        }
      };
    }

    // Simulate different error scenarios
    const mockErrors = [
      'Email ou mot de passe incorrect',
      'Compte non activé. Vérifiez votre email.',
      'Compte suspendu. Contactez l\'administration.',
    ];
    
    return {
      success: false,
      message: mockErrors[Math.floor(Math.random() * mockErrors.length)]
    };
  };

  const handleForgotPassword = async () => {
    if (!resetEmail.trim() || !/\S+@\S+\.\S+/.test(resetEmail)) {
      setErrors({ resetEmail: 'Email valide requis' });
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email: resetEmail })
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResetSent(true);
      setErrors({});
    } catch (error) {
      setErrors({ resetEmail: 'Erreur lors de l\'envoi. Réessayez.' });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest flex items-center justify-center px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-24 left-16 w-32 h-32 border border-purple-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-24 right-20 w-40 h-40 border-2 border-cyber-blue/15 rotate-45 animate-spin-slow"></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          <div className="bg-black/40 border border-purple-400/30 rounded-2xl p-8 backdrop-blur-sm">
            {!resetSent ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-400/20 rounded-full border border-purple-400/30 mb-4">
                    <Key className="w-8 h-8 text-purple-400" />
                  </div>
                  <h2 className="font-orbitron text-2xl font-bold text-purple-400 mb-2">
                    MOT DE PASSE OUBLIÉ
                  </h2>
                  <p className="font-rajdhani text-gray-300 text-sm">
                    Entrez votre email pour recevoir un lien de réinitialisation
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block font-rajdhani text-gray-300 mb-2">Email</label>
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

                  <button
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 rounded-lg font-rajdhani font-semibold hover:shadow-lg hover:shadow-purple-400/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center space-x-2"
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
                    className="w-full border border-cyber-blue/30 text-cyber-blue py-3 rounded-lg font-rajdhani font-semibold hover:bg-cyber-blue/10 transition-all duration-300"
                  >
                    Retour à la connexion
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="font-orbitron text-2xl font-bold text-green-400 mb-4">
                  EMAIL ENVOYÉ
                </h2>
                <p className="font-rajdhani text-gray-300 mb-6">
                  Un lien de réinitialisation a été envoyé à <span className="text-cyan-400">{resetEmail}</span>
                </p>
                <p className="font-rajdhani text-gray-400 text-sm mb-6">
                  Vérifiez votre boîte mail et vos spams
                </p>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetSent(false);
                    setResetEmail('');
                  }}
                  className="bg-gradient-to-r from-cyber-blue to-cyan-400 text-black px-6 py-3 rounded-lg font-rajdhani font-semibold hover:shadow-lg hover:shadow-cyber-blue/30 transition-all duration-300"
                >
                  Retour à la connexion
                </button>
              </div>
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

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <span className="font-fira text-sm text-cyber-blue bg-cyber-blue/10 px-4 py-2 rounded-full border border-cyber-blue/30">
              [ACCESS_TERMINAL]
            </span>
          </div>
          <h1 className="font-orbitron text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyber-blue via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CONNEXION AIS
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent mx-auto mb-4"></div>
          <p className="font-rajdhani text-gray-300">
            Accédez à votre espace membre sécurisé
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-black/40 border border-cyber-blue/20 rounded-2xl p-8 backdrop-blur-sm">
          {/* Security Status */}
          <div className="flex items-center justify-between mb-6 p-3 bg-black/30 rounded-lg border border-green-400/20">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="font-rajdhani text-green-400 text-sm">Connexion Sécurisée</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>

          {/* Error Messages */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-400/10 border border-red-400/30 rounded-lg flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-rajdhani text-red-400 font-semibold">{errors.general}</p>
                {errors.attemptsLeft && (
                  <p className="font-rajdhani text-red-300 text-sm mt-1">{errors.attemptsLeft}</p>
                )}
              </div>
            </div>
          )}

          {/* Lockout Message */}
          {isLocked && (
            <div className="mb-6 p-4 bg-orange-400/10 border border-orange-400/30 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Lock className="w-5 h-5 text-orange-400" />
                <span className="font-rajdhani text-orange-400 font-semibold">Compte Verrouillé</span>
              </div>
              <p className="font-rajdhani text-orange-300 text-sm">
                Réessayez dans {formatTime(lockoutTime)}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block font-rajdhani text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-black/30 border rounded-lg pl-12 pr-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email ? 'border-red-400 focus:ring-red-400/50' : 'border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue'
                  }`}
                  placeholder="votre.email@ais.com"
                  disabled={isLocked}
                />
              </div>
              {errors.email && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block font-rajdhani text-gray-300 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full bg-black/30 border rounded-lg pl-12 pr-12 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password ? 'border-red-400 focus:ring-red-400/50' : 'border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue'
                  }`}
                  placeholder="••••••••"
                  disabled={isLocked}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  disabled={isLocked}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.password}</span>}
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-cyber-blue bg-black border-cyber-blue rounded focus:ring-cyber-blue/50"
                  disabled={isLocked}
                />
                <label className="font-rajdhani text-gray-300 text-sm">
                  Se souvenir de moi
                </label>
              </div>
              <button
                onClick={() => setShowForgotPassword(true)}
                className="font-rajdhani text-purple-400 hover:text-purple-300 text-sm transition-colors"
                disabled={isLocked}
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading || isLocked}
              className="w-full bg-gradient-to-r from-cyber-blue to-cyan-400 text-black py-3 rounded-lg font-rajdhani font-semibold text-lg hover:shadow-lg hover:shadow-cyber-blue/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authentification...</span>
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  <span>SE CONNECTER</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Demo Credentials */}
            <div className="bg-black/30 border border-yellow-400/20 rounded-lg p-4">
              <h4 className="font-orbitron text-yellow-400 text-sm font-semibold mb-2">
                🔑 Comptes de démonstration :
              </h4>
              <div className="space-y-2 font-rajdhani text-xs">
                <div className="text-gray-300">
                  <span className="text-cyber-blue">Admin:</span> admin@ais.com / password123
                </div>
                <div className="text-gray-300">
                  <span className="text-purple-400">Membre:</span> member@ais.com / member123
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="font-rajdhani text-gray-400 text-sm">
            Pas encore membre ? 
            <button className="text-purple-400 hover:text-purple-300 ml-1 transition-colors">
              Rejoignez AIS
            </button>
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-xs font-rajdhani text-gray-500">
            <span>Sécurisé par SSL</span>
            <span>•</span>
            <span>2FA Disponible</span>
            <span>•</span>
            <span>Protection CSRF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;