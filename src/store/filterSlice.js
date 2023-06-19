import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filterValue: {}
    },
    reducers: {
        setFilterValues: (state, action) => {
            state.filterValue = { ...state.filterValue, ...action.payload };
        },
        deleteFilterValues: (state, action) => {
            delete state.filterValue[action.payload];
        },
        resetFilterValues: (state) => {
            state.filterValue = {};
        }
    }
});

const { actions, reducer } = filterSlice;
export const { setFilterValues, deleteFilterValues, resetFilterValues } = actions;

export default reducer;
