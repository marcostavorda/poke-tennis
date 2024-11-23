import { createSlice } from "@reduxjs/toolkit";

const rankingSlice = createSlice({
    name: 'selected',
    initialState: { value: [] },
    reducers: {
        addRankingElements: (state, action) => {
            state.value = action.payload;
        },
        changeRankingPosition: (state, action) => {
            const { winnerIndex, loserIndex, challengerPosition } = action.payload;
            let newRanking = [];
            let newItem;
            const ranking = state.value;
            ranking.forEach((item, index) => { newItem = item;
                if(index === winnerIndex) { newItem = { name: item.name, position: challengerPosition-1, selected: item.selected } }
                if(index === loserIndex) { newItem = { name: item.name, position: challengerPosition, selected: item.selected } }
                newRanking.push(newItem);
            });
            newRanking.sort(((a, b) => a.position - b.position));
            state.value = newRanking;
        }
    }
});

export const { addRankingElements , changeRankingPosition } = rankingSlice.actions;

export default rankingSlice.reducer;