## NPM 使用介绍

#### NPM是随同Node.js一起安装的包管理工具，能解决Node.js代码部署上的很多问题，常见的使用场景有以下几种：
- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

由于新版的Node.js已经集成了npm，所以之前npm也一并安装好了。
#### 可以通过输入 "npm -v" 来测试是否成功安装。命令如下，出现版本提示表示安装成功:
```
npm -v
6.0.1
```

#### 如果你安装的是旧版本的 npm，可以通过 npm 命令来升级，命令如下：
```
npm install npm -g
```

### npm 命令

#### 安装模块
```
npm install [name]
```
注意：本地安装需要首先定位到项目目录下，再运行 npm 命令
安装好之后，name 包就放在了工程目录下的 node_modules 目录中，因此在代码中只需要通过 require('name') 的方式引用，无需指定第三方包路径。
```
var express = require('name');
```

#### 全局安装与本地安装
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

#### 查看安装信息
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


### 使用淘宝 NPM 镜像,官方网址：http://npm.taobao.org/
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


#### 使用 package.json
- name - 包名。
- version - 包的版本号。
- description - 包的描述。
- homepage - 包的官网 url 。
- author - 包的作者姓名。
- contributors - 包的其他贡献者姓名。
- dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
- repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
- main - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
- keywords - 关键字