import Button from '@material-ui/core/Button';
import React, {useContext, useState} from 'react';
import { Input, TextField, Grid, Typography, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import MyContext from '../../utils/context';

import Layout from '../Layout';

import { addGoods } from '../../server/api';

function Index(props) {
  const [ product, setProduct ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ seller, setSeller ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ quantity, setQuantity ] = useState('');
  const [ type, setType ] = useState('');
  const [ image, setImage ] = useState('');
  const context = useContext(MyContext);
  const history = useHistory();

  async function submit(product, description, seller, price, image) {
    let param = new FormData();
    param.append('file', image);
    param.append('product', product);
    param.append('description', description);
    param.append('seller', seller);
    param.append('type', type);
    param.append('price', price);
    param.append('quantity', quantity);
    param.append('user', context.isLogin);

    const res = await addGoods({headers:{'Content-Type':'multipart/form-data'}, data: param});
    console.log(res);
    if(res) {
      alert('add success');
      history.replace('/');
    }
  }
  return (
    <Layout>
      <Grid container style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Grid item xs={8} style={{ backgroundImage: 'url(https://images.unsplash.com/flagged/photo-1587096472434-8b65b343980d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3375&q=80)', backgroundSize: 'cover' }}/>
        <Grid container item xs={4} direction='column' justify='center' style={{ padding: '0 20px' }}>
            <TextField
              id="standard-full-width"
              label="Name"
              style={{ margin: 8 }}
              placeholder="Enter Name"
              helperText="Name!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={product}
              onChange={(e) => setProduct(e.target.value)}
            />
            <TextField
              id="standard-full-width"
              label="Description"
              style={{ margin: 8 }}
              placeholder="Enter Description"
              helperText="Description!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="standard-full-width"
              label="Seller"
              style={{ margin: 8 }}
              placeholder="Enter Seller"
              helperText="Seller!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={seller}
              onChange={(e) => setSeller(e.target.value)}
            />
            <Input
              type='number'
              fullWidth
              placeholder='enter price'
              defaultValue={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              type='number'
              fullWidth
              placeholder='enter quantity'
              defaultValue={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <RadioGroup aria-label="gender" name="gender1" value={type} onChange={(e) => setType(e.target.value)}>
              <FormControlLabel value="shoes" control={<Radio />} label="shoes" />
              <FormControlLabel value="cloth" control={<Radio />} label="cloth" />
            </RadioGroup>
            <Typography>
              Upload an image for your item
            </Typography>
            <Input type='file' fullWidth onChange={(e) => setImage(e.target.files[0])} />
            <Button
              variant="contained"
              disableElevation
              size="large"
              style={{ marginTop: 10, borderRadius: 30, background: 'rgb(1, 0, 1)', color: 'white' }}
              onClick={() => submit(product, description, seller, price, image)}
            >
              Post Item
            </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Index;
