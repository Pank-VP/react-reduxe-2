import { createReducer } from '@reduxjs/toolkit';
import IPlaceDetailsState from '../../store/PlaceDetails/Type';
import { getPlaceDetails } from './ActionCreator';

const initialState: IPlaceDetailsState = {

};

const placeDetailsReducer = createReducer(initialState, (builder) => {
  builder.addCase(getPlaceDetails.fulfilled, (state, action) => {
    state[action.meta.arg] = action.payload;
  });
});

export default placeDetailsReducer;
