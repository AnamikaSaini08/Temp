import { createSlice } from "@reduxjs/toolkit";

const dragDropButtonSequenceGameSlice = createSlice({
    name: "dragDropGame",
    initialState: {
        boxSequence : [],
    },
    reducers:{
        updateBoxSequence: (state,action)=>{
            state.boxSequence = [...action.payload];
        },
    }
});

export const {updateBoxSequence} = dragDropButtonSequenceGameSlice.actions;
export default dragDropButtonSequenceGameSlice.reducer;