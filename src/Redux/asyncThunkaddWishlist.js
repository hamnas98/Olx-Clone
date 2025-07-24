import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { fireStore } from '../Components/Firebase/Firebase';

// Add
export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({ userId, item }, thunkAPI) => {
    try {
      const userWishlistRef = collection(fireStore, 'wishlist', userId, 'items');
      const docRef = await addDoc(userWishlistRef, item);

      // Return the item with id
      return { id: docRef.id, ...item };
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Remove
export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async ({ userId, itemId }, thunkAPI) => {
    try {
      const itemRef = doc(fireStore, 'wishlist', userId, 'items', itemId);
      await deleteDoc(itemRef);

      // Return only the id so we can filter from state
      return itemId;
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
