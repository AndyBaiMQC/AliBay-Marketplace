
import React, {useContext, useEffect, useState} from 'react';
import MyContext from '../../utils/context';
import Layout from '../Layout';
import { Paper, Grid, Typography, Divider, List, ListItem, Button, Dialog  } from '@material-ui/core';
import CartItem from './CartItem';
import SplitForm from './SplitForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {checkCart, getSecret} from '../../server/api';
const stripePromise = loadStripe('pk_test_B2D4WapEkXcUtoNZqkMNjuXI00lrERywhc');

function Cart(props) {
  const context = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const handleOpenCart = async () => {
    const b = context.carts && context.carts.reduce((acc, cur) => acc += cur.price * cur.number, 0);
    const res = await checkCart({list: context.carts});
    if (b && res.msg) {
      setOpen(true);
    } else {
      alert(`${res.list.map(item => item.product).join(',')} the quantity less than stock`);
    }
  };
  return (
    <Layout>
      <Paper style={{ margin: '0 auto', maxWidth: 500, padding: '15px 20px' }}>
        <Grid>
          <Typography component='h4'>
            Shopping Cart
          </Typography>
          <Divider />
          <List>
            {context.carts && context.carts.map((item, index) => (
                <ListItem index={item} divider>
                  <CartItem data={item} />
                </ListItem>
              ))}
              <ListItem style={{ justifyContent: 'flex-end' }}>
                Order Total: ${context.carts && context.carts.reduce((acc, cur) => acc += cur.price * cur.number, 0)}
              </ListItem>
              <ListItem style={{ justifyContent: 'flex-end'}}>
                <Button onClick={() => handleOpenCart()} color='primary' variant="contained">Pay With Card</Button>
              </ListItem>
          </List>
        </Grid>
      </Paper>
      <Dialog open={open}>
        <Elements stripe={stripePromise}>
          <SplitForm close={() => setOpen(false)} carts={context.carts} price={context.carts && context.carts.reduce((acc, cur) => acc += cur.price * cur.number, 0)} />
        </Elements>
      </Dialog>
    </Layout>
  );
}

export default Cart;
