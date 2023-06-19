import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    run: 0
};

export const attributesSlice = createSlice({
    name: "attributes",
    initialState,
    reducers: {
        fetchAttributesSuccess: (state, action) => {
            if (state.run === 0) {
                state.value = action.payload.data.category.products;
            }
            state.run++;
        }
    }
});

const { actions, reducer } = attributesSlice;
export const { fetchAttributesSuccess } = actions;

export default reducer;
