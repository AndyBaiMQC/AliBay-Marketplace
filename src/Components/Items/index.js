import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import MyContext from '../../utils/context';
import Tooltip from '@material-ui/core/Tooltip';

import { addCart } from '../../server/api';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    maxWidth: 345,
    margin: 25
  },
});

function Items(props) {
  const classes = useStyles();
  const { data } = props;
  const context = useContext(MyContext);

  async function _addCart(data) {
    // const list = context.carts;
    // const item = list.filter(item => item._id === data._id);
    // data.number = item.length ? item.number + 1 : 1;
    const temp = {...data, user: context.isLogin}
    // data.user = context.isLogin;
    const res = await addCart(temp);
    if (res) {
      context.addCarts(temp);
      alert('Added to cart');
    }
  }

  return (
    <Card className={classes.root} >
      <CardActionArea component={Link} to={`/good/${data._id}`}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={`http://localhost:4000/${data.image}`}
          title={data.description}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h1">
            {data.product}
          </Typography>
          <div className="info">
          <Typography gutterBottom variant="h5" component="h2">
            ${data.price}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {data.quantity} in stock
          </Typography>
          </div>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
        <Typography variant="body2" color="textSecondary" component="p">
        <Tooltip title="Contact the seller by mail" placement="bottom">  
          <a href={`mailto:${data.email}`}><Chip avatar={<Avatar>{data.seller[0]}</Avatar>} clickable label={data.seller} /></a>
          </Tooltip>
        </Typography>
        <Button
          variant="contained"
          disableElevation
          size="medium"
          color="white"
          style={{ flexGrow: 1, borderRadius: 30, background: 'rgb(1, 0, 1)', color: 'white' }}
          onClick={() => _addCart(data)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default Items;
