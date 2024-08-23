import { gql } from '@apollo/client';

export const GET_MOVIE_REVIEWS = gql`
 query GetReviewsByMovieId($movieId: UUID!) {
  allMovieReviews(condition: { movieId: $movieId }) {
    nodes {
      id
      title
      body
      rating
      userReviewerId
      movieByMovieId {
        title
        id
      }
    }
  }
}
`;
