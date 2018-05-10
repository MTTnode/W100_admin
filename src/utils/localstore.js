export default {
    setValue(key, val) {
        if (!key) return;
        if (typeof val !== 'string') {
            val = JSON.stringify(val);
        }
        window.localStorage.setItem(key, val);
    },
    getValue(key) {
        if (!key) return;
        return window.localStorage.getItem(key);
    },
    removeStore(key) {
        if (!key) return;
	    window.localStorage.removeItem(key);
    }
}
  