# 掘金小册深入浅出vite

## lesson 4: 样式方案

#### 支持sass
pnpm i sass -D

#### postcss

autoprefixer
```js
// install
pnpm i autoprefixer -D

// config
autoprefixer({
  // 指定目标浏览器
  overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
})
```

发现不管用，后改为用postcss-preset-env生效

```js
// install
pnpm i sass postcss-preset-env -D

// config
css: {
  postcss: {
    plugins: [
      postcssPresetEnv()
    ]
  }
}
```

#### 原子框架
tailwind css

```js

// 1、安装
// 2、tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


// 3、postcss.config.js
// 从中你可以看到，Tailwind CSS 的编译能力是通过 PostCSS 插件实现的
// 而 Vite 本身内置了 PostCSS，因此可以通过 PostCSS 配置接入 Tailwind CSS 
// 注意: Vite 配置文件中如果有 PostCSS 配置的情况下会覆盖掉 post.config.js 的内容!
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// 4、入口css文件配置
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 5、代码风格和质量

#### 添加Stylelint

```js
// 1、安装，vite额外安装这个（vite-plugin-stylelint），其他按需(stylelint stylelint-prettier stylelint-config-prettier stylelint-config-recess-order stylelint-config-standard )stylelint-config-standard-scss

pnpm i stylelint vite-plugin-stylelint  -D
// 2、config配置
import stylelint from 'vite-plugin-stylelint';
stylelint()

// 3、具体规则在.stylelintrc.js中配置

// 4、package.json中添加script
"lint:style": "stylelint --fix \"src/**/*.{css,scss}\""

```

## 6、静态资源

#### svg

```js
// 1、安装
pnpm i -D vite-plugin-svgr

// 2、配置        
import svgr from 'vite-plugin-svgr';

export default {
  plugins: [
    svgr(),
  ],  
}

// 3、使用
import ReactLogo from '@assets/react.svg?react';
```

#### 图片压缩

```js  
// 1、安装
pnpm i -D vite-plugin-imagemin

// 2、配置
import imagemin from 'vite-plugin-imagemin';

export default {
  plugins: [
    imagemin({
      gifsicle: {
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ],
      },
    }),
  ],
}
```

## 9、esbuild插件

基本概念
- onResolve：在解析导入时触发
- onLoad：在加载模块时触发
- onStart：在构建开始时触发
- onEnd：在构建结束时触发

实战：两个小插件
- cdn-plugin：替换静态资源链接为cdn链接: 路径：./esbuild/src/cdn-plugin
- html-plugin：生成html文件: 路径：./esbuild/src/html-plugin

## 10、rollup打包基本概念
rollup目录
- 多产物
- 多入口
- 插件能力
- api 方式
  - build
    - 通过 rollup.rollup方法，传入 inputOptions，生成 bundle 对象；
    - 调用 bundle 对象的 generate 和 write 方法，传入outputOptions，分别完成产物和生成和磁盘写入。
    - 调用 bundle 对象的 close 方法来结束打包。
  - watch