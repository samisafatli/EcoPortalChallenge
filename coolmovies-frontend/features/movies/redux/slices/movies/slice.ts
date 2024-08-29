import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieState {
  fetchData?: any[];
  reviewsByMovieId: { [movieId: string]: any[] };
  moviesLoading: boolean;
  reviewsLoading: boolean;
  addReviewLoading: boolean;
  editReviewLoading: boolean;
  moviesError: string | null;
  reviewsError: string | null;
  addReviewError: string | null;
  editReviewError: string | null;
  editMode: { [movieId: string]: boolean }
}

const initialState: MovieState = {
  fetchData: undefined,
  reviewsByMovieId: {},
  moviesLoading: false,
  reviewsLoading: false,
  addReviewLoading: false,
  editReviewLoading: false,
  moviesError: null,
  reviewsError: null,
  addReviewError: null,
  editReviewError: null,
  editMode: {},
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
    // Edit Review
    editReviewStart: (state, action: PayloadAction<{ movieId: string; title: string; body: string; rating: number; reviewId: string }>) => {
      state.editReviewLoading = true;
      state.editReviewError = null;
    },
    editReviewSuccess: (state, action: PayloadAction<{ movieId: string; updatedReview: any }>) => {
      const { movieId, updatedReview } = action.payload;
      const movieReviews = state.reviewsByMovieId[movieId] || [];
      const reviewIndex = movieReviews.findIndex((review) => review.id === updatedReview.id);
      if (reviewIndex !== -1) {
        movieReviews[reviewIndex] = updatedReview;
      }
      state.reviewsByMovieId[movieId] = [...movieReviews];
      state.editReviewLoading = false;
      state.editMode[movieId] = false;
    },
    editReviewFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.editReviewLoading = false;
      state.editReviewError = action.payload.error;
    },
    setEditMode: (state, action: PayloadAction<{ movieId: string; editMode: boolean }>) => {
      state.editMode[action.payload.movieId] = action.payload.editMode
    }
  },
});

export const movieActions = slice.actions;
export default slice.reducer;
