import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isSettingsExpanded: boolean;
}

const initialState: UiState = {
  isSettingsExpanded: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSettingsExpanded: (state) => {
      state.isSettingsExpanded = !state.isSettingsExpanded;
    },
    setSettingsExpanded: (state, action: PayloadAction<boolean>) => {
      state.isSettingsExpanded = action.payload;
    },
  },
});

export const { toggleSettingsExpanded, setSettingsExpanded } = uiSlice.actions;
export default uiSlice.reducer;
