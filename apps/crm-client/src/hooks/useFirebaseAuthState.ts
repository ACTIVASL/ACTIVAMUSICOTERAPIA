import { useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export function useFirebaseAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  /* AUTH STATE LISTENER */
  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setDemoMode(false);
        setError(null);

        // FOUNDER OVERRIDE: Always premium for admin
        if (currentUser.email === 'info@activamusicoterapia.com') {
          setIsPremium(true);
          setLoading(false);
          return;
        }

        // Real Firestore Listener for Customers
        unsubscribeProfile = onSnapshot(
          doc(db, 'users', currentUser.uid),
          (docSnapshot) => {
            const data = docSnapshot.data();
            const status = data?.subscriptionStatus?.toLowerCase();
            setIsPremium(status === 'premium' || status === 'lifetime');
            setLoading(false);
          },
          (err) => {
            console.error('Error fetching profile:', err);
            setIsPremium(false);
            setLoading(false);
          },
        );
      } else {
        setIsPremium(false);
        if (unsubscribeProfile) unsubscribeProfile();
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      console.error('Login Failed:', err);
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message || 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCred.user);
    } catch (err: unknown) {
      console.error('Registration Failed:', err);
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message || 'Error al registrar usuario');
      setLoading(false);
    }
  };

  const signOut = async () => {
    setDemoMode(false);
    localStorage.removeItem('demo_patients');
    await firebaseSignOut(auth);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const { GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } =
        await import('firebase/auth');
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      console.error('Google Login Failed:', err);
      let message = 'Error al iniciar sesión con Google';
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    demoMode,
    isPremium,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  };
}
