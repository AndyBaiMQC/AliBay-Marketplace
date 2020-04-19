import axios from 'axios';

const url = process.env.NODE_ENV.includes('dev') ? 'http://localhost:4000' : '';

function request(path, data) {
  const header = {
    method: data.method || 'get',
    ...data
  };
  return axios(`${url}/${path}`, header).then(res => {
    if(res.data && res.data.errorMsg) {
      return Promise.reject(res.data.errorMsg);
    }
    return res.data;
  }).catch(err => alert(`net work error ${err}`));
}

export const register = (data) => request('register', { method: 'post', data });

export const login = (data) => request('login', { method: 'post', data });

export const addGoods = (data) => request('addGoods', { method: 'post', ...data });

export const getGoods = (data) => request(`goods${data}`, {  });

export const getGoodsDetail = (data) => request(`goods/${data.id}`, {});

export const addCart = (data) => request('cart', { method: 'post', data });

export const getCart = (data) => request('getCart', {method: 'post', data});

export const removeCart = (data) => request('removeCart', {method: 'post', data});

export const clearCart = (data) => request('clearCart', {method: 'post', data});

export const checkCart = (data) => request('checkCart', {method: 'post', data});

export const getSellerList = (data) => request('getSellerList', {});

export const getSecret = (data) => request('stripe/secret', {method: 'post', data});

export const addReview = (data) => request('addReview', {method: 'post', data});

