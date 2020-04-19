import React, {useCallback, useState} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LoginRegister from '../LoginRegister/LoginRegister.jsx';

import All from '../All';
import Cart from '../Cart';
import Sale from '../Sale';
import ItemDetails from '../ItemDetail';
import MyContext from '../../utils/context';

const routes = [
  {
    path: '/',
    component: <All />,
  },
  {
    path: '/cart',
    component: <Cart />,
  },
  {
    path: '/sell',
    component: <Sale />,
  },
  {
    path: '/login',
    component: <LoginRegister />,
  },
  {
    path: '/register',
    component: <LoginRegister />,
  },
  {
    path: '/good/:id',
    component: <ItemDetails />,
  },
];

function App() {
  const [carts, setCarts] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [isLogin, _setLogin] = useState(window.sessionStorage.getItem('isLogin'));

  const addCarts = useCallback((value) => {
    if (!value) return;
    if (Array.isArray(value)) {
      setCarts(value);
    } else {
      const item = carts.filter(item => item._id === value._id);
      console.log(item, 'ccc');
      if (item.length) {
        item[0].number++;
      } else {
        value.number = 1;
        setCarts([...carts, value]);
      }
    }
  }, [ carts ])
  function setLogin(v) {
    window.sessionStorage.setItem('isLogin', v);
    _setLogin(v);
  }
  return (
    <MyContext.Provider value={{carts, isLogin, addCarts, setLogin, searchName, setSearchName}}>
      <Router>
        <CssBaseline />
        <Switch>
          {
            routes.map(item => <Route exact path={item.path} key={item.path}>{item.component}</Route>)
          }
        </Switch>
      </Router>
    </MyContext.Provider>
  );
}
export default App;
