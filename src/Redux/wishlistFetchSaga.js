import { call, put, takeEvery, select } from 'redux-saga/effects';
import { collection, getDocs } from 'firebase/firestore';
import { fireStore } from '../Components/Firebase/Firebase';
import {
  fetchWishlistSuccess,
  fetchWishlistFailure,
  fetchWishlist,
} from './wishlistActions';

// Selector to get current wishlist items from Redux state
const selectWishlistItems = (state) => state.wishlist.items;

function* fetchWishlistWorker(action) {
  try {
    // Check if items already exist in the store
    const existingItems = yield select(selectWishlistItems);

    if (existingItems && existingItems.length > 0) {
      console.log('Skipping Firebase fetch: wishlist already in store');
      return; // prevent redundant fetch
    }

    const userId = action.payload;
    const wishlistRef = collection(fireStore, 'wishlist', userId, 'items');
    const snapshot = yield call(getDocs, wishlistRef);

    const items = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });

    console.log('Fetched wishlist from Firebase');
    yield put(fetchWishlistSuccess(items));
  } catch (error) {
    yield put(fetchWishlistFailure(error.message));
  }
}

export function* wishlistSaga() {
  yield takeEvery(fetchWishlist.type, fetchWishlistWorker);
}
