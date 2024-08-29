import { gql } from '@apollo/client';

export const ADD_REVIEW_MUTATION = gql`
  mutation CreateMovieReview($movieId: UUID!, $title: String!, $body: String!, $rating: Int!, $userReviewerId: UUID!) {
    createMovieReview(input: { movieReview: { movieId: $movieId, title: $title, body: $body, rating: $rating, userReviewerId: $userReviewerId } }) {
      movieReview {
        id
        title
        body
        rating
        movieByMovieId {
          title
        }
      }
    }
  }
`;
