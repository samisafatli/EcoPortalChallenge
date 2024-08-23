import React, { useEffect } from 'react';
import { CircularProgress, Typography, List, ListItem, ListItemText } from '@mui/material';
import { movieActions, useAppDispatch, useAppSelector } from '../../redux';

interface MovieReviewsListProps {
    movieId: string;
}

const MovieReviewsList: React.FC<MovieReviewsListProps> = ({ movieId }) => {
    const dispatch = useAppDispatch();
    const { reviewsByMovieId, reviewsLoading, reviewsError } = useAppSelector((state) => state.movies);

    const reviews = reviewsByMovieId[movieId] || [];

    useEffect(() => {
        if (reviews.length === 0) {
            dispatch(movieActions.fetchReviewsStart({ movieId }));
        }
    }, [dispatch, movieId, reviews]);

    if (reviewsLoading) return <CircularProgress />;

    if (reviewsError) return <Typography>Error: {reviewsError}</Typography>;

    if (!reviews || reviews.length === 0) return <Typography>No reviews for this movie.</Typography>;

    return (
        <List>
            {reviews.map((review: any) => (
                <ListItem key={review.id} alignItems="flex-start">
                    <ListItemText
                        primary={`${review.title} (Rating: ${review.rating})`}
                        secondary={`${review.body}`}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default MovieReviewsList;
