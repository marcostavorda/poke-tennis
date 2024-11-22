import { createSlice } from "@reduxjs/toolkit";

const rankingSlice = createSlice({
    name: 'selected',
    initialState: { value: [] },
    reducers: {
        addRankingElements: (state, action) => {
            state.value = action.payload;
        },
        changeRankingPosition: (state, {index, position}) => {
            const ranking = state.value
        }
    }
});

export const { addRankingElements , changeRankingPosition } = rankingSlice.actions;

export default rankingSlice.reducer;