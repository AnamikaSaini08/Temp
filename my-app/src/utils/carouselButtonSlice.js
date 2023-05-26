import { createSlice } from "@reduxjs/toolkit";

const carouselButtonSlice = createSlice({
    name: "carouselButton",
    initialState: {
        isButtonActive: true,
    },
    reducers:{
        buttonDeactivate: (state)=>{
            state.isButtonActive = false;
        },
        buttonActivate: (state)=>{
            state.isButtonActive = true;
        },
    }
});

export const {buttonDeactivate , buttonActivate} = carouselButtonSlice.actions;
export default carouselButtonSlice.reducer;