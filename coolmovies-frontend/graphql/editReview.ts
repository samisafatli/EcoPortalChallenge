import { gql } from '@apollo/client';

export const EDIT_REVIEW_MUTATION = gql`
  mutation UpdateMovieReviewById(
    $id: UUID!,
    $title: String,
    $body: String,
    $rating: Int
  ) {
    updateMovieReviewById(
      input: {
        id: $id,
        movieReviewPatch: {
          title: $title,
          body: $body,
          rating: $rating
        }
      }
    ) {
      movieReview {
        id
        title
        body
        rating
      }
    }
  }
`;
