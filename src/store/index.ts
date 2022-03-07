import { configureStore } from '@reduxjs/toolkit'
import placeDetailsReducer from '../pages/PlaceDetailse/Reduser';
import placesReducer from './Places/Reducer';
import popupManagementReducer from './PopupManagement/Reducer';

export const store = configureStore({
  reducer: {
    places: placesReducer,
    placeDetails: placeDetailsReducer,
    popupManagement: popupManagementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
