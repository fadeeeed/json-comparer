import { createSlice, configureStore } from "@reduxjs/toolkit";

// Slice for compareNestedObjects
const compareNestedObjectsSlice = createSlice({
  name: "compareNestedObjects",
  initialState: {
    compareNestedObjects: false,
  },
  reducers: {
    toggleNestedObjects(state) {
      state.compareNestedObjects = !state.compareNestedObjects;
    },
  },
});

// Slice for errorModalState
const errorModalSlice = createSlice({
  name: "errorModalState",
  initialState: {
    isClose: false,
  },
  reducers: {
    toggleModalState(state) {
      state.isClose = !state.isClose;
    },
  },
});

const optionsSlice = createSlice({
  name: "optionsState",
  initialState: {
    isClose: false,
    options: [],
    selectedOptions: [],
  },
  reducers: {
    toggleOptionsModalState(state) {
      state.isClose = !state.isClose;
    },
    updateOptionsState(state, action) {
      state.options = action.payload;
    },
    updateSelectedOptions(state, action) {
      state.selectedOptions = action.payload;
    },
  },
});

// Configure the Redux store
const store = configureStore({
  reducer: {
    compareNestedObjects: compareNestedObjectsSlice.reducer,
    errorModalState: errorModalSlice.reducer,
    optionsState: optionsSlice.reducer,
  },
});

// Export the actions from the slices
export const { toggleNestedObjects } = compareNestedObjectsSlice.actions;
export const { toggleModalState } = errorModalSlice.actions;
export const {
  toggleOptionsModalState,
  updateOptionsState,
  updateSelectedOptions,
} = optionsSlice.actions;

export default store;
