import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isVisible: false
    },
    reducers: {
        toggleModalVisibility: (state, action) => {
            state.isVisible = !state.isVisible;
        }
    }
});

const { actions, reducer } = modalSlice;
export const { toggleModalVisibility } = actions;

export default reducer;
