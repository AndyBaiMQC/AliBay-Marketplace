import React, {useContext} from 'react';
import { Grid, Typography, Button, makeStyles, Avatar, ListItemAvatar  } from '@material-ui/core';

import {getCart, removeCart} from '../../server/api';
import MyContext from '../../utils/context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function CartItem(props) {
  const { data } = props;
  const classes = useStyles();
  const context = useContext(MyContext);
  async function _removeCart() {
    const res = await removeCart({_id: data._id, user: context.isLogin });
    if (res) {
      alert('removed');
      const list = await getCart({user: context.isLogin});
      if (list) {
        context.addCarts(list.msg);
      }
    }
  }
  return (
    <>
      <ListItemAvatar>
        <Avatar src={`http://localhost:4000/${data.image}`} className={classes.large}/>
      </ListItemAvatar>
      <Grid item container direction='column' justify='center' style={{ marginLeft: 5 }}>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
        >
          Name: {data.product}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
          noWrap
        >
          Description: {data.description}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
          noWrap
        >
          Price: {data.price}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
          noWrap
        >
          Seller: {data.seller}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
          noWrap
        >
          Quantity: {data.number}
        </Typography>
      </Grid>
      <Grid item container direction='column' justify='center'>

        <Button variant="contained" color="secondary" onClick={_removeCart}>
          Remove Item
        </Button>
      </Grid>
    </>
  );
}

export default CartItem;
