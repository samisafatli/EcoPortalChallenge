import React, { useEffect, useState } from 'react';
import { Typography, TextField, Rating, Button } from '@mui/material';
import { movieActions, useAppDispatch, } from '../../redux';

interface AddReviewFormProps {
    movieId: string;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ movieId }) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const [rating, setRating] = useState<number>(0)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (title && body && rating !== 0) {
            dispatch(movieActions.addReviewStart({ movieId, title, body, rating }))
            setTitle('')
            setBody('')
            setRating(0)
            dispatch(movieActions.fetchReviewsStart({ movieId }))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6">Add you review!</Typography>

            <TextField
                label="Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
                label="Body"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />

            <Rating
                value={rating}
                onChange={(event, newValue) => setRating(newValue || 0)}
                name="rating"
            />

            <Button type="submit" variant="contained" color="primary">
                Submit Review
            </Button>

        </form>
    );
};

export default AddReviewForm;
