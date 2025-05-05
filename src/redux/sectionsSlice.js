// store/sectionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  sections: [{ id: 1, name: 'Section 1' }],
  // dragableItems: [
};

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    addSection: (state) => {
      const newId = state.sections.length + 1;
      state.sections.push({ id: newId, name: `Section ${newId}` });
    },
    deleteSection: (state, action) => {
      state.sections = state.sections.filter(section => section.id !== action.payload);
    },
  },
});

export const { addSection } = sectionsSlice.actions;
export default sectionsSlice.reducer;
