import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux';
import { Grid, Card, CardMedia, Typography, CardContent, Button } from '@mui/material';
import { movieActions } from '../../redux/slices/movies';
import MovieReviewsList from '../MovieReviewsList/MovieReviewsList';
import AddReviewForm from '../AddReviewForm/AddReviewForm';

const MovieList: React.FC = () => {
    const { fetchData, moviesLoading, moviesError } = useAppSelector((state) => state.movies);
    const [editMode, setEditMode] = useState<{ [movieId: string]: boolean }>({});
    const [reviewToEdit, setReviewToEdit] = useState<{ [movieId: string]: any }>({});

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!fetchData) {
            dispatch(movieActions.fetchMoviesStart());
        }
    }, [dispatch, fetchData]);

    const handleEditReview = (movieId: string, review: any) => {
        setEditMode((prev) => ({ ...prev, [movieId]: true }));
        setReviewToEdit((prev) => ({
            ...prev,
            [movieId]: {
                reviewId: review.id,
                title: review.title,
                body: review.body,
                rating: review.rating
            }
        }));
    };

    if (moviesLoading) return <Typography>Loading movies...</Typography>;
    if (moviesError) return <Typography>Error: {moviesError}</Typography>;

    return (
        <Grid container spacing={2}>
            {fetchData?.map((movie: any) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={movie.imgUrl}
                            alt={movie.title}
                            style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography variant="h6">{movie.title}</Typography>
                            <Typography variant="body2">{`Created by: ${movie.userByUserCreatorId.name}`}</Typography>
                            <Typography variant="body2">{`Release Date: ${new Date(movie.releaseDate).toDateString()}`}</Typography>
                        </CardContent>

                        <MovieReviewsList
                            key={`${movie.id}-${editMode[movie.id]}`}
                            onEdit={(review) => handleEditReview(movie.id, review)}
                            movieId={movie.id}
                            editMode={!!editMode[movie.id]}
                        />

                        <AddReviewForm
                            reviewToEdit={reviewToEdit[movie.id] || null}
                            movieId={movie.id}
                            editMode={!!editMode[movie.id]}
                        />
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default MovieList;
