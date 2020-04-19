import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Grid, Button } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import MyContext from '../../utils/context';
import Layout from '../Layout';

import Items from '../Items';
import { getGoods } from '../../server/api';

function All(props) {
  const location = useLocation();
  const [ list, setList ] = useState([]);
  const [ order, setOrder ] = useState(true);
  const context = useContext(MyContext);
  useEffect(() => {
    async function AsyncGetGoods() {
      const res = await getGoods(`${location.search}`);
      console.log(res, 'aaa')
      if (res) {
        setList(res.msg);
      }
    }
    AsyncGetGoods();
  }, [location]);
  useEffect(() => {
    async function AsyncGetGoods() {
      const res = await getGoods(context.searchName ? `?product=${context.searchName}` : '');
      console.log(res, 'mmmmm');
      if (res) {
        setList(res.msg);
      }
    }
    AsyncGetGoods();
  }, [context.searchName]);
  const sortList = useCallback(() => {
    const temp = [...list];
    if (order) {
      temp.sort((a, b) => Number(a.price) - Number(b.price));
    } else {
      temp.sort((a, b) => Number(b.price) - Number(a.price));
    }
    setList(temp);
    setOrder(!order);
  }, [list, order]);
  return (
    <Layout >
      <div className="sort">
        <Button variant="outlined" color="primary" onClick={sortList}>Sort by Price</Button>
      </div>
      <Grid container>
        {
          list.filter(item => item.user !== context.isLogin).map((item, index) => <Items data={item} key={item._id} />)
        }
      </Grid>
    </Layout>
  );
}

export default All;
