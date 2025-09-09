import { configureStore } from "@reduxjs/toolkit";
import UploadReducer from "./fileSlice";
import AddFirewall from "./FirewallSettingsSlice";
import UserProfile from "./UserProfileSlice";

export const store = configureStore({
  reducer: {
    upload: UploadReducer,
    addFirewall: AddFirewall,
    userDetails: UserProfile,
  },
});
//Added slice reducers to the store
export default store;
