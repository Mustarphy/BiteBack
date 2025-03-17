import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config/firebase';
import { compressImage } from '../utils/imageCompression';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User changed:", user);
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message.replace('Firebase: ', '') };
    }
  };

  const register = async (email, password, name) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateFirebaseProfile(user, { displayName: name });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message.replace('Firebase: ', '') };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message.replace('Firebase: ', '') };
    }
  };

  const updateProfile = async (data) => {
    try {
      const updates = {};
      if (data.name) updates.displayName = data.name;
      if (data.photoFile) {
        const photoRef = ref(storage, `profile-photos/${currentUser.uid}`);
        let photoFile = data.photoFile;
        if (photoFile.size > 1024 * 1024) {
          photoFile = await compressImage(photoFile, 0.5);
        }
        const uploadTask = uploadBytesResumable(photoRef, photoFile);
        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed', null, reject, async () => {
            try {
              updates.photoURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            } catch (error) {
              reject(error);
            }
          });
        });
      }
      await updateFirebaseProfile(currentUser, updates);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message.replace('Firebase: ', '') };
    }
  };

  const sendVerificationEmail = async () => {
    try {
      await sendEmailVerification(currentUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message.replace('Firebase: ', '') };
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message.replace('Firebase: ', '') };
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    changePassword,
    updateProfile,
    sendVerificationEmail,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}
