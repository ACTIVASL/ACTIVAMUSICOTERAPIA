import React, { useState, useEffect } from 'react';
import { useFirebaseAuthState } from './useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, ArrowRight, AlertCircle, ShieldCheck, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';
import logoCircular from './assets/logo-alpha.png';
import loginBg from './assets/login-bg-premium.png';

export interface LoginViewProps {
  logoUrl?: string;
  onLoginSuccess?: () => void;
}

export const LoginView = () => {
  const { signIn, signUp, signInWithGoogle, loading, error: authError } = useFirebaseAuthState();
  const navigate = useNavigate();

  // States
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Formatting & Validation States
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Feature States
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Animation State
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Validation Logic
  const validateEmail = (val: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      setEmailError('Campo requerido');
      setIsEmailValid(false);
      return false;
    } else if (!regex.test(val)) {
      setEmailError('Email inválido');
      setIsEmailValid(false);
      return false;
    } else {
      setEmailError('');
      setIsEmailValid(true);
      return true;
    }
  };

  const validatePassword = (val: string) => {
    if (!val) {
      setPasswordError('Campo requerido');
      return false;
    } else if (val.length < 6) {
      setPasswordError('Mínimo 6 caracteres');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  // Handlers
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (emailError || isEmailValid) validateEmail(val);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (passwordError) validatePassword(val);
  };

  const handleBlurEmail = () => validateEmail(email);
  const handleBlurPassword = () => validatePassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final Validation before Submit
    const isEmailOk = validateEmail(email);
    const isPassOk = validatePassword(password);

    if (!isEmailOk || !isPassOk) return;

    if (isRegistering) {
      if (!termsAccepted) {
        alert('Debes aceptar los Términos para continuar.');
        return;
      }
      await signUp(email, password);
      // AuthProvider handles navigation usually, but explicit here just in case
      navigate('/dashboard');
    } else {
      await signIn(email, password);
      navigate('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans">

      {/* 1. BACKGROUND: USER PROVIDED PREMIUM IMAGE (ZOOMED 125%) */}
      <div className="absolute inset-0 z-0">
        <img
          src={loginBg}
          alt="Background"
          className="w-full h-full object-cover scale-125 animate-in fade-in duration-1000"
        />
        {/* Subtle Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/5 mix-blend-overlay"></div>
      </div>

      {/* 2. MAIN CARD: PREMIUM SPEC (Gradient + Blur + High Opacity) */}
      <div className={`relative z-10 w-full max-w-sm space-y-6 p-8 md:p-10 rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-[#00B2A9]/30 border border-white/80 transition-all duration-1000 ease-out transform ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 249, 251, 0.96) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}>

        {/* HEADER */}
        <div className="flex flex-col items-center text-center">

          {/* PREMIUM CIRCULAR LOGO EFFECT */}
          <div className="relative w-28 h-28 mb-6 group cursor-default">
            {/* 1. Orbit Ring 1 (Pink) */}
            <div className="absolute inset-0 rounded-full border-[2px] border-transparent border-t-[#EC008C] border-l-[#EC008C]/30 animate-[spin_4s_linear_infinite] opacity-60"></div>
            {/* 2. Orbit Ring 2 (Turquoise - Clinical) */}
            <div className="absolute inset-2 rounded-full border-[2px] border-transparent border-b-[#00B2A9] border-r-[#00B2A9]/30 animate-[spin_6s_linear_infinite_reverse] opacity-40"></div>
            {/* 3. Outer Glow Pulse */}
            <div className="absolute inset-0 rounded-full bg-[#EC008C] opacity-5 blur-xl group-hover:opacity-20 transition-all duration-700 animate-pulse"></div>

            {/* 4. The Logo Container */}
            <div className="absolute inset-3 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden ring-4 ring-white z-10 transform group-hover:scale-105 transition-transform duration-500">
              <img
                src={logoCircular}
                alt="Activa Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-800 tracking-tighter drop-shadow-sm">
            MÉTODO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC008C] to-pink-600">ACTIVA</span>
          </h2>
          <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em]">
            Clinical Operating System
          </p>
        </div>

        {/* AUTH ERROR MESSAGE */}
        {authError && (
          <div className="animate-pulse rounded-xl bg-red-50 p-3 border border-red-100 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-xs text-red-600 font-bold">{authError}</p>
          </div>
        )}

        {/* FORM */}
        <form className="mt-2 space-y-5" onSubmit={handleSubmit}>

          {/* EMAIL INPUT (TURQUOISE FOCUS) */}
          <div className="group relative">
            <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-[#00B2A9]">
              ID Profesional
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                onBlur={handleBlurEmail}
                className={`block w-full px-5 py-4 bg-white border-2 text-slate-900 rounded-2xl focus:outline-none transition-all duration-200 font-bold text-sm placeholder:text-slate-400 shadow-sm
                  ${emailError
                    ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]'
                    : 'border-slate-200 hover:border-slate-300 focus:border-[#00B2A9] focus:shadow-[0_0_0_4px_rgba(0,178,169,0.15)]'
                  }
                `}
                placeholder="usuario@clinica.com"
              />
              {/* Validation Icon */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-300">
                {isEmailValid && !emailError && <CheckCircle2 className="w-5 h-5 text-emerald-500 animate-in zoom-in" />}
                {emailError && <XCircle className="w-5 h-5 text-red-500 animate-in zoom-in" />}
              </div>
            </div>
            {/* Error Message */}
            {emailError && (
              <span className="text-[10px] font-bold text-red-500 ml-1 mt-1 flex items-center gap-1 animate-in slide-in-from-top-1">
                <AlertCircle className="w-3 h-3" /> {emailError}
              </span>
            )}
          </div>

          {/* PASSWORD INPUT (TURQUOISE FOCUS) */}
          <div className="group relative">
            <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-[#00B2A9]">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={handlePasswordChange}
                onBlur={handleBlurPassword}
                className={`block w-full px-5 py-4 bg-white border-2 text-slate-900 rounded-2xl focus:outline-none transition-all duration-200 font-bold text-sm placeholder:text-slate-400 shadow-sm pr-12
                  ${passwordError
                    ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]'
                    : 'border-slate-200 hover:border-slate-300 focus:border-[#00B2A9] focus:shadow-[0_0_0_4px_rgba(0,178,169,0.15)]'
                  }
                `}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00B2A9] transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* Error Message */}
            {passwordError && (
              <span className="text-[10px] font-bold text-red-500 ml-1 mt-1 flex items-center gap-1 animate-in slide-in-from-top-1">
                <AlertCircle className="w-3 h-3" /> {passwordError}
              </span>
            )}
          </div>

          {/* EXTRAS: FORGOT PASSWORD & REMEMBER ME */}
          {!isRegistering && (
            <div className="flex items-center justify-between px-1">
              {/* Checkbox */}
              <div className="flex items-center group cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center mr-2 ${rememberMe ? 'bg-[#00B2A9] border-[#00B2A9]' : 'border-slate-300 bg-white group-hover:border-[#00B2A9]'}`}>
                  {rememberMe && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <span className="text-xs text-slate-500 font-medium group-hover:text-slate-700 transition-colors select-none">Recordarme</span>
              </div>

              {/* Forgot Link */}
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-slate-500 hover:text-[#EC008C] decoration-transparent hover:underline transition-all"
              >
                ¿Olvidé mi contraseña?
              </Link>
            </div>
          )}

          {isRegistering && (
            <div className="flex items-center animate-in fade-in pl-1">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="h-4 w-4 text-[#EC008C] focus:ring-[#EC008C] border-slate-300 rounded-lg cursor-pointer"
              />
              <label htmlFor="terms" className="ml-2 block text-xs text-slate-500 font-medium select-none">
                Acepto los <span className="font-bold text-slate-700 cursor-pointer hover:text-[#EC008C]">Términos de Uso</span>
              </label>
            </div>
          )}

          <div className="space-y-4 pt-2">
            {/* PRIMARY BUTTON (MASTER PLAN HOVER STATES) */}
            <button
              type="submit"
              disabled={loading}
              className={`relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white shadow-lg transition-all duration-200 transform overflow-hidden group
                ${loading
                  ? 'bg-slate-300 cursor-not-allowed scale-[0.99] shadow-inner'
                  : 'bg-gradient-to-r from-[#EC008C] to-pink-600 hover:to-pink-500 hover:shadow-[0_8px_25px_-5px_rgba(236,0,140,0.5)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0'
                }
              `}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span className="tracking-wide">INICIANDO...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2 tracking-wide">
                  {isRegistering ? 'CREAR CUENTA' : 'INICIAR SESIÓN'}
                  <ArrowRight className="w-5 h-5 opacity-80 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>

            <div className="relative py-2 opacity-80">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                <span className="bg-white px-3 text-slate-400">O continúa con</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-slate-100 rounded-2xl shadow-sm bg-white text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-200 hover:text-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-50 transition-all active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
          </div>
        </form>

        {/* 6. CREATE ACCOUNT LINK (High Visibility) */}
        <div className="text-center pt-3">
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setEmailError('');
              setPasswordError('');
            }}
            className="text-sm font-bold text-[#00B2A9] hover:text-[#EC008C] hover:underline transition-all uppercase tracking-wide"
          >
            {isRegistering
              ? '← Volver al Login'
              : '¿No tienes cuenta? Crear una'}
          </button>
        </div>

        {/* Footer Credits */}
        <div className="flex justify-center pt-4 opacity-50 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={11} className="text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secured by Google Cloud</span>
          </div>
        </div>

      </div>
    </div>
  );
};
