import { combineReducers } from '@reduxjs/toolkit';
import itemReducer from '../features/itemSlice';

const rootReducer = combineReducers({
  items: itemReducer,
});

export default rootReducer;
