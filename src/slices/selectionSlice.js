import { createSlice } from "@reduxjs/toolkit";

const selectionSlice = createSlice({
    name: 'selected',
    initialState: { value: null },
    reducers: {
        addSelectedPokemon: (state, action) => {
            state.value = action.payload;
        },
        deleteSelectedPokemon: (state) => {
            state.value = null;
        }
    }
});

export const { addSelectedPokemon , deletePokemon } = selectionSlice.actions;

export default selectionSlice.reducer;