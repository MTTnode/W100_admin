import axios from 'axios'
import APIPATH from './apiPath'
import CryptoJS from 'crypto-js'

const qs = require('qs')

const instance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'source': 'IOS',
    'token': '2F13D3C9597F4309BC2854F26C27CCD7',
    'uid': '-1',
    'ver': '1.0',
    'x-forwarded-for': '127.0.0.1'
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
  getBlacklistRequest(param) {
    return instance.get(APIPATH.blacklist, {
      params: param
    });
  },
  saveBlackRequest(params) {
    return instance.post(APIPATH.addBlack, qs.stringify(params));
  },
  delblackRequest(params) {
    return instance.post(APIPATH.delBlack, qs.stringify(params));
  },
  getWhitelistRequest(param) {
    return instance.get(APIPATH.whitelist, {
      params: param
    });
  },
  saveWhiteRequest(params) {
    return instance.post(APIPATH.addWhite, qs.stringify(params));
  },
  delwhiteRequest(params) {
    return instance.post(APIPATH.delWhite, qs.stringify(params));
  },
  getDAURequest() {
    return instance.get(APIPATH.getDAU);
  },
  getCheckListRequest(param) {
    return instance.get(APIPATH.checkList, {
      params: param
    });
  },
  saveVersionRequest(params) {
    return instance.post(APIPATH.addVersion, qs.stringify(params));
  },
  getOrderListRequest(param) {
    return instance.get(APIPATH.orderList, {
      params: param
    });
  },
  getUserListRequest() {
    return instance.get(APIPATH.userList);
  },
  delUserRequest(params) {
    return instance.post(APIPATH.delUser, qs.stringify(params));
  },
  addUserRequest(params) {
    return axios.post(APIPATH.addUser, params);
  },
  usrLoginRequest(params) {
    params.password = CryptoJS.AES.encrypt(params.password, 'weex').toString();
    return instance.post(APIPATH.usrLogin, qs.stringify(params));
  },
}
