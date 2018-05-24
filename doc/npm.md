# NPM 使用介绍

### NPM是随同Node.js一起安装的包管理工具，能解决Node.js代码部署上的很多问题，常见的使用场景有以下几种：
- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

由于新版的Node.js已经集成了npm，所以之前npm也一并安装好了。
### 可以通过输入 "npm -v" 来测试是否成功安装。命令如下，出现版本提示表示安装成功:
```
npm -v
6.0.1
```

### 如果你安装的是旧版本的 npm，可以通过 npm 命令来升级，命令如下：
```
npm install npm -g
```

## npm 命令

### 安装模块
```
npm install [name]
```
注意：本地安装需要首先定位到项目目录下，再运行 npm 命令
安装好之后，name 包就放在了工程目录下的 node_modules 目录中，因此在代码中只需要通过 require('name') 的方式引用，无需指定第三方包路径。
```
const express = require('name');
```

### 全局安装与本地安装
npm 的包安装分为本地安装（local）、全局安装（global）两种，从敲的命令行来看，差别只是有没有-g而已，比如：
```
npm install [name]      # 本地安装
npm install [name] -g   # 全局安装
```
如果出现以下错误：
```
npm err! Error: connect ECONNREFUSED 127.0.0.1:8087
```
解决办法为：
```
npm config set proxy null
```

本地安装
1. 将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。
2. 可以通过 require() 来引入本地安装的包。

全局安装
1. 将安装包放在 /usr/local 下或者你 node 的安装目录。
2. 可以直接在命令行里使用。

### 查看安装信息
```
npm list
npm list -g
npm list [name]
```

卸载模块
```
npm uninstall [name]
```

更新模块
```
npm update [name]
```

搜索模块
```
npm search [name]
```


## 使用淘宝 NPM 镜像,官方网址：http://npm.taobao.org/
在国内直接使用 npm 的官方镜像是非常慢的，这里推荐使用淘宝 NPM 镜像。
淘宝 NPM 镜像是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。
你可以使用淘宝定制的 cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

安装模块
从 registry.npm.taobao.org 安装所有模块. 当安装的时候发现安装的模块还没有同步过来, 淘宝 NPM 会自动在后台进行同步, 并且会让你从官方 NPM registry.npmjs.org 进行安装. 下次你再安装这个模块的时候, 就会直接从 淘宝 NPM 安装了.
```
cnpm install [name]
```

同步模块
```
cnpm sync connect
```

当然, 你可以直接通过 web 方式来同步
```
open https://npm.taobao.org/sync/connect
```

其它命令
支持 npm 除了 publish 之外的所有命令, 如:
```
cnpm info connect
```


## 使用 package.json
- name - 包名。
- version - 包的版本号。
- description - 包的描述。
- homepage - 包的官网 url 。
- author - 包的作者姓名。
- contributors - 包的其他贡献者姓名。
- dependencies - 项目运行阶段依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
- devDependencies - 指定项目开发阶段所需要的模块。
- repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
- main - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
- keywords - 关键字
- scripts - 指定了运行脚本命令的npm命令行缩写
- config - 添加命令行的环境变量
- browser - 指定该模板供浏览器使用的版本
- engines - 指明了该模块运行的平台，比如 Node 的某个版本或者浏览器。

### 参考：[package.json文件详解](http://javascript.ruanyifeng.com/nodejs/packagejson.html)

### 详细解读
- 模块对应的版本可以加上各种限定，主要有以下几种：
  - 指定版本：比如1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。
  - 波浪号（tilde）+指定版本：比如~1.2.2，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。
  - 插入号（caret）+指定版本：比如ˆ1.2.2，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。
  - latest：安装最新版本。
- package.json文件可以手工编写，也可以使用npm init命令自动生成。
  ```
  npm init
  ```
  这个命令采用互动方式，要求用户回答一些问题，然后在当前目录生成一个基本的package.json文件。所有问题之中，只有项目名称（name）和项目版本（version）是必填的，其他都是选填的。

- 有了package.json文件，直接使用npm install命令，就会在当前目录中安装所需要的模块。
  ```
  npm install
  ```
- 如果一个模块不在package.json文件之中，可以单独安装这个模块，并使用相应的参数，将其写入package.json文件之中。  
  ```
  npm install express --save
  npm install express --save-dev
  ```
  上面代码表示单独安装express模块，--save参数表示将该模块写入dependencies属性，--save-dev表示将该模块写入devDependencies属性。

### package.json 示例
```
{
	"name": "Hello World",
	"version": "0.0.1",
	"author": "张三",
	"description": "第一个node.js程序",
	"keywords":["node.js","javascript"],
	"repository": {
		"type": "git",
		"url": "https://path/to/url"
	},
	"license":"MIT",
	"engines": {"node": "0.10.x"},
	"bugs":{"url":"http://path/to/bug","email":"bug@example.com"},
	"contributors":[{"name":"李四","email":"lisi@example.com"}],
	"scripts": {
		"start": "node index.js"
	},
	"dependencies": {
		"express": "latest",
		"mongoose": "~3.8.3",
		"handlebars-runtime": "~1.0.12",
		"express3-handlebars": "~0.5.0",
		"MD5": "~1.2.0"
	},
	"devDependencies": {
		"bower": "~1.2.8",
		"grunt": "~0.4.1",
		"grunt-contrib-concat": "~0.3.0",
		"grunt-contrib-jshint": "~0.7.2",
		"grunt-contrib-uglify": "~0.2.7",
		"grunt-contrib-clean": "~0.5.0",
		"browserify": "2.36.1",
		"grunt-browserify": "~1.3.0",
	}
}
```