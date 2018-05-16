import axios from 'axios'
import APIPATH from './apiPath'

const qs = require('qs')

const instance = axios.create({
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'source': 'Android',
    'token': '2F13D3C9597F4309BC2854F26C27CCD7',
    'uid': '-1',
    'ver': '1.0',
  }
})

export default {
  getStatRequest() {
    return instance.get(APIPATH.stat);
  },
  getBannerRequest() {
    return instance.get(APIPATH.banner);
  },
  savebannerRequest(params) {
    return instance.post(APIPATH.saveBanner, qs.stringify(params));
  },
  delbannerRequest(params) {
    return instance.post(APIPATH.delBanner, qs.stringify(params));
  },
  getTransactRequest() {
    return instance.get(APIPATH.transact);
  },
  saveTransactRequest(params) {
    return instance.post(APIPATH.saveTransact, qs.stringify(params));
  },
}
