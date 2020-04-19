import React, {useState, useContext} from 'react';
import { Button, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {Link, useHistory} from 'react-router-dom';
import { login } from '../../server/api';
import MyContext from '../../utils/context';

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


function Login(props) {
  const classes = useStyles();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(MyContext);
  const history = useHistory();
  async function Submit(username, password) {
    const res = await login({username, password});
    if (res) {
      window.sessionStorage.setItem('isLogin', res.msg);
      context.setLogin(res.msg);
      alert('login success');
      history.push('/');
    }
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField id="userName" label="userName" defaultValue={username} onChange={(e) => setUserName(e.target.value)}  />
      </div>
      <div>
        <TextField id="password" label="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)}  />
      </div>
      <Typography align={'center'}>
        <Button onClick={() => Submit(username, password)}>Login</Button>
      </Typography>
      <Typography align={'center'} component='p'>
        Want be a user ? <Link to='/register' >Register</Link>
      </Typography>
    </form>
  );
}

export default Login;
