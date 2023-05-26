import {configureStore} from '@reduxjs/toolkit';
import carouselButtonSlice from './carouselButtonSlice'

const store = configureStore({
    reducer:{
        carouselButton: carouselButtonSlice,
    }
});

export default store;