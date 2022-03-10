import { createAsyncThunk } from '@reduxjs/toolkit';
import PlacesApi from '../../api/Places';
import { ICreateSafePlaceFormData } from '../../components/CreateSavePlacePopup/validateSafePlaceForm';
import PlacesActionType from './ActionType';

const placesApi = new PlacesApi();

export const getPlaces = createAsyncThunk(PlacesActionType.GetAll, () => {
  return placesApi.getAll();
});

export const createPlace = createAsyncThunk(PlacesActionType.CreatePlace, (data: ICreateSafePlaceFormData) => {
  return placesApi.create(data);
});


