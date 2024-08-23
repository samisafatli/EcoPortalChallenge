import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieState {
  fetchData?: any[];
  reviewsByMovieId: { [key: string]: any[] };
  moviesLoading: boolean;
  reviewsLoading: boolean;
  addReviewLoading: boolean;
  moviesError: string | null;
  reviewsError: string | null;
  addReviewError: string | null;
}

const initialState: MovieState = {
  fetchData: undefined,
  reviewsByMovieId: {},
  moviesLoading: false,
  reviewsLoading: false,
  addReviewLoading: false,
  moviesError: null,
  reviewsError: null,
  addReviewError: null
};

export const slice = createSlice({
  initialState,
  name: 'movies',
  reducers: {
    // Movies
    fetchMoviesStart: (state) => {
      state.moviesLoading = true;
      state.moviesError = null;
    },
    fetchMoviesSuccess: (state, action: PayloadAction<{ data: any[] }>) => {
      state.fetchData = action.payload.data;
      state.moviesLoading = false;
    },
    fetchMoviesFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.moviesError = action.payload.error;
      state.moviesLoading = false;
    },

    // Review Listing
    fetchReviewsStart: (state, action: PayloadAction<{ movieId: string }>) => {
      state.reviewsLoading = true;
      state.reviewsError = null;
    },
    fetchReviewsSuccess: (state, action: PayloadAction<{
      movieId: any; data: any[]
    }>) => {
      console.log('Reviews Recebidas:', action.payload.data);
      state.reviewsByMovieId[action.payload.movieId] = action.payload.data;
      state.reviewsLoading = false;
    },
    fetchReviewsFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.reviewsError = action.payload.error;
      state.reviewsLoading = false;
    },

    // Add Review
    addReviewStart: (state, action: PayloadAction<{ movieId: string; title: string; body: string; rating: number }>) => {
      state.addReviewLoading = true;
      state.addReviewError = null;
    },

    addReviewSuccess: (state, action: PayloadAction<{ movieId: string, review: any }>) => {
      const { movieId, review } = action.payload;
      if (state.reviewsByMovieId[movieId]) {
        state.reviewsByMovieId[movieId].push(review);
      } else {
        state.reviewsByMovieId[movieId] = [review];
      }
      state.addReviewLoading = false;
    },

    addReviewFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.addReviewLoading = false
      state.addReviewError = action.payload.error
    },
  },
});

export const movieActions = slice.actions;
export default slice.reducer;
