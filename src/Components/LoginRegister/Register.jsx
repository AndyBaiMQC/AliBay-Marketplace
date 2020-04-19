import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';

import { register } from '../../server/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));


function Register(props) {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function Submit(username, password, email) {
    console.log(username, password, email, 'call');
    const res = await register({username, password, email});
    if (res) {
      console.log(res, 'reg');
      alert(res.msg);
      history.replace('/login');
    }
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField id="userName" label="userName" defaultValue={username} onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div>
        <TextField id="password" label="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <TextField id="email" label="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <Typography align={'center'}>
        <Button onClick={() => Submit(username, password, email)}>Register</Button>
      </Typography>password
      <Typography align={'center'} component='p'>
        Already a user ? <Link to='/login' >Login</Link>
      </Typography>
    </form>
  );
}

export default Register;
