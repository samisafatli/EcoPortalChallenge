import { Paper, Typography } from '@mui/material'
import { NextPage } from 'next'
import React from 'react'
import MovieList from './components/MovieList/MovieList'
import styles from '../index.styles'

const ReviewsPage: NextPage = () => {
    return (
        <div css={styles.root}>
            <Paper elevation={3} css={styles.navBar}>
                <Typography>{'EcoPortal Reviews'}</Typography>
            </Paper>

            <div css={styles.body}>
                <MovieList />
            </div>
        </div>
    )
}

export default ReviewsPage