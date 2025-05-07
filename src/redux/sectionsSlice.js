import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSectionId:null,
  sections: [{ id: 1, name: 'Section 1' }],
  items: [
    { id: 1, fieldName: 'Single-line', name: 'singleLine', value: '', placeholder: 'Enter the single line' },
    { id: 2, fieldName: 'Multi-line', name: 'multiLine', value: '', placeholder: 'Enter the multiline line' },
    { id: 3, name: 'phone', fieldName: 'phone', value: '', placeholder: 'Enter the phone number' },
    { id: 4, name: 'email', fieldName: 'email', value: '', placeholder: 'Enter the email' },
    { id: 5, name: 'Address', fieldName: 'Address', value: '', placeholder: 'Enter Address' },
    { id: 6, name: 'Date', fieldName: 'Date', value: '', placeholder: 'Enter the date' },
    { id: 7, name: 'Time', fieldName: 'Time', value: '', placeholder: 'Enter Time' },
    { id: 8, name: 'Dropdown', fieldName: 'DropDown', value: '', placeholder: 'Enter dropdown' },
    { id: 9, fieldName: 'Single-line', name: 'Checkbox', value: '', placeholder: 'Enter checkbox need to be add' },
    { id: 10, fieldName: 'Radio', name: 'Radio', value: '', placeholder: 'radio buttons to be add' },
    { id: 11, fieldName: 'Upload File', name: 'Upload File', value: '', placeholder: 'Please Upload File' },
    { id: 12, name: 'Image', fieldName: 'Image', value: '', placeholder: 'Please Upload Image' },
    { id: 13, name: 'Video', fieldName: 'Video', value: '', placeholder: 'Please Upload Video' },
    { id: 14, name: 'url', fieldName: 'Single-line', value: '', placeholder: 'Enter url' },
  ],
};

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    addSection: (state, action) => {
      const id = action.payload.id;
      state.sections.push({
        id,
        name: `Section ${state.sections.length + 1}`,
      });
    },
    deleteSection: (state, action) => {
      const sectionId = action.payload;
      state.sections = state.sections.filter(section => section.id !== sectionId);
      if (state.currentSectionId === sectionId) {
        state.currentSectionId = state.sections.length ? state.sections[0].id : null;
      }
    },
    setCurrentSectionId: (state, action) => {
      state.currentSectionId = action.payload;
    },
    updateItemValue: (state, action) => {
      const { name, value } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.value = value;
      }
    },
  },
});

export const {
  addSection,
  deleteSection,
  setCurrentSectionId,
  updateItemValue,
} = sectionsSlice.actions;

export default sectionsSlice.reducer;
