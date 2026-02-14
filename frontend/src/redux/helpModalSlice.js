
import { createSlice } from "@reduxjs/toolkit";


export const helpModalSlice = createSlice({
  name: "helpModal",
  
  initialState: {
    isHelpModalOpen: false,
  },
  
  reducers: {
    openHelpModal: (state) => {
      state.isHelpModalOpen = true;
    },
    closeHelpModal: (state) => {
      state.isHelpModalOpen = false;
    },
  },
});

export const { openHelpModal, closeHelpModal } = helpModalSlice.actions;

export default helpModalSlice.reducer;
