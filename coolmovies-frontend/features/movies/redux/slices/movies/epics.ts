import { Epic, StateObservable } from 'redux-observable';
import { Observable, of, from } from 'rxjs';
import { filter, switchMap, catchError } from 'rxjs/operators';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';
import { movieActions } from './slice';
import { ADD_REVIEW_MUTATION } from '../../../graphql/addReview';
import { EDIT_REVIEW_MUTATION } from '../../../graphql/editReview';
import { GET_MOVIE_REVIEWS } from '../../../graphql/getMovieReviews';
import { GET_MOVIES } from '../../../graphql/getMovies';


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

export const editReviewEpic: Epic = (
  action$,
  state$,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(movieActions.editReviewStart.match),
    switchMap((action) => {
      const { movieId, title, body, rating, reviewId } = action.payload;
      return from(client.mutate({
        mutation: EDIT_REVIEW_MUTATION,
        variables: { id: reviewId, title, body, rating }
      })).pipe(
        switchMap((result) => {
          const updatedReview = result?.data.updateMovieReviewById?.movieReview;
          if (!updatedReview) {
            return of(movieActions.editReviewFailure({ error: 'Updated review not found' }));
          }
          const editSuccessAction = movieActions.editReviewSuccess({ movieId, updatedReview });

          return from(client.query({
            query: GET_MOVIE_REVIEWS,
            variables: { movieId },
          })).pipe(
            switchMap((result) => {
              const fetchReviewsSuccessAction = movieActions.fetchReviewsSuccess({
                movieId,
                data: result.data.allMovieReviews.nodes,
              });

              return of(editSuccessAction, fetchReviewsSuccessAction);
            }),
            catchError((error) => {
              return of(movieActions.editReviewFailure({ error: error.message }));
            })
          );
        }),
        catchError((error) => {
          return of(movieActions.editReviewFailure({ error: error.message }));
        })
      );
    })
  );
