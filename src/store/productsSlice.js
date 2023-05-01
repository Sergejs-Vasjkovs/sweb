import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: "products",
    initialState: {
        data: []
    },
    reducers: {
        fetchProductsSuccess: (state, action) => {
            state.data = action.payload.category;
        }
    }
});

const { actions, reducer } = postsSlice;
export const { fetchProductsSuccess } = actions;

export default reducer;
