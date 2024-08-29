import { css } from '@emotion/react';
import { Paper, Typography } from '@mui/material';
import type { NextPage } from 'next';
import MovieList from '../components/MovieList/MovieList';
import styles from './index.styles'

const Home: NextPage = () => {
  return (
    <div css={styles.root}>
      <Paper elevation={3} css={styles.navBar}>
        <Typography>{'EcoPortal'}</Typography>
      </Paper>

      <div css={styles.body}>
        <MovieList />
      </div>
    </div>
  );
};

export default Home;
