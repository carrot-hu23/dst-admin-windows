# dst-admin-windows

Windows 平台下的 steam 饥荒联机版开服工具

**不在维护了，请使用 dst-admin-go 这个项目，已支持windows版本**

## 使用
先配置服务器启动方式和安装位置，并指定存档启动

## 预览

![首页效果](./doc/%E9%A6%96%E9%A1%B5.png)

![房间设置](./doc/%E6%88%BF%E9%97%B4%E8%AE%BE%E7%BD%AE.png)

![玩家管理](./doc/%E7%8E%A9%E5%AE%B6%E7%AE%A1%E7%90%86.png)

![游戏备份](./doc/%E6%B8%B8%E6%88%8F%E5%A4%87%E4%BB%BD.png)

![系统设置](./doc/%E8%AE%BE%E7%BD%AE.png)

## 环境依赖
+ node
+ create-react-app
+ electron

## 项目运行
```js
npm install
npm run dev
```

## 部署步骤
```js
npm install
npm run packager
```

默认在当前文件生成dist文件

## 目录结构


## V0.1.0 版本内容更新

- [x] 启动游戏

- [x] 更新游戏

- [x] 房间设置

- [ ] 快捷操作

- [x] 游戏备份

- [x] 玩家管理

- [ ] 游戏日志

## 更新

### 1.1.1
+ ~~增加测试服启动选项(有问题)~~
    > 实现：正式服安装一个，测试服也安装一个文件名后缀为BetaBranch，steam启动方式目前不支持测试服

+ 增加房间选择选项
    > 如果没有找到，默认为Cluster_1
