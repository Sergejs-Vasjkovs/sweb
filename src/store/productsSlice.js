import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: "products",
    initialState: {
        data: [],
        value: 0
    },
    reducers: {
        fetchProductsSuccess: (state, action) => {
            if (state.value === 0) {
                state.data = action.payload.category;
            }
            state.value++;
        }
    }
});

const { actions, reducer } = postsSlice;
export const { fetchProductsSuccess } = actions;

export default reducer;
