const path = require('path');
const prod = process.env.NODE_ENV === 'production';
const baseurl = !prod ? 'http://t.music.migu.cn' : 'http://music.migu.cn';

const resolve = (src) => {
  return path.resolve(__dirname, src);
};
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '音乐人-咪咕音乐网_放肆听·趣玩乐',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'keywords', content: '咪咕音乐,彩铃,移动彩铃,手机彩铃,中国移动,12530,mp3,高品质音乐,无损音乐,在线听歌,歌曲下载,振铃,歌曲,铃音,特级会员,电台,mv,演唱会直播,音乐网站,音乐播放器' },
      { name: 'description', content: '咪咕音乐网是中国移动官方音乐门户，旨在提供音乐首发、高品质音乐试听、彩铃订购、歌曲下载、铃音管理、音乐电台、音乐视频等一站式音乐互动体验，好音乐尽在music.migu.cn！' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'http://cdnmusic.migu.cn/favicon.ico' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: false,
  /*
  ** Global CSS
  */
  css: [
    'assets/scss/common/_common.scss',
    'static/fonts/iconfont.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true,
    // prefix: '/api', // baseURL
    credentials: true,
  },
  proxy: [
    ['/miguwww', { target: 'http://t.music.migu.cn' }]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // https://zh.nuxtjs.org/api/configuration-build#publicpath
    publicPath: '/static_resource/',
    extend (config, ctx) {
      // !这儿添加的别名不能在nuxt.config.js文件中使用
      Object.assign(config.resolve.alias, {
        'scss': resolve('assets/scss'),
        'img': resolve('assets/img'),
      });
      if (ctx.isDev) {
        config.module.rules.push({
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre', // 编译前检查
          // exclude: [/node_modules/], // 不检测的文件
          // include: [resolve('src')], // 指定检查的目录
          options: {
            // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
            formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
          },
        });
      }
    },
    loaders: {
      scss: {
        // scss公用文件
        // 路径前面的assets是nuxt.js内置别名
        data: `
          @import "assets/scss/common/_variables";
          @import "assets/scss/common/_mixin";
        `,
      },
    },
    /*
    ** 提取css
    ** https://zh.nuxtjs.org/api/configuration-build/#extractcss
    */
    extractCSS: true,
  },
  generate: {
    fallback: true, // 在将生成的站点部署到静态主机时，可以使用此文件
    interval: 150, // 两个渲染周期之间的间隔，以避免使用来自Web应用程序的API调用互相干扰
  },
  server: {
    port: 3091,
    host: '127.0.0.1',
  }
};
