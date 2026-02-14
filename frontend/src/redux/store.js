
import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "./bookingsSlice";
import helpModalReducer from "./helpModalSlice";
import deleteModalReducer from "./deleteConfirmModalSlice";

/* Configuring the Redux toolkit store with multiple reducers to be used globally in the app. */
const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    helpModal: helpModalReducer,
    deleteModal: deleteModalReducer,
  },
});

export default store;
