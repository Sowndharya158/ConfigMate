import { createSlice } from "@reduxjs/toolkit";
import Image from "../public/images/default-avatar-profile-icon-.jpg";
const UserProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    profilePic: Image,
    BgPic: "",
    userDetails: {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      phone: "",
      address: "",
      number: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      hname: "",
    },
  },
  reducers: {
    updateDetails: (state, action) => {
      const updatedState = { ...state };
      console.log(updatedState);
      console.log(action.payload);
      updatedState[action.payload.name] = action.payload.value;
      console.log(updatedState);
      return updatedState;
    },
  },
});

export const { updateDetails } = UserProfileSlice.actions;
export default UserProfileSlice.reducer;
