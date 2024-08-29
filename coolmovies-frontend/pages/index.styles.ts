// src/pages/Home.styles.ts
import { css } from '@emotion/react';

const primary = '#8a2275';

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
};

export default styles;
