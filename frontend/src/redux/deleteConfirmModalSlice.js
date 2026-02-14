
import { createSlice } from "@reduxjs/toolkit";

export const deleteConfirmModalSlice = createSlice({
  name: "deleteConfirmModal",

  initialState: {
    isDcModalOpen: false,
    bookingId: null, 
  },

  reducers: {
    openDcModal: (state, action) => {
      state.isDcModalOpen = true;
      state.bookingId = action.payload; 
    },
    closeDcModal: (state) => {
      state.isDcModalOpen = false;
      state.bookingId = null; 
    },
  },
});

/* Destructuring/Extracting action creators from the delete confirmation modal slice for dispatching actions */
export const { openDcModal, closeDcModal } = deleteConfirmModalSlice.actions;

export default deleteConfirmModalSlice.reducer;
