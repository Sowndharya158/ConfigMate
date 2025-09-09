import { createSlice } from "@reduxjs/toolkit";

const FirewallSlice = createSlice({
  name: "firewalls",
  initialState: {
    firewalls: [],
  },
  reducers: {
    addFirewall: (state, action) => {
      state.firewalls.push(action.payload.data);
    },
  },
});

export const { addFirewall } = FirewallSlice.actions;
export default FirewallSlice.reducer;
