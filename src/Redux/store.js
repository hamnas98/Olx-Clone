// store.js
import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './wishlistSlice';

import createSagaMiddleware from 'redux-saga';
import { wishlistSaga } from './wishlistFetchSaga';

import { loggerMiddleware } from './middleWare';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

// Setup persist config
const persistConfig = {
  key: 'wishlist',
  storage,
};

// Persist the wishlist reducer
const persistedWishlistReducer = persistReducer(persistConfig, wishlistReducer);

//  Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

//  Configure store
const store = configureStore({
  reducer: {
    wishlist: persistedWishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //  required for redux-persist to not throw serialization warnings
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(loggerMiddleware, sagaMiddleware),
});

//  Run saga
sagaMiddleware.run(wishlistSaga);

// Export persistor instead of store
 const persistor = persistStore(store);

 export {store, persistor}
