import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Layout from '../Layout';

import Login from './Login';
import Register from './Register';

function LoginRegister(props) {
  const location = useLocation();
  return (
    <Layout>
      <Grid container maxWidth="100%" style={{ padding: 0, height: '100vh' }} xs={12} spacing={0} >
        <Grid container xs={4} direction="column" alignContent='center' justify='center' >
          <Typography variant="h1" align='center'>SHOP</Typography><LocalMallIcon/>
          {
            location.pathname === '/login' ? (
              <Login />
            ) : (
              <Register />
            )
          }
        </Grid>
        <Grid item xs={8}>
          <div style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1587040164251-a349c7b1b7ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)',
            height: '100vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }} />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default LoginRegister;
