import axios from 'axios'
import APIPATH from './apiPath'
import CryptoJS from 'crypto-js'

const qs = require('qs')

const instance = axios.create({
  headers: {
    'source': 'admin',
    'token': 'token',
    'uid': '-1',
    'ver': '2.0.0',
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
  getPaymentOrderListRequest(param) {
    return instance.get(APIPATH.paymentOrderList, {
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
    return instance.post(APIPATH.addUser, params);
  },
  usrLoginRequest(params) {
    params.password = CryptoJS.AES.encrypt(params.password, 'weex').toString();
    return instance.post(APIPATH.usrLogin, qs.stringify(params));
  },
  resetUserRequest(params) {
    if(params.type == "setpwd"){
      params.password = CryptoJS.AES.encrypt(params.password, 'weex').toString();
    }
    return instance.post(APIPATH.resetUser, params);
  },
  getPaymentSwitchlistRequest(param) {
    return instance.get(APIPATH.paymentSwitch, {
      params: param
    });
  },
  setPaymentSwitchRequest(param) {
    return instance.get(APIPATH.setPaymentSwitch, {
      params: param
    });
  },
  updateUserRequest(params) {
    return instance.post(APIPATH.updateUser, params);
  },
}
