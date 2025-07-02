// // src/context/AuthContext.tsx
// import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import axios from '../lib/axios';
// import { GoogleLogin, googleLogout } from '@react-oauth/google';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   avatar?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (userData: {
//     name: string;
//     email: string;
//     password: string;
//     role: string;
//   }) => Promise<void>;
//   googleLogin: (credential: string) => Promise<void>;
//   logout: () => void;
//   isLoading: boolean;
//   checkAuth: () => Promise<boolean>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // 30 minutes in milliseconds
// const SESSION_TIMEOUT = 30 * 60 * 1000;

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
//   const [isLoading, setIsLoading] = useState(false);
//   const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);
//   const navigate = useNavigate();

//   const startLogoutTimer = useCallback(() => {
//     if (logoutTimer) clearTimeout(logoutTimer);
//     const timer = setTimeout(() => {
//       toast.warning('Your session has expired due to inactivity');
//       logout();
//     }, SESSION_TIMEOUT);
//     setLogoutTimer(timer);
//   }, [logoutTimer]);

//   const resetLogoutTimer = useCallback(() => {
//     if (token) startLogoutTimer();
//   }, [token, startLogoutTimer]);

//   const checkAuth = useCallback(async (): Promise<boolean> => {
//     if (!token) return false;
//     try {
//       const response = await axios.get('/auth/me');
//       setUser(response.data.user);
//       return true;
//     } catch (error) {
//       logout();
//       return false;
//     }
//   }, [token]);

//   useEffect(() => {
//     const initializeAuth = async () => {
//       if (token) {
//         await checkAuth();
//         startLogoutTimer();
//       }
//     };
//     initializeAuth();
//   }, [token, checkAuth, startLogoutTimer]);

//   useEffect(() => {
//     const events = ['mousedown', 'keypress', 'scroll', 'touchstart'];
//     events.forEach((event) => window.addEventListener(event, resetLogoutTimer));

//     const handleBeforeUnload = () => {
//       if (token) {
//         navigator.sendBeacon(`${axios.defaults.baseURL}/auth/logout`, JSON.stringify({ token }));
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       events.forEach((event) => window.removeEventListener(event, resetLogoutTimer));
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       if (logoutTimer) clearTimeout(logoutTimer);
//     };
//   }, [token, resetLogoutTimer, logoutTimer]);

//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post('/auth/login', { email, password });
//       const { user, token } = response.data;
      
//       localStorage.setItem('token', token);
//       setUser(user);
//       setToken(token);
//       startLogoutTimer();
//       toast.success('Login successful!');
//       navigate('/shop');
//     } catch (error: any) {
//       toast.error(error.message || 'Login failed. Please check your credentials.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const register = async (userData: {
//     name: string;
//     email: string;
//     password: string;
//     role: string;
//   }) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post('/auth/register', userData);
//       const { user, token } = response.data;
      
//       localStorage.setItem('token', token);
//       setUser(user);
//       setToken(token);
//       startLogoutTimer();
//       toast.success('Registration successful!');
//       navigate('/shop');
//     } catch (error: any) {
//       if (error.errors) {
//         Object.entries(error.errors).forEach(([field, messages]) => {
//           toast.error(`${field}: ${(messages as string[]).join(', ')}`);
//         });
//       } else {
//         toast.error(error.message || 'Registration failed. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const googleLogin = async (credential: string) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post('/auth/google', { credential });
//       const { user, token } = response.data;
      
//       localStorage.setItem('token', token);
//       setUser(user);
//       setToken(token);
//       startLogoutTimer();
//       toast.success('Google login successful!');
//       navigate('/shop');
//     } catch (error: any) {
//       toast.error(error.message || 'Google login failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     setToken(null);
//     if (logoutTimer) clearTimeout(logoutTimer);
//     navigate('/login');
//     toast.success('Logged out successfully');
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       token, 
//       login, 
//       register, 
//       googleLogin, 
//       logout, 
//       isLoading,
//       checkAuth
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from '../lib/axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          setIsLoading(true);
          const response = await axios.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
          setUser(response.data.user);
          setToken(storedToken);
          setIsAuthenticated(true);
          startLogoutTimer();
        } catch (error) {
          console.error('Authentication check failed:', error);
          localStorage.removeItem('token');
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();
  }, []);

  const startLogoutTimer = useCallback(() => {
    if (logoutTimer) clearTimeout(logoutTimer);
    const timer = setTimeout(() => {
      toast.warning('Your session has expired due to inactivity');
      logout();
    }, SESSION_TIMEOUT);
    setLogoutTimer(timer);
  }, [logoutTimer]);

  const resetLogoutTimer = useCallback(() => {
    if (token) startLogoutTimer();
  }, [token, startLogoutTimer]);

  useEffect(() => {
    const events = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, resetLogoutTimer));

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetLogoutTimer));
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [resetLogoutTimer, logoutTimer]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
      startLogoutTimer();
      toast.success('Login successful!');
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/shop');
      }
      // navigate('/shop');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/auth/register', userData);
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
      startLogoutTimer();
      toast.success('Registration successful!');
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/shop');
      }
      // navigate('/shop');
    } catch (error: any) {
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([field, messages]) => {
          toast.error(`${field}: ${(messages as string[]).join(', ')}`);
        });
      } else {
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (credential: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/auth/google', { credential });
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
      startLogoutTimer();
      toast.success('Google login successful!');
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/shop');
      }
      // navigate('/shop');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Google login failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    if (logoutTimer) clearTimeout(logoutTimer);
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      register, 
      googleLogin, 
      logout, 
      isLoading,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};