import Divider from '@material-ui/core/Divider';
import MailIcon from '@material-ui/icons/Mail';
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import PersonIcon from '@material-ui/icons/Person';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PeopleIcon from '@material-ui/icons/People';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {Link} from 'react-router-dom';
import {getSellerList} from '../../server/api';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
const list = [
  {
    text: 'All',
    path: '/'
  },
  {
    text: 'Shoes',
    path: '/?type=shoes'
  },
  {
    text: 'Clothes',
    path: '/?type=clothes'
  }
];

export default function NestedList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [ sellers, setSellers] = useState([]);
  useEffect(() => {
    async function AsyncGetSellerList() {
      const res = await getSellerList();
      if (res) {
        console.log(res,'seller')
        setSellers(res.msg)
      }
    }
    AsyncGetSellerList();
  }, []);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      // onClick={() => props.click()}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {list.map((item, index) => (
        <ListItem button key={item.text} component={Link} to={`${item.path}`} onClick={props.click}>
          <ListItemIcon>{index % 2 === 0 ? <ListAltIcon /> : <ListAltIcon />}</ListItemIcon>
          <ListItemText primary={item.text} />
          {/*<Link href={`/${text}`}>{text}</Link>*/}
        </ListItem>
      ))}
      <Divider />
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Sellers" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            sellers.filter((v,i) => sellers.indexOf(v) === i).map(item => (
              item ? <ListItem key={item} component={Link} to={`/?seller=${item}`} button className={classes.nested} onClick={props.click}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem> : ''
            ))
          }

        </List>
      </Collapse>
    </List>
  );
}
