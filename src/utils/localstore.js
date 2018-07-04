// import util from './utils'

export default {
    setValue(key, val) {
      // val = util.Encryption(val);
      if (!key) return;
      if (typeof val !== 'string') {
          val = JSON.stringify(val);
      }
      window.localStorage.setItem(key, val);
    },
    getValue(key) {
      if (!key) return;
      let val = window.localStorage.getItem(key);
      // return util.Decrypt(val);
      return val;
    },
    removeStore(key) {
      if (!key) return;
	    window.localStorage.removeItem(key);
    }
}
  