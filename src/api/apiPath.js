const apiUrl = "/api"

export default {
    stat: apiUrl + "/ad/stat",    //首页统计
    banner: apiUrl + "/ad/banner",    //banner列表
    saveBanner: apiUrl + "/ad/saveBanner",    //banner保存
    delBanner: apiUrl + "/ad/delBanner",    //banner删除
    transact: apiUrl + "/ad/transact",    //transact列表
    saveTransact: apiUrl + "/ad/saveTransact",    //transact保存
    blacklist: apiUrl + "/ad/blacklist",    //黑名单列表
    addBlack: apiUrl + "/ad/addBlack",    //添加黑名单
    delBlack: apiUrl + "/ad/delBlack",    //删除黑名单
    whitelist: apiUrl + "/ad/whitelist",    //白名单列表
    addWhite: apiUrl + "/ad/addWhite",    //添加白名单
    delWhite: apiUrl + "/ad/delWhite",    //删除白名单
    getDAU: apiUrl + "/ad/getDAU",    //日活图标数据
    checkList: apiUrl + "/ad/update/checkList",    //app版本列表
    addVersion: apiUrl + "/ad/update/addVersion",    //app版本添加
    orderList: apiUrl + "/ad/order/orderList",    //订单列表
    paymentOrderList: apiUrl + "/ad/order/payment_orderList",    //dora订单列表
    userList: apiUrl + "/ad/role/userList",    //用户列表
    addUser: apiUrl + "/ad/role/addUser",    //添加用户
    delUser: apiUrl + "/ad/role/delUser",    //删除用户
    usrLogin: apiUrl + "/ad/role/usrLogin",    //用户登陆
}
