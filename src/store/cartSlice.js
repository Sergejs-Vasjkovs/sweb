import { createSlice } from "@reduxjs/toolkit";

function calculateTotalPrice(items) {
    const totalPrice = [];

    items.forEach((product) => {
        product.prices.forEach((price, index) => {
            totalPrice[index] = totalPrice[index]
                ? totalPrice[index] + price.amount * product.quantity
                : price.amount * product.quantity;
        });
    });

    return totalPrice.map((price, index) => ({
        ...items[0].prices[index],
        amount: price
    }));
}

const initialState = {
    value: [],
    totalPrice: [],
    totalQuantity: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const itemToAdd = action.payload;
            const existingItemIndex = state.value.findIndex(
                (item) => item.id === itemToAdd.id && JSON.stringify(item.input) === JSON.stringify(itemToAdd.input)
            );

            if (existingItemIndex >= 0) {
                state.value[existingItemIndex].quantity++;
            } else {
                state.value.push({
                    ...itemToAdd,
                    time: Date.now(),
                    quantity: 1
                });
            }

            state.totalQuantity++;
            state.totalPrice = calculateTotalPrice(state.value);
        },
        updateInput(state, action) {
            const { time, input } = action.payload;
            const existingProductIndex = state.value.findIndex((item) => item.time === time);

            if (existingProductIndex > -1) {
                state.value[existingProductIndex].input = input;
            }
        },
        addQuantity(state, action) {
            const time = action.payload;
            const existingProductIndex = state.value.findIndex((item) => item.time === time);

            if (existingProductIndex > -1) {
                state.value[existingProductIndex].quantity++;
                state.totalQuantity++;
                state.totalPrice = calculateTotalPrice(state.value);
            }
        },
        subtractQuantity(state, action) {
            const time = action.payload;
            const existingProductIndex = state.value.findIndex((item) => item.time === time);

            if (existingProductIndex > -1) {
                if (state.value[existingProductIndex].quantity === 1) {
                    state.value.splice(existingProductIndex, 1);
                } else {
                    state.value[existingProductIndex].quantity--;
                }

                state.totalQuantity--;
                state.totalPrice = calculateTotalPrice(state.value);
            }
        }
    }
});

export const { addItem, updateInput, addQuantity, subtractQuantity } = cartSlice.actions;
export default cartSlice.reducer;
