import React from 'react';

const state = {
  // isLogin: window.sessionStorage.getItem('isLogin'),
  // setLogin: function(value) {
  //   this.isLogin = value
  // },
  // carts: [],
  // addCarts: function(value) {
  //   console.log(value, 'vvvv')
  //   if (Array.isArray(value)) {
  //     this.carts = value;
  //   } else {
  //     this.carts = [...this.carts, value];
  //   }
  // },
};

const MyContext = React.createContext(state);

export default MyContext;
