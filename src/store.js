import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from './slices/selectionSlice';
import rankingReducer from './slices/rankingSlice';

export const store = configureStore({
  reducer: {
    selected: selectedReducer,
    ranking: rankingReducer,
  },
});