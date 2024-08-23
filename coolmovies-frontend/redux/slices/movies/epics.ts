import { Epic, StateObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { filter, switchMap, catchError } from 'rxjs/operators';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';

import { GET_MOVIES } from '../../../graphql/getMovies';
import { GET_MOVIE_REVIEWS } from '../../../graphql/getMovieReviews';
import { movieActions } from './slice';
import { ADD_REVIEW_MUTATION } from '../../../graphql/addReview';

export const fetchMoviesEpic: Epic = (
  action$: Observable<ReturnType<typeof movieActions.fetchMoviesStart>>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(movieActions.fetchMoviesStart.match),
    switchMap(() =>
      client.query({ query: GET_MOVIES }).then((result) => {
        return movieActions.fetchMoviesSuccess({ data: result.data.allMovies.nodes });
      })
    ),
    catchError((error) => {
      console.error("🚨 ~ Error fetching movies:", error.message);
      return [movieActions.fetchMoviesFailure({ error: error.message })];
    })
  );

export const fetchMovieReviewsEpic: Epic = (
  action$: Observable<ReturnType<typeof movieActions.fetchReviewsStart>>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(movieActions.fetchReviewsStart.match),
    switchMap((action) => {
      const { movieId } = action.payload;
      if (!movieId) {
        return movieActions.fetchReviewsFailure({ error: 'Missing movieId in payload' });
      }
      return client.query({
        query: GET_MOVIE_REVIEWS,
        variables: { movieId },
      })
        .then((result) => {
          return movieActions.fetchReviewsSuccess({ movieId, data: result.data.allMovieReviews.nodes });
        })
        .catch((error) => {
          console.error("🚨 ~ Error fetching reviews:", error.message);
          return movieActions.fetchReviewsFailure({ error: error.message });
        });
    })
  );


export const addReviewEpic: Epic = (action$, state$, { client }: EpicDependencies) =>
  action$.pipe(
    filter(movieActions.addReviewStart.match),
    switchMap(async (action) => {
      const { movieId, title, body, rating } = action.payload;
      const userReviewerId = "65549e6a-2389-42c5-909a-4475fdbb3e69";
      return client.mutate({
        mutation: ADD_REVIEW_MUTATION,
        variables: { movieId, title, body, rating, userReviewerId }
      })
        .then((result) => {
          return movieActions.addReviewSuccess({ movieId, review: result.data.createMovieReview.movieReview });
        })
        .catch((error) => {
          return movieActions.addReviewFailure({ error: error.message });
        });
    })
  );

