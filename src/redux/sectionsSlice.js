// store/sectionsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSectionId: 1,
  sections:  [{ id: 1, name: "Section 1", droppedItems: [] }],
  items : [
  {
    id: 1,
    fieldName: "Single-line",
    name: "singleLine",
    type: "text",
    value: "",
    placeholder: "Enter the single line",
    label: "Single Line",
    validation: {
      required: true,
      minLength: 1,
      maxLength: 100,
      pattern: null,
      message: "This field is required",
    },
    options: null,
  },
  {
    id: 2,
    fieldName: "Multi-line",
    name: "multiLine",
    type: "textarea",
    value: "",
    placeholder: "Enter the multiline text",
    validation: {
      required: false,
      minLength: null,
      maxLength: null,
      pattern: null,
      message: null,
    },
    options: null,
  },
  {
    id: 3,
    name: "phone",
    fieldName: "Mobile",
    type: "number",
    value: "",
    placeholder: "Enter the phone number",
    validation: {
      required: true,
      minLength: 10,
      maxLength: 15,
      pattern: "^[0-9]+$",
      message: "Enter a valid phone number",
    },
    options: null,
  },
  {
    id: 4,
    name: "email",
    fieldName: "Email",
    type: "email",
    value: "",
    placeholder: "Enter the email",
    validation: {
      required: true,
      minLength: null,
      maxLength: null,
      pattern: "^[\\w.-]+@[\\w.-]+\\.\\w+$",
      message: "Enter a valid email",
    },
    options: null,
  },
  {
    id: 5,
    name: "Address",
    fieldName: "Address",
    type: "text",
    value: "",
    placeholder: "Enter Address",
    validation: {
      required: true,
      minLength: 5,
      maxLength: 100,
      pattern: null,
      message: null,
    },
    options: null,
  },
  {
    id: 6,
    name: "Date",
    fieldName: "Date",
    type: "date",
    value: "",
    placeholder: "Enter the date",
    validation: {
      required: true,
      minLength: null,
      maxLength: null,
      pattern: null,
      message: null,
    },
    options: null,
  },
  {
    id: 7,
    name: "Time",
    fieldName: "Time",
    type: "time",
    value: "",
    placeholder: "Enter Time",
    validation: {
      required: true,
      minLength: null,
      maxLength: null,
      pattern: null,
      message: null,
    },
    options: null,
  },
  {
    id: 8,
    name: "DropDown",
    fieldName: "DropDown",
    type: "dropdown",
    value: "",
    placeholder: "Select an option",
    validation: {
      required: true,
      minLength: null,
      maxLength: null,
      pattern: null,
      message: "Please select an option",
    },
    options: {
      source: null,
      url: null,
      options: ["Fruit Trees", "Timber Trees", "Medicinal Trees", "Other"],
    },
  },
  {
    id: 9,
    name: "Radio",
    fieldName: "Radio",
    type: "radio",
    value: "",
    placeholder: "",
    validation: {
      required: true,
      minLength: null,
      maxLength: null,
      pattern: null,
      message: "Please select an option",
    },
    options: {
      source: null,
      url: null,
      options: ["Fruit Trees", "Timber Trees", "Medicinal Trees", "Other"],
    },
  },
  {
    id: 10,
    name: "Upload File",
    fieldName: "Upload File",
    type: "file",
    value: "",
    placeholder: "Upload a file",
    validation: {
      required: true,
      minLength: null,
      maxLength: null,
      pattern: null,
      message: "File is required",
    },
    options: null,
  },
  {
    id: 11,
    name: "Image",
    fieldName: "Image",
    type: "file",
    value: "",
    placeholder: "Upload an image",
    validation: {
      required: false,
      minLength: null,
      maxLength: null,
      pattern: null,
      message: null,
    },
    options: null,
  },
  {
    id: 12,
    name: "Video",
    fieldName: "Video",
    type: "file",
    value: "",
    placeholder: "Upload a video",
    validation: {
      required: false,
      minLength: null,
      maxLength: null,
      pattern: null,
      message: null,
    },
    options: null,
  },
  {
    id: 13,
    name: "url",
    fieldName: "URL",
    type: "url",
    value: "",
    placeholder: "Enter URL",
    validation: {
      required: false,
      minLength: null,
      maxLength: null,
      pattern: "^(https?:\\/\\/)?([\\w.-]+)\\.([a-z]{2,6})([\\/\\w .-]*)*\\/?$",
      message: "Please enter a valid URL",
    },
    options: null,
  },
],

  selectedLayout: null,
};

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    addSection: (state, action) => {
      const newSection = { ...action.payload, droppedItems: [] }; // Now accepts section with custom ID and name
      state.sections.push(newSection);
    },

   deleteSection: (state, action) => {
    const sectionIdToDelete = action.payload;
    state.sections = state.sections.filter((sec) => sec.id !== sectionIdToDelete);
    
    // If current section is deleted, reset to another valid one
    if (state.currentSectionId === sectionIdToDelete) {
      const remaining = state.sections.map((s) => s.id);
      state.currentSectionId = remaining.length > 0 ? remaining[0] : null;
    }
  },
    addDroppedItemToSection: (state, action) => {
      const { sectionId, item } = action.payload;
      const section = state.sections.find((s) => s.id === sectionId);
      if (section) {
        section.droppedItems.push(item);
      }
    },
    updateDroppedItemInSection: (state, action) => {
      const { sectionId, itemId, key, value } = action.payload;
      const section = state.sections.find((s) => s.id === sectionId);
      if (section) {
        section.droppedItems = section.droppedItems.map((item) =>
          item.id === itemId ? { ...item, [key]: value } : item
        );
      }
    },
    deleteDroppedItemFromSection: (state, action) => {
      const { sectionId, itemId } = action.payload;
      const section = state.sections.find((s) => s.id === sectionId);
      if (section) {
        section.droppedItems = section.droppedItems.filter(
          (item) => item.id !== itemId
        );
      }
    },
    setCurrentSectionId: (state, action) => {
      state.currentSectionId = action.payload;
    },
    updateItemValue: (state, action) => {
      const { name, value } = action.payload;
      const item = state.items.find((item) => item.name === name);
      if (item) {
        item.value = value;
      }
    },
    setLayoutPreset: (state, action) => {
      const { type, layout } = action.payload;
      state.selectedLayout = { type, layout };
    },
    clearLayoutPreset: (state) => {
      state.selectedLayout = null;
    },
  },
});

export const {
  addSection,
  deleteSection,
  setCurrentSectionId,
  setLayoutPreset,
  addDroppedItemToSection,
  updateDroppedItemInSection,
  deleteDroppedItemFromSection,
  updateItemValue,
  clearLayoutPreset,
} = sectionsSlice.actions;
export default sectionsSlice.reducer;
