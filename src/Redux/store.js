import { configureStore } from "@reduxjs/toolkit";

import wishlistReducer from './wishlistSlice'

import { loggerMiddleware } from "./middleWare";

import createSagaMiddleware from 'redux-saga';

import { wishlistSaga } from './wishlistFetchSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer : {
        wishlist : wishlistReducer
    },
    middleware : (getDefaultMiddleware) =>  getDefaultMiddleware().concat(loggerMiddleware). concat(sagaMiddleware)
})
sagaMiddleware.run(wishlistSaga);


export default store