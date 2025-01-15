'use client';
import { configureStore } from '@reduxjs/toolkit';
import shoesReducer from '@/features/shoes-slice';
import userReducer from '@/features/user-slice';
import orderReducer from '@/features/order-slice';
import favReducer from '@/features/fav-slice'
import commentReducer from '@/features/comment-slice'
import ClothesReducer from '@/features/clothes-slice'
import AccessoriesReducer from '@/features/accessories-slice'
// import cartReducer from '@/features/cart-slice';

export const store = configureStore({
  reducer: {
    shoes: shoesReducer,
    user: userReducer,
    order: orderReducer,
    fav: favReducer,
    comment: commentReducer,
    clothes: ClothesReducer,
    accessories: AccessoriesReducer,
    // cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
