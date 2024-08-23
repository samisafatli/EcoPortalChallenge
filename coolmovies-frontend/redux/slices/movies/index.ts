export { movieActions } from './slice';
export { default as moviesReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { addReviewEpic, fetchMovieReviewsEpic, fetchMoviesEpic } from './epics';

export const movieEpics = combineEpics(fetchMovieReviewsEpic, fetchMoviesEpic, addReviewEpic);
