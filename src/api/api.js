import axios from 'axios'
import APIPATH from './apiPath'

const qs = require('qs')

const instance = axios.create({
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'source': 'Android'
  }
})

export default {
  getStatRequest() {
    return axios.get(APIPATH.stat);
  },
  getBannerRequest() {
    return axios.get(APIPATH.banner);
  },
  savebannerRequest(params) {
    return instance.post(APIPATH.saveBanner, qs.stringify(params));
  },
  delbannerRequest(params) {
    return instance.post(APIPATH.delBanner, qs.stringify(params));
  },
  getTransactRequest() {
    return axios.get(APIPATH.transact);
  },
  saveTransactRequest(params) {
    return instance.post(APIPATH.saveTransact, qs.stringify(params));
  },
}
