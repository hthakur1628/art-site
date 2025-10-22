import React, { createContext, useContext, useReducer } from 'react';

const AuctionContext = createContext();

const initialState = {
  auctions: [],
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const auctionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUCTIONS':
      return {
        ...state,
        auctions: action.payload,
        loading: false
      };
    case 'UPDATE_BID':
      return {
        ...state,
        auctions: state.auctions.map(auction =>
          auction.id === action.payload.auctionId
            ? { ...auction, currentBid: action.payload.newBid }
            : auction
        )
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
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

export const AuctionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auctionReducer, initialState);

  const setAuctions = (auctions) => {
    dispatch({ type: 'SET_AUCTIONS', payload: auctions });
  };

  const updateBid = (auctionId, newBid) => {
    dispatch({ type: 'UPDATE_BID', payload: { auctionId, newBid } });
  };

  const setUser = (user) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    setAuctions,
    updateBid,
    setUser,
    setLoading,
    setError,
    clearError
  };

  return (
    <AuctionContext.Provider value={value}>
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (!context) {
    throw new Error('useAuction must be used within an AuctionProvider');
  }
  return context;
};

export default AuctionContext;