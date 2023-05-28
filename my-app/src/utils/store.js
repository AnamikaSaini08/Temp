import {configureStore} from '@reduxjs/toolkit';
import carouselButtonSlice from './carouselButtonSlice'
import dragDropButtonSequenceGameSlice from './dragDropButtonSequenceGameSlice';

const store = configureStore({
    reducer:{
        carouselButton: carouselButtonSlice,
        dragDropGame : dragDropButtonSequenceGameSlice
    }
});

export default store;