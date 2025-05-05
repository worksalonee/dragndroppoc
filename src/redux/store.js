import { configureStore } from '@reduxjs/toolkit';
import sectionsReducer from './sectionsSlice';

export const store = configureStore({
  reducer: {
    sections: sectionsReducer,
  },
});