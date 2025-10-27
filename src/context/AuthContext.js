import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('kunsthaus_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('kunsthaus_user');
      }
    }
  }, []);

  const signUp = useCallback(async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('kunsthaus_users') || '[]');
      const userExists = existingUsers.find(u => u.email === userData.email);
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        createdAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=c9a96e&color=0f0f0f`,
        preferences: {
          emailNotifications: true,
          smsAlerts: false,
          marketingEmails: false,
          weeklyDigest: true
        },
        stats: {
          activeBids: 0,
          wonAuctions: 0,
          watchlistItems: 0,
          totalSpent: 0
        }
      };
      
      // Save to localStorage
      existingUsers.push(newUser);
      localStorage.setItem('kunsthaus_users', JSON.stringify(existingUsers));
      localStorage.setItem('kunsthaus_user', JSON.stringify(newUser));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
      return newUser;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const signIn = useCallback(async (credentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user
      const existingUsers = JSON.parse(localStorage.getItem('kunsthaus_users') || '[]');
      const user = existingUsers.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('No account found with this email address');
      }
      
      // In a real app, you'd verify the password here
      // For demo purposes, we'll just check if password is provided
      if (!credentials.password) {
        throw new Error('Password is required');
      }
      
      // Save current user
      localStorage.setItem('kunsthaus_user', JSON.stringify(user));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return user;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('kunsthaus_user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const updateProfile = useCallback((updates) => {
    const updatedUser = { ...state.user, ...updates };
    
    // Update in localStorage
    localStorage.setItem('kunsthaus_user', JSON.stringify(updatedUser));
    
    // Update users array
    const existingUsers = JSON.parse(localStorage.getItem('kunsthaus_users') || '[]');
    const userIndex = existingUsers.findIndex(u => u.id === updatedUser.id);
    if (userIndex !== -1) {
      existingUsers[userIndex] = updatedUser;
      localStorage.setItem('kunsthaus_users', JSON.stringify(existingUsers));
    }
    
    dispatch({ type: 'LOGIN_SUCCESS', payload: updatedUser });
  }, [state.user]);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value = {
    ...state,
    signUp,
    signIn,
    signOut,
    updateProfile,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;