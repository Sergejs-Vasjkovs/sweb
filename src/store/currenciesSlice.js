import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    currentCurrency: {}
};

const currenciesSlice = createSlice({
    name: "currencies",
    initialState,
    reducers: {
        fetchCurrenciesSuccess: (state, action) => {
            state.value = action.payload.currencies;
            state.currentCurrency = action.payload.currencies[0];
        },
        setCurentCurrencies: (state, action) => {
            state.currentCurrency = action.payload;
        }
    }
});

const { actions, reducer } = currenciesSlice;
export const { setCurentCurrencies, fetchCurrenciesSuccess } = actions;

export default reducer;
