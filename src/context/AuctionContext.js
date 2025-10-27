import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { useAuth } from './AuthContext';

const AuctionContext = createContext();

const initialState = {
  auctions: [],
  userBids: [],
  watchlist: [],
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
            ? { 
                ...auction, 
                currentBid: action.payload.newBid,
                bidCount: auction.bidCount + 1
              }
            : auction
        ),
        userBids: [
          ...state.userBids,
          {
            id: Date.now(),
            auctionId: action.payload.auctionId,
            amount: action.payload.newBid,
            timestamp: new Date(),
            status: 'active'
          }
        ]
      };
    case 'ADD_TO_WATCHLIST':
      return {
        ...state,
        watchlist: [...state.watchlist, action.payload]
      };
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(id => id !== action.payload)
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
  const { user, isAuthenticated, isLoading } = useAuth();

  const setAuctions = useCallback((auctions) => {
    dispatch({ type: 'SET_AUCTIONS', payload: auctions });
  }, []);

  const updateBid = useCallback((auctionId, newBid) => {
    dispatch({ type: 'UPDATE_BID', payload: { auctionId, newBid } });
  }, []);

  const addToWatchlist = useCallback((auctionId) => {
    dispatch({ type: 'ADD_TO_WATCHLIST', payload: auctionId });
  }, []);

  const removeFromWatchlist = useCallback((auctionId) => {
    dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: auctionId });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value = {
    ...state,
    user,
    isAuthenticated,
    isLoading,
    setAuctions,
    updateBid,
    addToWatchlist,
    removeFromWatchlist,
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