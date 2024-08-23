import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieState {
  allMovies: any;
  sideEffectCount: number;
  fetchData?: unknown[];
}

const initialState: MovieState = {
  sideEffectCount: 0,
  allMovies: undefined
};

export const slice = createSlice({
  initialState,
  name: 'movieReducer',
  reducers: {
    fetch: () => { },
    clearData: (state) => {
      state.fetchData = undefined;
    },
    loaded: (state, action: PayloadAction<{ data: unknown[] }>) => {
      state.fetchData = action.payload.data;
    },
    loadError: (state) => {
      state.fetchData = ['Error Fetching :('];
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
