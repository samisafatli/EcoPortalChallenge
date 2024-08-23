import { css } from '@emotion/react';
import {
  Card,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import type { NextPage } from 'next';
import { movieActions, useAppDispatch, useAppSelector } from '../redux';
import { useEffect } from 'react';

const primary = '#af2894';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const movieState = useAppSelector((state) => state.movies);
  useEffect(() => {
    if (!movieState.fetchData) {
      dispatch(movieActions.fetch())
    }
  }, [dispatch, movieState.fetchData]);

  console.log('movieState:', movieState);

  return (
    <div css={styles.root}>
      <Paper elevation={3} css={styles.navBar}>
        <Typography>{'EcoPortal'}</Typography>
      </Paper>

      <div css={styles.body}>
        <Grid container spacing={2}>
          {movieState?.fetchData?.map((movie: any) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  image={movie.imgUrl}
                  alt={movie.title}
                  style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }}
                />
                <Typography variant="h6" component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`Created by: ${movie.userByUserCreatorId.name}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`Release Date: ${new Date(movie.releaseDate).toDateString()}`}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

const styles = {
  root: css({
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  navBar: css({
    background: primary,
    height: 50,
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    borderRadius: 0,
    p: {
      color: 'white',
    },
  }),
  body: css({
    alignSelf: 'stretch',
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  heading: css({ marginTop: 16, fontSize: '2.75rem', textAlign: 'center' }),
  subtitle: css({
    fontWeight: 300,
    textAlign: 'center',
    maxWidth: 600,
    margin: '24px 0',
    color: 'rgba(0, 0, 0, 0.6)',
  }),
  mainControls: css({
    display: 'flex',
    alignItems: 'center',
    button: { marginRight: 16 },
  }),
  dataInput: css({
    alignSelf: 'stretch',
    margin: '32px 0',
  }),
};

export default Home;
