import Button from '@material-ui/core/Button';
import React, {useContext, useEffect, useState} from 'react';
import {Grid, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import MyContext from '../../utils/context';
import Layout from '../Layout';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';

import { Chip } from '@material-ui/core';

import {addCart, getGoodsDetail, addReview } from '../../server/api';

function ItemDetails(props) {
  const params = useParams();
  const [data, setData] = useState({});
  const [rank, setRank] = useState('');
  useEffect(() => {
    async function AsyncGetGoodsDetail() {
      const res = await getGoodsDetail({id: params.id});
      if (res) {
        setData(res.msg);
      }
    }
    AsyncGetGoodsDetail();
  }, [params.id]);
  const context = useContext(MyContext);
  async function handleRankChange(e) {
    setRank(e.target.value);
  }
  async function handleRankSubmit(e) {
    const res = await addReview({_id: params.id, review: rank});
    console.log(res)
    if (res) {
      setData(res.msg);
    }
  }
  async function _addCart(data) {
    data.user = context.isLogin;
    const res = await addCart(data);
    if (res) {
      context.addCarts(data);
      alert('add cart success');
    }
  }
  return (
    <Layout>
      <Grid container>
        <Grid item xs={8} style={{ height: '100vh', backgroundImage: `url(http://localhost:4000/${data.image})`, backgroundSize: 'cover' }} />
        <Grid container justify='center' alignItems='center' direction='column' item xs={4} style={{ height: '100vh' }}>
          <Typography
            component="h1"
            variant="h4" 
            color="textPrimary"
          >
            {data.product}
          </Typography>
          <br/>
          <Typography
            component="span"
            variant="body1"
            color="textPrimary"
            noWrap
          >
            {data.description}
          </Typography>
          <br/><br/>
          <Typography
            component="span"
            color="textPrimary"
            noWrap
          >
            ${data.price}
          </Typography>
          <br/>
          <Typography
            component="span"
            color="textPrimary"
            noWrap
          > Sold by &nbsp;
          <Chip label={data.seller} />
          </Typography>
          <br/>
          <Typography
            component="span"
            color="textPrimary"
            noWrap
          >
            Review: {data.rank || '*'}/5 { data.rank !== null? <progress value={data.rank || 0} max="5"> </progress> : <div>No reviews yet!</div>}
          </Typography>
          <Divider />
          <br/>
          <Button
            variant="contained"
            disableElevation
            size="large"
            color="white"
            style={{ borderRadius: 30, background: 'rgb(1, 0, 1)', color: 'white' }}
            onClick={() => _addCart(data)}
          >
            Add to Cart
          </Button>
          <br/>
          <FormControl component="fieldset" >
            <FormLabel component="legend">Add a Review</FormLabel>
            <RadioGroup style={{ flexDirection: 'row' }} aria-label="rank" name="rank" value={rank} onChange={handleRankChange}>
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
            <Button variant="outlined" color="primary" style={{ borderRadius: 15 }} onClick={handleRankSubmit}>Submit</Button>
          </FormControl>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default ItemDetails;
