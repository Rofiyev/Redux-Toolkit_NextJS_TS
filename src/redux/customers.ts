import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ICustomers } from "../interface";
import { customers } from "./../config/index";

export const customersSlice = createSlice({
  name: "customers",
  initialState: { customers, submit: false },
  reducers: {
    addUser: (state, action: PayloadAction<ICustomers>) => {
      state.customers.unshift({ ...action.payload });
    },
    removeUser: (state, action: PayloadAction<string>) => {
      let index = state.customers.findIndex((data: ICustomers) =>
        data.id.includes(action.payload)
      );
      state.customers.splice(index, 1);
    },
    editUser: (state, action: PayloadAction<ICustomers>) => {
      let index = state.customers.findIndex((data: ICustomers) =>
        data.id.includes(action.payload.id)
      );
      state.customers.splice(index, 1, { ...action.payload });
    },
    onSubmit: (state, action: PayloadAction<boolean>) => {
      state.submit = action.payload;
    },
  },
});

export const { addUser, removeUser, editUser, onSubmit } =
  customersSlice.actions;

export const customersReducer = (state: RootState) => state.customers;
export default customersSlice.reducer;
