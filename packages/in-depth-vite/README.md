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

