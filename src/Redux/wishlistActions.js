import { createAction } from '@reduxjs/toolkit';

export const fetchWishlist = createAction('wishlist/fetchWishlist');
export const fetchWishlistSuccess = createAction('wishlist/fetchWishlistSuccess');
export const fetchWishlistFailure = createAction('wishlist/fetchWishlistFailure');
