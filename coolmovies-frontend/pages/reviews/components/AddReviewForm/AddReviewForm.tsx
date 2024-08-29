import React, { useEffect, useState } from 'react';
import { Typography, TextField, Rating, Button } from '@mui/material';
import styles from './AddReviewForm.styles'
import { movieActions, useAppDispatch } from '../../../../features/movies/redux';

interface AddReviewFormProps {
    movieId: string;
    reviewToEdit?: { reviewId: string, title: string; body: string; rating: number } | null;
    editMode: boolean;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ movieId, reviewToEdit, editMode }) => {
    const dispatch = useAppDispatch();
    const { editReviewStart, addReviewStart } = movieActions
    const [title, setTitle] = useState(reviewToEdit ? reviewToEdit.title : '');
    const [body, setBody] = useState(reviewToEdit ? reviewToEdit.body : '');
    const [rating, setRating] = useState<number>(reviewToEdit ? reviewToEdit.rating : 0);



    const clearState = () => {
        setTitle('');
        setBody('');
        setRating(0);
    }

    useEffect(() => {
        if (editMode && reviewToEdit) {
            setTitle(reviewToEdit.title);
            setBody(reviewToEdit.body);
            setRating(reviewToEdit.rating);
        }
    }, [editMode, reviewToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && body && rating !== 0) {
            if (editMode && reviewToEdit) {
                dispatch(editReviewStart({
                    movieId,
                    title,
                    body,
                    rating,
                    reviewId: reviewToEdit.reviewId
                }));
            } else {
                dispatch(addReviewStart({ movieId, title, body, rating }));
            }
            clearState()
        }
    }

    return (
        <form css={styles.form} onSubmit={handleSubmit}>
            <Typography variant="h6">{editMode ? 'Edit your review!' : 'Add your review!'}</Typography>
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
            <Button css={styles.button} type="submit" variant="contained" color="primary">
                {editMode ? 'Update Review' : 'Submit Review'}
            </Button>
        </form>
    );
};

export default AddReviewForm;
