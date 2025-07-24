import { call, put, takeEvery } from 'redux-saga/effects';
import { collection, getDocs } from 'firebase/firestore';
import { fireStore } from '../Components/Firebase/Firebase';
import { fetchWishlistSuccess, fetchWishlistFailure, fetchWishlist } from './wishlistActions';

function* fetchWishlistWorker(action) {
  try {
    const userId = action.payload;
    const wishlistRef = collection(fireStore, 'wishlist', userId, 'items');
    const snapshot = yield call(getDocs, wishlistRef);

    const items = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });

    yield put(fetchWishlistSuccess(items));
  } catch (error) {
    yield put(fetchWishlistFailure(error.message));
  }
}

export function* wishlistSaga() {
  yield takeEvery(fetchWishlist.type, fetchWishlistWorker);
}
