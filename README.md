# W100-admin

> W100 admin project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### 部署流程

1，下载项目，编译项目  npm run build

2, 服务器设置跨域处理

  proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001/', // 代理服务器路径
        pathRewrite: {'^/api' : '/'}, // 重写路径
        changeOrigin: true
      }
  }