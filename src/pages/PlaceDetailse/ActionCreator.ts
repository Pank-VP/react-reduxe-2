import { createAsyncThunk } from '@reduxjs/toolkit';
import PlacesApi from '../../api/Places';
import PlaceDetailsActionType from './ActionType';

const placesApi = new PlacesApi();

export const getPlaceDetails = createAsyncThunk(PlaceDetailsActionType.getPlaceDetails, (id: string) => {
  return placesApi.getById(id);
});
