"use strict";

import Vue from 'vue';
import axios from "axios";
import { Message } from 'element-ui'


const _axios = axios.create();

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    //如果没有服务器信息
    if(!error.response){
      Message.error('服务器异常')
    }else{
      // Do something with response error
      // 对请求错误做些什么
      // 暂时状态码为401的时候跳转登录页面
      if(error.response.status == 401){
        Message.error({message: '请登录', duration: 2000})
      }else{
        Message.error({message: '服务器故障', duration: 2000})
      }
    }
    return Promise.reject(error);

  }
);

Plugin.install = function(Vue, options) {
  // Vue.prototype.axios = _axios;
  // window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)


export default _axios;
